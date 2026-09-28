import { SymptomKey } from './types';

export interface SymptomWordbankEntry {
  model_key: SymptomKey;
  severity_weight: number;
  category: 'visual' | 'invisible' | 'semi_visual';
  is_visually_detectable: string;
  clip_prompts: string[];
  voice_phrases_en: string[];
  voice_phrases_regional: {
    hindi: string[];
    marathi: string[];
    tamil?: string[];
    telugu?: string[];
    gujarati?: string[];
    punjabi?: string[];
  };
  medical_synonyms: string[];
}

export const NEGATION_WORDS: string[] = [
  'no ', 'not ', 'never ', 'none ', "n't", "isn't", "doesn't", "didn't",
  "wasn't", "weren't", 'without', 'absent', 'free of',
  'no sign of', 'no signs of', 'not showing', 'does not show',
  'nahi', 'nahin', 'nahim', 'illai', 'ledu', 'nathi', 'nahi hai', 'nahi aahe',
  'नाही', 'नाहीत', 'नाहीये', 'नाही आला', 'नाही आहे', 'नव्हता', 'नव्हती',
  'नहीं', 'नहीं है', 'नहीं हुआ', 'नहीं था', 'बिल्कुल नहीं'
];

export const NEGATION_WINDOW_CHARS = 28;

export const CLAUSE_BREAKS: string[] = [
  ',', ';', '.', ' but ', ' however ', ' and ', ' though ', ' although ', ' pan ', ' lekin ', ' par ',
];

export const WORDBANK: Record<SymptomKey, SymptomWordbankEntry> = {
  fever: {
    model_key: 'fever',
    severity_weight: 1,
    category: 'invisible',
    is_visually_detectable: 'partial',
    clip_prompts: [
      'A photo of a cow or goat that looks lethargic and feverish',
      'A photo of an animal shivering or trembling from high body temperature',
      'A photo of a livestock animal with glassy, dull, unfocused eyes from fever',
      'A photo of a cattle with ears drooping and body hunched from illness',
    ],
    voice_phrases_en: [
      'fever', 'high temperature', 'hot body', 'burning up', 'body hot',
      'animal is very warm', 'seems feverish', 'high heat', 'pyrexia',
      'the cow feels very hot when i touch it', 'body temperature is high',
    ],
    voice_phrases_regional: {
      hindi: ['bukhar', 'tez bukhar', 'shareer garam', 'taap', 'sharir garm', 'बुखार', 'तेज बुखार', 'शरीर गरम'],
      marathi: ['tap', 'taap ala', 'shareeer garma', 'bukhar', 'taap ahe', 'ang garam', 'ताप', 'तीव्र ताप', 'ताप आला', 'अंग गरम'],
      tamil: ['kaichal', 'juram', 'udal veppam'],
      telugu: ['jwaram', 'vappu', 'deham venguta'],
      gujarati: ['tav', 'bukhar', 'garam'],
      punjabi: ['bukhar', 'tapp', 'garam body'],
    },
    medical_synonyms: ['pyrexia', 'hyperthermia', 'elevated body temperature'],
  },

  coughing: {
    model_key: 'coughing',
    severity_weight: 1,
    category: 'semi_visual',
    is_visually_detectable: 'audio_video',
    clip_prompts: [
      'A photo of a cow or goat with its neck stretched out coughing',
      'A photo of a livestock animal coughing with mouth open',
      'A photo of cattle with mucus around mouth from coughing',
      'A photo of a sheep or goat showing signs of respiratory distress with open mouth',
    ],
    voice_phrases_en: [
      'coughing', 'cough', 'keeps coughing', 'persistent cough', 'dry cough',
      'wet cough', 'hacking cough', 'the animal coughs all night',
      'making coughing noise', 'cough not stopping', 'has a bad cough',
    ],
    voice_phrases_regional: {
      hindi: ['khansi', 'khaansi', 'khaans raha hai', 'khans', 'खांसी', 'खांसना'],
      marathi: ['khasne', 'khas', 'khaas aahe', 'khokla', 'khokat ahe', 'खोकला', 'खोकणे'],
      tamil: ['irumul', 'irumal'],
      telugu: ['dagguta', 'daggutundo'],
      gujarati: ['uksras', 'ukhadto'],
      punjabi: ['khansi', 'khassi'],
    },
    medical_synonyms: ['tussis', 'respiratory cough', 'chronic cough', 'bovine cough'],
  },

  nasal_discharge: {
    model_key: 'nasal_discharge',
    severity_weight: 1,
    category: 'visual',
    is_visually_detectable: 'yes',
    clip_prompts: [
      'A close-up photo of a cow with thick mucus dripping from its nose',
      'A photo of a goat with clear or yellow discharge running from the nostrils',
      'A photo of a livestock animal with a very runny nose',
      'A photo of cattle with dried crusty mucus around the nose',
      'A photo of a buffalo with blood-tinged nasal discharge',
      'A photo of an animal with foam or froth coming from its nostrils',
    ],
    voice_phrases_en: [
      'runny nose', 'nasal discharge', 'mucus from nose', 'nose running',
      'snot coming out', 'nose dripping', 'discharge from nostrils',
      'liquid coming from nose', 'nose fluid', 'watery nose', 'bloody nose',
      'thick mucus nose', 'dried crust on nose',
    ],
    voice_phrases_regional: {
      hindi: ['naak beh raha', 'naak se paani', 'naak se kuch nikal raha', 'naak gili', 'नाक बहना', 'नाक से पानी'],
      marathi: ['naakatu pani', 'naak vahat aahe', 'naakave paani', 'naakatun ghaan', 'naak galat ahe', 'नाकातून पाणी', 'नाक वाहणे'],
      tamil: ['mooku ottuthu', 'mooku thanni'],
      telugu: ['nasupu kaaru tundi', 'mucu vastundi'],
      gujarati: ['naku thi pani', 'nakhu vahe che'],
      punjabi: ['nakkoo pani', 'nak waho'],
    },
    medical_synonyms: ['rhinorrhea', 'serous nasal exudate', 'mucopurulent nasal discharge'],
  },

  weakness: {
    model_key: 'weakness',
    severity_weight: 1,
    category: 'visual',
    is_visually_detectable: 'yes',
    clip_prompts: [
      'A photo of a cow lying down and unable or unwilling to get up',
      'A photo of a livestock animal that looks very weak and lethargic',
      'A photo of a goat or sheep drooping its head, looking exhausted',
      'A photo of cattle staggering or having difficulty walking',
      'A photo of an animal with a drooped head and dull coat from weakness',
      'A photo of livestock standing hunched with a bowed back due to weakness',
    ],
    voice_phrases_en: [
      'weak', 'weakness', 'lethargic', 'no energy', 'can not stand up',
      'very tired', 'exhausted', 'listless', 'dull', 'not moving',
      'laying down all the time', 'keeps falling', 'can barely walk',
      'looks sick and weak', 'very pale and weak animal',
    ],
    voice_phrases_regional: {
      hindi: ['kamzor', 'uth nahi pa raha', 'thaka hua', 'nirbal', 'sust'],
      marathi: ['adkha', 'uthta nahi', 'thakala aahe', 'shaktihin', 'ashaktapana', 'basun ahe'],
      tamil: ['mela illama', 'thazha pada', 'valikuthu'],
      telugu: ['balaheenanga', 'lekkaleru', 'lethalemu'],
      gujarati: ['nabbad', 'ubha na thay', 'namali gayo'],
      punjabi: ['kamzor', 'utha nahi sakda', 'uthna nahi'],
    },
    medical_synonyms: ['asthenia', 'lethargy', 'recumbency', 'malaise'],
  },

  diarrhea: {
    model_key: 'diarrhea',
    severity_weight: 2,
    category: 'visual',
    is_visually_detectable: 'yes',
    clip_prompts: [
      'A photo of a cow with watery or loose manure stained on its hind legs',
      'A photo of livestock showing signs of diarrhea with soiled tail and rump',
      'A photo of a calf with yellowish watery diarrhea on bedding',
      'A photo of cattle showing bloody or dark loose stool on the ground',
    ],
    voice_phrases_en: [
      'diarrhea', 'loose motion', 'watery stool', 'scours', 'loose dung',
      'frequent stool', 'soiled tail', 'fluid stool', 'bloody diarrhea',
      'stomach upset', 'running stomach',
    ],
    voice_phrases_regional: {
      hindi: ['dast', 'patla gobar', 'loose motion', 'pet kharab', 'दस्त', 'पतला गोबर'],
      marathi: ['hagwan', 'patal shean', 'dast', 'julaab', 'patal sandas', 'जुलाब', 'पातळ शेण'],
      tamil: ['vayitru pokku', 'keel pokku'],
      telugu: ['virochanalu', 'katla poku'],
      gujarati: ['zaada', 'patla jhada'],
      punjabi: ['dast', 'patli tatti'],
    },
    medical_synonyms: ['enteritis', 'scours', 'dysentery'],
  },

  loss_of_appetite: {
    model_key: 'loss_of_appetite',
    severity_weight: 2,
    category: 'invisible',
    is_visually_detectable: 'no',
    clip_prompts: [
      'A photo of cattle ignoring feed in a trough with head turned away',
      'A photo of an emaciated livestock animal showing visible ribs',
      'A photo of a goat refusing fresh fodder or green grass',
    ],
    voice_phrases_en: [
      'not eating', 'refusing food', 'loss of appetite', 'off feed',
      'not touching fodder', 'wont eat', 'eating very little', 'no hunger',
      'stopped eating', 'anorexia', 'refuses grain',
    ],
    voice_phrases_regional: {
      hindi: ['khana band kar diya', 'bhukh nahi lag rahi', 'chara nahi kha raha', 'khana chhod diya', 'खाना बंद', 'भूख नहीं'],
      marathi: ['chara khat nahi', 'jevat nahi', 'bhuk kami zali', 'chara sodla', 'khat nahi', 'चारा खात नाही', 'जेवत नाही', 'भूक मंदावली'],
      tamil: ['theeni thinnalai', 'sappada matenguthu'],
      telugu: ['meetha tinatledu', 'aakali ledu'],
      gujarati: ['khorak nathi khato', 'chara nathi khato'],
      punjabi: ['chara nahi khandi', 'bhookh nahi'],
    },
    medical_synonyms: ['anorexia', 'inappetence', 'hyporexia'],
  },

  reduced_milk_production: {
    model_key: 'reduced_milk_production',
    severity_weight: 2,
    category: 'invisible',
    is_visually_detectable: 'no',
    clip_prompts: [
      'A photo of a dairy cow with a shrunken or uneven udder',
      'A photo of an empty milking pail next to a lactating cow',
    ],
    voice_phrases_en: [
      'milk drop', 'less milk', 'milk reduced', 'not giving milk',
      'milk yield down', 'stopped milking', 'low milk', 'half milk',
    ],
    voice_phrases_regional: {
      hindi: ['doodh kam ho gaya', 'doodh nahi de rahi', 'doodh ghat gaya', 'दूध कम हो गया', 'दूध नहीं'],
      marathi: ['doodh kami zale', 'doodh ghatle', 'doodh det nahi', 'दूध कमी झाले', 'दूध घटले'],
      tamil: ['paal koranjiruchu', 'paal varalai'],
      telugu: ['paalu taggayyi', 'paalu ivvatledu'],
      gujarati: ['doodh oochu thayu'],
      punjabi: ['dudh ghatt gaya'],
    },
    medical_synonyms: ['hypogalactia', 'agalactia', 'drop in milk yield'],
  },

  skin_lesions: {
    model_key: 'skin_lesions',
    severity_weight: 3,
    category: 'visual',
    is_visually_detectable: 'yes',
    clip_prompts: [
      'A close-up photo of round nodules or bumps on the skin of a cow',
      'A photo of blisters and open erosions on the tongue or gums of cattle',
      'A photo of blisters and ulcers in the interdigital cleft of cattle hooves',
      'A photo of painful scabs, sores and crusty lesions on animal skin',
      'A photo of lumpy skin disease nodules all over a cattle body',
      'A photo of pustules or ruptured vesicles on livestock muzzle or udder',
    ],
    voice_phrases_en: [
      'skin lesions', 'nodules', 'blisters', 'bumps on skin', 'sores on skin',
      'mouth sores', 'tongue blisters', 'hoof sores', 'lumps on body',
      'ulcers in mouth', 'crusty skin', 'foot lesions', 'scabs on skin',
    ],
    voice_phrases_regional: {
      hindi: ['chaale', 'fode', 'gaanthe', 'muh me chhale', 'khur me ghav', 'lumpy gaanth', 'छाले', 'मुंह में छाले', 'फोड', 'गांठें'],
      marathi: ['fode', 'khuraat ghav', 'tondat chhale', 'twachevar gaathi', 'lumpy', 'chhate', 'फोड', 'तोंडात फोड', 'तोंडाला फोड', 'गाठी', 'त्वचेवर गाठी'],
      tamil: ['kattigal', 'thondaravu', 'vaai pun'],
      telugu: ['gullalu', 'nooti punlu', 'charma gullalu'],
      gujarati: ['chala', 'gath', 'fodki'],
      punjabi: ['chhale', 'thode', 'phore'],
    },
    medical_synonyms: ['vesicles', 'cutaneous nodules', 'papules', 'oral ulcers', 'pemphigus'],
  },

  swelling: {
    model_key: 'swelling',
    severity_weight: 3,
    category: 'visual',
    is_visually_detectable: 'yes',
    clip_prompts: [
      'A photo of severe swelling in the throat and brisket area of a cow',
      'A photo of swollen lymph nodes under the jaw or in the prescapular region of cattle',
      'A photo of an intensely swollen, red udder indicating acute mastitis',
      'A photo of swollen limbs or joint inflammation in livestock',
    ],
    voice_phrases_en: [
      'swelling', 'swollen neck', 'swollen throat', 'brisket edema',
      'swollen udder', 'swollen legs', 'enlarged lymph node', 'puffy throat',
      'watery swelling under jaw', 'bottle jaw',
    ],
    voice_phrases_regional: {
      hindi: ['sujan', 'gala sooj gaya', 'than me sujan', 'tang sooji hui', 'sooj', 'सूजन', 'सूज'],
      marathi: ['suj', 'gala sujla', 'kasa sujli', 'payat suj', 'angavar suj', 'सूज', 'गळा सुजला'],
      tamil: ['veekam', 'thondai veekam'],
      telugu: ['vapu', 'gontu vapu'],
      gujarati: ['sujano', 'gala ma sujan'],
      punjabi: ['sooj', 'gala phool gaya'],
    },
    medical_synonyms: ['edema', 'lymphadenopathy', 'brisket edema', 'mastitis'],
  },

  respiratory_distress: {
    model_key: 'respiratory_distress',
    severity_weight: 4,
    category: 'semi_visual',
    is_visually_detectable: 'yes',
    clip_prompts: [
      'A photo of a cow breathing with extended neck, open mouth and panting tongue',
      'A photo of cattle showing rapid abdominal breathing and flared nostrils',
      'A photo of a buffalo with severe dyspnea and wheezing breathing posture',
      'A photo of an animal gasping for air with excessive salivation',
    ],
    voice_phrases_en: [
      'hard to breathe', 'difficulty breathing', 'gasping', 'panting heavily',
      'breathing fast', 'respiratory distress', 'labored breathing',
      'struggling for air', 'wheezing', 'open mouth breathing',
    ],
    voice_phrases_regional: {
      hindi: ['saans lene me taklif', 'haaf raha hai', 'saans fulna', 'tez saans', 'सांस लेने में तकलीफ', 'सांस फूलना'],
      marathi: ['shwas ghyayla tras', 'dham lagli', 'hafne', 'vegat shwas', 'shwas ghene kathin', 'धाप', 'धाप लागणे', 'श्वास घेण्यास त्रास'],
      tamil: ['moochu thinaral', 'moochu vidamudiyala'],
      telugu: ['swasa kashtam', 'swasa aagatledu'],
      gujarati: ['shwas leva ma taklif', 'hafe che'],
      punjabi: ['saah lain ch dikkat', 'haphna'],
    },
    medical_synonyms: ['dyspnea', 'tachypnea', 'polypnea', 'orthopnea'],
  },

  neurological_symptoms: {
    model_key: 'neurological_symptoms',
    severity_weight: 5,
    category: 'semi_visual',
    is_visually_detectable: 'yes',
    clip_prompts: [
      'A photo of a cow circling repetitively with head tilted to one side',
      'A photo of cattle pressing its head against a wall or fence from brain inflammation',
      'A photo of a livestock animal having muscle tremors, seizures or convulsions',
      'A photo of an animal in lateral recumbency with pedaling limb movements',
    ],
    voice_phrases_en: [
      'circling', 'head pressing', 'convulsions', 'shivering violently',
      'seizures', 'paralysis', 'blindness', 'staggering wildly',
      'muscle spasms', 'abnormal behavior', 'rabid symptoms', 'fits',
    ],
    voice_phrases_regional: {
      hindi: ['gol gol ghum raha', 'daure pad rahe', 'sir deewar se tika raha', 'pagal jaisa kar raha', 'jhatke', 'दौरे', 'झटके'],
      marathi: ['gol firne', 'doke bhintila tekavne', 'aatke', 'vedyasarakhe vagne', 'zarap', 'mirgi', 'चक्कर', 'झटके'],
      tamil: ['suthuthu', 'valippu'],
      telugu: ['tirugutundi', 'moorchalu'],
      gujarati: ['gol ghumey', 'khinch'],
      punjabi: ['gol chakar', 'daurey'],
    },
    medical_synonyms: ['ataxia', 'head pressing', 'encephalitis', 'opisthotonos', 'seizures'],
  },

  sudden_death: {
    model_key: 'sudden_death',
    severity_weight: 5,
    category: 'visual',
    is_visually_detectable: 'yes',
    clip_prompts: [
      'A photo of a cow dead on pasture with no prior symptoms and bloated body',
      'A photo of cattle dead with dark uncoagulated blood oozing from mouth and rectum',
      'A photo of multiple dead sheep or goats lying together in a field',
    ],
    voice_phrases_en: [
      'sudden death', 'died suddenly', 'found dead', 'collapsed and died',
      'dead this morning', 'multiple deaths', 'died without warning',
      'blood coming from dead animal', 'immediate mortality',
    ],
    voice_phrases_regional: {
      hindi: ['achanak maut', 'turant mar gaya', 'subah mara mila', 'khoon nikal raha hai mrit janwar se', 'अचानक मौत', 'तुरंत मौत'],
      marathi: ['achanak mrutyu', 'lagech meli', 'mruta ahe', 'rakta yet ahe', 'shanka ahe anthrax', 'अचानक मृत्यू', 'अचानक मरण'],
      tamil: ['thideer maranam', 'erandurchu'],
      telugu: ['haathattu maranam', 'chanipoyindi'],
      gujarati: ['achanak mrutyu', 'mari gayu'],
      punjabi: ['achanak maut', 'mar gaya'],
    },
    medical_synonyms: ['peracute mortality', 'apoplexy', 'anthrax shock syndrome'],
  },
};

export interface VoicePreset {
  id: string;
  title: string;
  language: 'Marathi' | 'Hindi' | 'English';
  badge: string;
  transcript: string;
  englishTranslation: string;
  expectedSymptoms: SymptomKey[];
  expectedDenied: SymptomKey[];
  clinicalContext: string;
}

export const VOICE_PRESETS: VoicePreset[] = [
  {
    id: 'vp-mr-1',
    title: 'मराठी: FMD संशयित (ताप व लाळ/तोंडात फोड)',
    language: 'Marathi',
    badge: 'Marathi Field Vet',
    transcript: 'माझ्या गायीला २ दिवसांपासून तीव्र ताप आला आहे आणि तोंडात फोड आले असून लाळ गळत आहे.',
    englishTranslation: 'My cow has high fever for 2 days and blisters in mouth with excessive salivation.',
    expectedSymptoms: ['fever', 'skin_lesions', 'swelling'],
    expectedDenied: [],
    clinicalContext: 'Classic Foot & Mouth Disease (FMD) prodromal signs reported by Nashik dairy farmer.',
  },
  {
    id: 'vp-hi-1',
    title: 'हिंदी: श्वसन संसर्ग व तीव्र ताप (BRD/HS)',
    language: 'Hindi',
    badge: 'Hindi Para-Vet',
    transcript: 'भैंस को बहुत तेज बुखार है, सांस लेने में तकलीफ हो रही है और खाना बिल्कुल बंद कर दिया है।',
    englishTranslation: 'The buffalo has very high fever, difficulty breathing, and has completely stopped eating.',
    expectedSymptoms: ['fever', 'respiratory_distress', 'loss_of_appetite'],
    expectedDenied: [],
    clinicalContext: 'Acute Bovine Respiratory Disease / Hemorrhagic Septicemia cluster reported in Pune block.',
  },
  {
    id: 'vp-en-1',
    title: 'English: Sudden Death Cluster (Anthrax Alert)',
    language: 'English',
    badge: 'Emergency Alert',
    transcript: 'Three adult cattle collapsed with sudden death this morning, dark blood oozing, no prior cough or diarrhea.',
    englishTranslation: 'Three adult cattle collapsed with sudden death this morning, dark blood oozing, no prior cough or diarrhea.',
    expectedSymptoms: ['sudden_death', 'weakness'],
    expectedDenied: ['coughing', 'diarrhea'],
    clinicalContext: 'Critical Anthrax Red-Flag safety override test with negative exclusion of coughing/diarrhea.',
  },
  {
    id: 'vp-en-2',
    title: 'English: Mild Calf Scours with Negation Check',
    language: 'English',
    badge: 'Low Concern Negation',
    transcript: 'Calf has mild diarrhea and loose dung, but no fever and is active and eating.',
    englishTranslation: 'Calf has mild diarrhea and loose dung, but no fever and is active and eating.',
    expectedSymptoms: ['diarrhea'],
    expectedDenied: ['fever', 'loss_of_appetite'],
    clinicalContext: 'Validates negation handling where "no fever" prevents false positive high alert.',
  },
];

export interface VisionPreset {
  id: string;
  name: string;
  diseaseDiagnosis: string;
  imageUrl: string;
  badge: 'Critical Outbreak' | 'High Risk' | 'Moderate Risk' | 'Healthy Control';
  clipMatches: { symptom: SymptomKey; confidence: number; prompt: string }[];
  clinicalDescription: string;
  officialAdvisory: string;
}

export const VISION_PRESETS: VisionPreset[] = [
  {
    id: 'vis-fmd',
    name: 'Foot and Mouth Disease (FMD)',
    diseaseDiagnosis: 'Aphthovirus (Foot & Mouth Disease) - Serotype O/A',
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&auto=format&fit=crop&q=80',
    badge: 'Critical Outbreak',
    clipMatches: [
      { symptom: 'skin_lesions', confidence: 0.942, prompt: 'A photo of blisters and open erosions on tongue and gums' },
      { symptom: 'swelling', confidence: 0.784, prompt: 'A photo of severe swelling in interdigital cleft and coronet band' },
      { symptom: 'loss_of_appetite', confidence: 0.812, prompt: 'A photo of cattle refusing feed due to painful stomatitis' },
      { symptom: 'fever', confidence: 0.718, prompt: 'A photo of cattle with drooping ears and shivering from pyrexia' },
    ],
    clinicalDescription: 'Multiple ruptured vesicles coalescing into extensive erosive ulcers on oral mucosa and dental pad with profuse ropy salivation.',
    officialAdvisory: 'Immediate bio-containment within 10 km radius. Ring vaccination protocol with Bivalent FMD oil-adjuvant vaccine mandated.',
  },
  {
    id: 'vis-lsd',
    name: 'Lumpy Skin Disease (LSD)',
    diseaseDiagnosis: 'Capripoxvirus (Lumpy Skin Disease)',
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&auto=format&fit=crop&q=80',
    badge: 'Critical Outbreak',
    clipMatches: [
      { symptom: 'skin_lesions', confidence: 0.926, prompt: 'A photo of circumscribed firm nodular skin lesions across body' },
      { symptom: 'swelling', confidence: 0.865, prompt: 'A photo of edematous swelling of dewlap, brisket and lower limbs' },
      { symptom: 'weakness', confidence: 0.745, prompt: 'A photo of emaciated cattle with drooping posture and lethargy' },
    ],
    clinicalDescription: 'Widespread circumscribed cutaneous nodules (2-5 cm diameter) over neck, thorax, and perineum with localized edema.',
    officialAdvisory: 'Vector control (Culicoides/mosquito fogging) and mandatory Goat Pox vaccine (Uttarkashi strain) heterologous dosing.',
  },
  {
    id: 'vis-brd',
    name: 'Bovine Respiratory Distress / HS',
    diseaseDiagnosis: 'Pasteurella multocida / Mannheimia haemolytica',
    imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?w=800&auto=format&fit=crop&q=80',
    badge: 'High Risk',
    clipMatches: [
      { symptom: 'respiratory_distress', confidence: 0.895, prompt: 'A photo of cattle breathing with extended neck and open mouth' },
      { symptom: 'nasal_discharge', confidence: 0.882, prompt: 'A photo of thick mucoid nasal discharge dripping from nostrils' },
      { symptom: 'coughing', confidence: 0.764, prompt: 'A photo of animal coughing with flared nostrils' },
    ],
    clinicalDescription: 'Acute tachypnea, prominent abdominal heave line, bilateral mucopurulent nasal discharge, and loud inspiratory stridor.',
    officialAdvisory: 'Isolate affected herd immediately. Administer long-acting Oxytetracycline/Ceftiofur and notify local Veterinary Dispensary.',
  },
  {
    id: 'vis-healthy',
    name: 'Healthy Bovine Baseline (Gir Cow)',
    diseaseDiagnosis: 'Healthy Control - No Pathological Lesions Detected',
    imageUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=800&auto=format&fit=crop&q=80',
    badge: 'Healthy Control',
    clipMatches: [
      { symptom: 'weakness', confidence: 0.042, prompt: 'A photo of a livestock animal looking weak' },
      { symptom: 'skin_lesions', confidence: 0.038, prompt: 'A photo of sores or lesions on skin' },
      { symptom: 'respiratory_distress', confidence: 0.025, prompt: 'A photo of animal panting or gasping' },
    ],
    clinicalDescription: 'Moist cool muzzle, bright alert eyes, glossy smooth coat, normal respiratory rhythm (18 breaths/min), upright stance.',
    officialAdvisory: 'Routine scheduled prophylactic deworming and FMD booster due in 45 days. Animal cleared for marketplace trade.',
  },
];
