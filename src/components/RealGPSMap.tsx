'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '@/lib/store';
import { CATEGORY_COLORS } from '@/lib/config';
import { RegionalRiskScore } from '@/lib/types';
import {
  Layers,
  Crosshair,
  Compass,
  AlertTriangle,
  Sparkles,
  Maximize2,
  Navigation,
  Radio,
  Eye,
} from 'lucide-react';

type TileTheme = 'satellite' | 'street' | 'tactical';

export default function RealGPSMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const { regionalRiskScores, simulateOutbreak } = useApp();

  const [tileTheme, setTileTheme] = useState<TileTheme>('satellite');
  const [selectedNode, setSelectedNode] = useState<RegionalRiskScore | null>(null);
  const [cursorGPS, setCursorGPS] = useState<{ lat: string; lng: string }>({
    lat: '19.7515',
    lng: '75.7139',
  });
  const [zoomLevel, setZoomLevel] = useState<number>(7);
  const [radarActive, setRadarActive] = useState<boolean>(true);

  // Maharashtra Center: Lat ~19.5, Lng ~76.0
  const DEFAULT_CENTER: [number, number] = [19.5, 75.8];
  const DEFAULT_ZOOM = 7;

  // Tile Providers (100% Free & Open-Access, Zero API Key Required, Zero Watermarks)
  const tileProviders: Record<
    TileTheme,
    { url: string; attribution: string; maxZoom: number; subdomains?: string[] }
  > = {
    satellite: {
      url: 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Hybrid Satellite Imagery',
      maxZoom: 20,
      subdomains: ['0', '1', '2', '3'],
    },
    street: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
    },
    tactical: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 19,
      subdomains: ['a', 'b', 'c', 'd'],
    },
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false, // We'll render custom tactical GPS zoom controls
      attributionControl: false,
    });

    const currentProvider = tileProviders[tileTheme];
    const initialTiles = L.tileLayer(currentProvider.url, {
      attribution: currentProvider.attribution,
      maxZoom: currentProvider.maxZoom,
      subdomains: currentProvider.subdomains || ['a', 'b', 'c'],
    }).addTo(map);

    tileLayerRef.current = initialTiles;

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;

    // Track mouse coordinates
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      setCursorGPS({
        lat: e.latlng.lat.toFixed(4),
        lng: e.latlng.lng.toFixed(4),
      });
    });

    map.on('zoomend', () => {
      setZoomLevel(map.getZoom());
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle tile theme changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    const currentProvider = tileProviders[tileTheme];
    const newTiles = L.tileLayer(currentProvider.url, {
      attribution: currentProvider.attribution,
      maxZoom: currentProvider.maxZoom,
      subdomains: currentProvider.subdomains || ['a', 'b', 'c'],
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newTiles;
  }, [tileTheme]);

  // Update Markers & Containment Perimeter Circles whenever data updates
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    layerGroupRef.current.clearLayers();

    regionalRiskScores.forEach((node) => {
      if (!node.latitude || !node.longitude) return;

      const isCritical = node.risk_category === 'CRITICAL';
      const isHigh = node.risk_category === 'HIGH';
      const colorHex = CATEGORY_COLORS[node.risk_category].hex;

      // 1. If High or Critical, draw real GPS containment radius buffer circles
      if (isCritical || isHigh) {
        // 5 km containment zone
        const containmentZone = L.circle([node.latitude, node.longitude], {
          radius: isCritical ? 6000 : 3500,
          color: colorHex,
          fillColor: colorHex,
          fillOpacity: 0.18,
          weight: 1.5,
          dashArray: isCritical ? '4, 4' : undefined,
        });

        containmentZone.bindTooltip(
          `<strong>${node.region_name} Containment Perimeter</strong><br/>Status: Restricted Livestock Movement`,
          { className: 'gps-leaflet-tooltip' }
        );

        containmentZone.addTo(layerGroupRef.current!);
      }

      // 2. Custom Tactical GPS Pin
      const pinHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          ${
            isCritical || isHigh
              ? `<span class="absolute -inset-2 rounded-full animate-ping opacity-70" style="background-color: ${colorHex}"></span>`
              : ''
          }
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shadow-2xl border-2 border-white/90 backdrop-blur-sm transition-transform transform hover:scale-125" style="background-color: ${colorHex}; box-shadow: 0 0 15px ${colorHex}80">
            ${Math.round(node.risk_score)}
          </div>
          <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-slate-950/90 text-white text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border border-slate-700 whitespace-nowrap hidden group-hover:block pointer-events-none z-50">
            ${node.region_name}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pinHtml,
        className: 'custom-gps-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([node.latitude, node.longitude], { icon: customIcon });

      marker.on('click', () => {
        setSelectedNode(node);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([node.latitude!, node.longitude!], 10, {
            duration: 1.2,
          });
        }
      });

      marker.addTo(layerGroupRef.current!);
    });
  }, [regionalRiskScores]);

  // Quick-Jump Telemetry Buttons
  const flyToCoords = (lat: number, lng: number, zoom = 10) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 1.5 });
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
      {/* 1. Top Real GPS Telemetry HUD Bar */}
      <div className="absolute top-0 inset-x-0 z-[400] bg-slate-950/80 backdrop-blur-md px-4 py-2.5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-black">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>GNSS TELEMETRY LOCKED</span>
          </div>
          <span className="hidden sm:inline text-slate-500">|</span>
          <div className="flex items-center gap-1">
            <Crosshair className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-sky-300 font-bold">
              {cursorGPS.lat}° N, {cursorGPS.lng}° E
            </span>
          </div>
          <span className="hidden md:inline text-slate-500">|</span>
          <div className="hidden md:flex items-center gap-1 text-slate-400">
            <span>ZOOM:</span>
            <span className="font-bold text-white">{zoomLevel}x</span>
          </div>
        </div>

        {/* Layer Selector & Radar Toggle */}
        <div className="flex items-center gap-2">
          {/* Tile Layer Toggle */}
          <div className="flex bg-slate-900/90 rounded-lg p-0.5 border border-slate-700 text-[11px] font-sans font-bold">
            <button
              onClick={() => setTileTheme('satellite')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
                tileTheme === 'satellite' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Satellite</span>
            </button>
            <button
              onClick={() => setTileTheme('street')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
                tileTheme === 'street' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Streets</span>
            </button>
            <button
              onClick={() => setTileTheme('tactical')}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1 ${
                tileTheme === 'tactical' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Navigation className="w-3 h-3" />
              <span>Tactical</span>
            </button>
          </div>

          {/* Radar sweep toggle */}
          <button
            onClick={() => setRadarActive(!radarActive)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-sans font-bold flex items-center gap-1 transition-colors ${
              radarActive
                ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
            title="Toggle radar sweep scanner"
          >
            <Radio className={`w-3 h-3 ${radarActive ? 'animate-pulse text-rose-400' : ''}`} />
            <span className="hidden sm:inline">Radar</span>
          </button>
        </div>
      </div>

      {/* 2. Map Container */}
      <div className="relative w-full h-[520px] bg-slate-950">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Tactical Radar Overlay (Animated sweeping beam) */}
        {radarActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[300] opacity-25 mix-blend-screen">
            <div className="w-[1000px] h-[1000px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gps-radar-sweep rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(16,185,129,0.35)_360deg)]" />
          </div>
        )}

        {/* GPS Crosshair Reticle Center Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[300] opacity-40">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full border border-sky-400" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-sky-400" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-sky-400" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 w-3 bg-sky-400" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 h-0.5 w-3 bg-sky-400" />
          </div>
        </div>

        {/* Tactical Custom Zoom & Compass Widget (Floating on top right) */}
        <div className="absolute top-16 right-4 z-[400] flex flex-col gap-2">
          {/* Compass Rose */}
          <div className="w-10 h-10 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 shadow-lg flex flex-col items-center justify-center text-slate-300">
            <Compass className="w-4 h-4 text-rose-500" />
            <span className="text-[8px] font-mono font-black text-rose-400">N</span>
          </div>

          {/* Tactical Zoom Buttons */}
          <div className="bg-slate-950/85 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-lg flex flex-col overflow-hidden">
            <button
              onClick={handleZoomIn}
              className="p-2.5 hover:bg-slate-800 text-white border-b border-slate-800 font-bold transition-colors"
              title="GPS Zoom In"
            >
              +
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2.5 hover:bg-slate-800 text-white font-bold transition-colors"
              title="GPS Zoom Out"
            >
              -
            </button>
          </div>

          {/* Reset Overview */}
          <button
            onClick={() => flyToCoords(DEFAULT_CENTER[0], DEFAULT_CENTER[1], DEFAULT_ZOOM)}
            className="p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 hover:bg-slate-800 text-white shadow-lg transition-colors flex items-center justify-center"
            title="Reset to Maharashtra State Overview"
          >
            <Maximize2 className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

        {/* Quick-Jump Tactical Buttons (Floating on bottom left) */}
        <div className="absolute bottom-4 left-4 z-[400] flex flex-wrap gap-1.5 max-w-lg">
          <button
            onClick={() => flyToCoords(20.0422, 73.8551, 11)}
            className="px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-[11px] font-mono font-bold backdrop-blur-md border border-rose-400/40 shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>Target: Nashik Epidemic (84/100)</span>
          </button>
          <button
            onClick={() => flyToCoords(18.5204, 73.8567, 10)}
            className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-[11px] font-mono font-semibold backdrop-blur-md border border-slate-700 shadow-lg flex items-center gap-1 transition-all"
          >
            <span>Pune Belt</span>
          </button>
          <button
            onClick={() => flyToCoords(16.705, 74.2433, 10)}
            className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-[11px] font-mono font-semibold backdrop-blur-md border border-slate-700 shadow-lg flex items-center gap-1 transition-all"
          >
            <span>Kolhapur</span>
          </button>
          <button
            onClick={() => flyToCoords(21.1458, 79.0882, 10)}
            className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-[11px] font-mono font-semibold backdrop-blur-md border border-slate-700 shadow-lg flex items-center gap-1 transition-all"
          >
            <span>Nagpur</span>
          </button>
        </div>
      </div>

      {/* 3. Tactical Node Detail Drawer (When clicked on a marker) */}
      {selectedNode && (
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in slide-in-from-bottom-2">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase text-white shadow-xs"
                style={{ backgroundColor: CATEGORY_COLORS[selectedNode.risk_category].hex }}
              >
                {selectedNode.risk_category} RISK &bull; {selectedNode.risk_score}/100
              </span>
              <h4 className="text-sm font-black text-white font-mono">
                {selectedNode.region_name}
              </h4>
              <span className="text-xs text-slate-400 font-mono">
                [GPS: {selectedNode.latitude?.toFixed(4)}° N, {selectedNode.longitude?.toFixed(4)}° E]
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
              <span>7d Volume: <strong className="text-white">{selectedNode.report_count_7d} reports</strong></span>
              <span>Affected: <strong className="text-white">{selectedNode.affected_animals} head</strong></span>
              <span>Fatalities: <strong className="text-rose-400">{selectedNode.deaths}</strong></span>
              <span>Mortality: <strong className="text-amber-400">{(selectedNode.mortality_rate * 100).toFixed(1)}%</strong></span>
              <span>HIGH Alerts: <strong className="text-rose-400">{selectedNode.high_concern_count}</strong></span>
            </div>

            <p className="text-xs text-slate-400 mt-1 italic">
              Telemetry Drivers: {selectedNode.explanations.join(' ')}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => simulateOutbreak(selectedNode.region_name, 6)}
              className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold font-sans transition-all shadow-md shadow-rose-900/30 flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Simulate +6 Cases Cluster Burst</span>
            </button>
            <button
              onClick={() => setSelectedNode(null)}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold font-sans transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
