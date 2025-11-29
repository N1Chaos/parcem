  let frameCount = 0;
  let analyserLeftGlobal;
  let dataArrayLeftGlobal;


  // ==================== CONSTANTES ====================
  const PAGES = {
    page1: "Styles",
    page2: "Effectif",
    page3: "Instruments",
    page4: "Voix",
    page5: "Timbre",
    page6: "Forme",
    page7: "Harmonie",
    page8: "Procédé",
    page9: "Tempo",
    page10: "Rythme",
    page11: "Genre",
    page12: "Dynamique",
    page13: "Langues",
    page14: "Adjectifs",
    'langues-classification': "Classification"
  };

  // ==================== FONCTIONS UTILITAIRES ====================
  function getPageName() {
    return window.location.pathname.split('/').pop().replace('.html', '');
  }

  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  // ==================== GESTION DES MOTS SÉLECTIONNÉS ====================
  function displayWordsForPage(page) {
    const container = document.querySelector(`.selected-words-container[data-page="${page}"]`);
    if (!container) return;

    // Si c'est la page Langues, fusionner page13 + langues-classification
    let words = [];
    if (page === 'page13') {
      const wordsPage13 = loadFromLocalStorage('selectedWords_page13') || [];
      const wordsClassification = loadFromLocalStorage('selectedWords_langues-classification') || [];
      words = [...wordsPage13, ...wordsClassification];
    } else {
      words = loadFromLocalStorage(`selectedWords_${page}`) || [];
    }


    if (words.length === 0) {
      container.innerHTML = "<span class='empty'>Aucun mot sélectionné</span>";
    } else {
      container.innerHTML = words.map(word => {
        const escaped = word.replace(/'/g, "\\'").replace(/"/g, "\\\"");
        return `
          <span class="tag" data-bs-toggle="tooltip" title="${wordDefinitions[word]?.definition || 'Pas de définition'}">
            ${word}
            <span class="delete-word" onclick="deleteWordFromMainPage('${page}', '${escaped}')">×</span>
          </span>
        `;
      }).join(' ');
    }

    // Réactiver les tooltips
    container.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      const t = bootstrap.Tooltip.getInstance(el);
      if (t) t.dispose();
      new bootstrap.Tooltip(el, { trigger: 'hover' });
    });

    console.log(`Mots affichés pour ${page}:`, words);
  }


  // Mettre à jour les mots affichés lorsqu’un changement est détecté dans localStorage
  function updateWordsOnStorageChange() {
    const pages = ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9', 'page10', 'page11', 'page12', 'page13', 'page14'];
    pages.forEach(pageName => {
      displayWordsForPage(pageName);
    });
  }

  // Écouter les changements dans localStorage
  window.addEventListener('storage', (event) => {
    if (event.key && (event.key === 'selectedWords' || event.key.startsWith('selectedWords_') || event.key === 'clearSelectionEvent')) {
      console.log('Changement détecté dans localStorage:', event.key);
      updateWordsOnStorageChange();
    }
  });

  // ==================== LECTEUR YOUTUBE ====================
  function extractVideoID(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    return url.match(regex)?.[1];
  }

  function loadVideo() {
    const videoID = extractVideoID(document.getElementById('videoUrl').value);
    if (!videoID) return alert('URL YouTube invalide');

    const player = document.getElementById('youtubePlayer');
    player.src = `https://www.youtube.com/embed/${videoID}`;
    localStorage.setItem('youtubeVideoID', videoID);
  }

  // ==================== ENREGISTREMENT AUDIO ====================
  async function setupAudioRecorder() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      let audioChunks = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = e => audioChunks.push(e.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        document.getElementById('audioPlayback').src = audioUrl;
        window.audioBlob = audioBlob;
      };

      document.getElementById('recordButton').onclick = () => {
        if (recorder.state === 'inactive') {
          audioChunks = [];
          recorder.start();
          this.textContent = "Arrêter";
        } else {
          recorder.stop();
          this.textContent = "Démarrer";
        }
      };
    } catch (error) {
      console.error("Erreur microphone:", error);
    }
  }

  // ==================== FONCTIONS IndexedDB ====================
  async function openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('AudioDB', 1);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('audioStore', { keyPath: 'id' });
      };
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    });
  }

  async function saveAudioToDB(blob, time, fileName, duration = 0) {
    try {
      const db = await openDB();
      const transaction = db.transaction(['audioStore'], 'readwrite');
      const store = transaction.objectStore('audioStore');
      const audioData = { 
        id: 'userAudio', 
        blob, 
        time, 
        fileName,
        duration  // ← nouvelle info sauvegardée
      };
      await store.put(audioData);
      console.log('Fichier sauvegardé avec durée:', audioData);
    } catch (error) {
      console.error('Erreur sauvegarde IndexedDB:', error);
    }
  }

  // MODIFICATION: Fonction pour sauvegarder l’état audio (utilisée par le mini-lecteur)
  async function saveAudioStateToDB(state) {
    try {
      const db = await openDB();
      const transaction = db.transaction(['audioStore'], 'readwrite');
      const store = transaction.objectStore('audioStore');
      await store.put({ id: 'audioState', ...state });
      console.log('État audio sauvegardé dans IndexedDB:', state);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'état dans IndexedDB:', error);
    }
  }

  async function loadAudioFromDB() {
    try {
      const db = await openDB();
      const transaction = db.transaction(['audioStore'], 'readonly');
      const store = transaction.objectStore('audioStore');
      const request = store.get('userAudio');
      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
      });
    } catch (error) {
      console.error('Erreur lors du chargement depuis IndexedDB:', error);
      return null;
    }
  }

  // MODIFICATION: Fonction pour charger l’état audio (utilisée par le mini-lecteur)
  async function loadAudioStateFromDB() {
    try {
      const db = await openDB();
      const transaction = db.transaction(['audioStore'], 'readonly');
      const store = transaction.objectStore('audioStore');
      const request = store.get('audioState');
      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
      });
    } catch (error) {
      console.error('Erreur lors du chargement de l\'état depuis IndexedDB:', error);
      return null;
    }
  }

  // ==================== GESTION AUDIO UTILISATEUR ====================
 // ==================== PLYR + WEB AUDIO API (SANS VOLUME) ====================
let plyrInstance, audioContext, sourceNode, analyserLeft, analyserRight, gainNode, splitter;
let analyserLeftGlobal, dataArrayLeftGlobal; // gardés pour tes visualisations existantes

async function initPlyrAudio() {
  const audioEl = document.getElementById('audioPlayer');

  plyrInstance = new Plyr('#audioPlayer', {
    controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'settings', 'fullscreen'],
    settings: ['speed'],
    speed: { selected: 1, options: [0.5, 1, 1.5, 2] },
    volume: 0.75,
    hideControls: true
  });

  // Cacher le contrôle volume de Plyr
  const vol = document.querySelector('.plyr__volume');
  if (vol) vol.style.display = 'none';

  // Web Audio API
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  sourceNode = audioContext.createMediaElementSource(audioEl);

  analyserLeft = audioContext.createAnalyser();
  analyserRight = audioContext.createAnalyser();
  analyserLeft.fftSize = analyserRight.fftSize = 2048;

  gainNode = audioContext.createGain();
  gainNode.gain.value = 0.75;

  splitter = audioContext.createChannelSplitter(2);

  sourceNode.connect(gainNode);
  gainNode.connect(splitter);
  splitter.connect(analyserLeft, 0);
  splitter.connect(analyserRight, 1);
  gainNode.connect(audioContext.destination);

  // Pour que tes visualisations continuent de marcher
  analyserLeftGlobal = analyserLeft;
  dataArrayLeftGlobal = new Uint8Array(analyserLeft.frequencyBinCount);

  // Synchro vitesse Plyr ↔ ton select
  const speedSelect = document.getElementById('playbackSpeed');
  speedSelect.addEventListener('change', () => plyrInstance.speed = +speedSelect.value);
  plyrInstance.on('ratechange', () => speedSelect.value = plyrInstance.speed);

  // Démarre les animations (spectre, spectrogramme, VU…)
  if (!animationId) animate();

  console.log('Plyr + Web Audio initialisés proprement');
}

  // ==================== ENREGISTREMENT AUDIO ====================
  async function setupAudioRecorder() {
    const recordButton = document.getElementById('recordButton');
    const recordingIndicator = document.getElementById('recordingIndicator');
    const recordingConfirmation = document.getElementById('recordingConfirmation');
    let audioChunks = [];
    let recorder = null;
    let recordingSeconds = 0;
    let timerInterval = null;

    if (!recordButton || !recordingIndicator || !recordingConfirmation) {
      console.error('Éléments d’enregistrement non trouvés dans le DOM');
      return;
    }

    recordButton.onclick = async () => {
      if (!recorder || recorder.state === 'inactive') {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          recorder = new MediaRecorder(stream);
          audioChunks = [];

          recorder.ondataavailable = e => audioChunks.push(e.data);
          recorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            document.getElementById('audioPlayback').src = audioUrl;
            window.audioBlob = audioBlob;
            recordButton.classList.remove('btn-warning');
            recordButton.classList.add('btn-danger');
            recordButton.innerHTML = '<i class="bi bi-mic-fill"></i> Enregistrer votre commentaire';
            recordingIndicator.style.display = 'none';
            clearInterval(timerInterval);
            recordingSeconds = 0;
            recordingConfirmation.style.display = 'inline';
            setTimeout(() => {
              recordingConfirmation.style.display = 'none';
            }, 10000);
            console.log('Enregistrement arrêté, commentaire enregistré');
            stream.getTracks().forEach(track => track.stop());
          };

          recorder.start();
          recordButton.classList.remove('btn-danger');
          recordButton.classList.add('btn-warning');
          recordButton.innerHTML = '<i class="bi bi-stop-fill"></i> Arrêter l\'enregistrement';
          recordingIndicator.style.display = 'inline';
          recordingSeconds = 0;
          recordingIndicator.textContent = `Enregistrement en cours... (0 s)`;
          timerInterval = setInterval(() => {
            recordingSeconds++;
            recordingIndicator.textContent = `Enregistrement en cours... (${recordingSeconds} s)`;
          }, 1000);
          recordingConfirmation.style.display = 'none';
          console.log('Enregistrement démarré');
        } catch (error) {
          console.error('Erreur microphone:', error);
          // Pas d'alerte, comme demandé
        }
      } else {
        recorder.stop();
      }
    };
  }

  // ==================== INITIALISATION ====================
  document.addEventListener("DOMContentLoaded", async () => {

    setTimeout(() => {
    if (!animationId) {
      animate();
      console.log('Animation démarrée au chargement');
    }
  }, 100);

    const currentPage = getPageName();
    console.log('Page actuelle:', currentPage);
    if (currentPage === '' || currentPage === 'index') {
      console.log('Initialisation de setupAudioPlayer sur la page principale');
      await initPlyrAudio();

    // Sauvegarde et restauration du brouillon de commentaire
  const commentText = document.getElementById('commentText');
  if (commentText) {
    const savedDraft = localStorage.getItem('commentDraft');
    if (savedDraft) {
      commentText.value = savedDraft;
    }
    commentText.addEventListener('input', () => {
      localStorage.setItem('commentDraft', commentText.value);
    });
    
    const generateTextButton = document.getElementById('generateTextButton');
    if (generateTextButton) {
      generateTextButton.addEventListener('click', () => {
        // NE RIEN FAIRE après la génération du fichier
        // Le texte reste dans le champ et le brouillon est conservé
        console.log('Fichier généré, commentaire conservé');
      });
    }
  } else {
    console.warn('Champ de commentaire avec id="commentText" non trouvé.');
  }
    }

    Object.keys(PAGES).forEach(displayWordsForPage);

    const savedVideoID = localStorage.getItem('youtubeVideoID');
    if (savedVideoID) {
      document.getElementById('youtubePlayer').src = `https://www.youtube.com/embed/${savedVideoID}`;
      document.getElementById('videoUrl').value = `https://youtu.be/${savedVideoID}`;
    }

    setupAudioRecorder();

  document.getElementById('downloadButton').onclick = () => {
    if (!window.audioBlob) return alert('Aucun enregistrement');
    const name = document.getElementById('fileName').value || 'enregistrement';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(window.audioBlob);
    link.download = name + '.wav';
    link.click();
  };
  });

  // ==================== GÉNÉRATION FICHIER TEXTE ====================
  function generateTextFile() {
    const commentText = document.getElementById('commentText');
    const text = commentText.value.trim();
    if (!text) return alert('Veuillez écrire un commentaire');

    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'commentaire.txt';
    link.click();
    
    // NE PAS SUPPRIMER le texte après génération
    // Le commentaire reste dans la zone de texte
  }
  // ==================== EXPORT WORD ====================
  // ==================== EXPORT WORD ====================
  function exportToWord() {
    const commentText = document.getElementById('commentText');
    const text = commentText.value.trim();
    if (!text) {
      alert('Veuillez écrire un commentaire');
      return;
    }

  // Ajouter BOM UTF-8 pour que Word reconnaisse automatiquement l'encodage
    const BOM = '\uFEFF';
    const content = BOM + text;
    
    const blob = new Blob([content], { type: 'text/plain; charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'commentaire_musical.doc';
    link.click();
    
    console.log('Fichier Word exporté');
  }
  // ==================== INITIALISATION ====================
  document.addEventListener("DOMContentLoaded", () => {
    Object.keys(PAGES).forEach(displayWordsForPage);

    const savedVideoID = localStorage.getItem('youtubeVideoID');
    if (savedVideoID) {
      document.getElementById('youtubePlayer').src = `https://www.youtube.com/embed/${savedVideoID}`;
      document.getElementById('videoUrl').value = `https://youtu.be/${savedVideoID}`;
    }

    setupAudioRecorder();
    setupAudioPlayer();

    document.getElementById('downloadButton').onclick = async () => {
    if (!window.audioBlob) return alert('Aucun enregistrement disponible');

    const fileName = document.getElementById('fileName').value || 'enregistrement';
    
    // Téléchargement direct en WAV - 100% fiable
    const link = document.createElement('a');
    link.href = URL.createObjectURL(window.audioBlob);
    link.download = `${fileName}.wav`;
    link.click();
    
    console.log('Fichier WAV téléchargé:', `${fileName}.wav`);
  };
  });

  // Stocker les données des pays
  let countryData = {};
  const isoCorrections = {
    'UK': 'GB',
    'AN': 'NL',
    'TP': 'TL'
  };
  const capitalFallbacks = {
    'AF': 'Kaboul',
    'AL': 'Tirana',
    'DZ': 'Alger',
    'AD': 'Andorre-la-Vieille',
    'AO': 'Luanda',
    'AG': 'Saint John\'s',
    'AR': 'Buenos Aires',
    'AM': 'Erevan',
    'AU': 'Canberra',
    'AT': 'Vienne',
    'AZ': 'Bakou',
    'BS': 'Nassau',
    'BH': 'Manama',
    'BD': 'Dacca',
    'BB': 'Bridgetown',
    'BY': 'Minsk',
    'BE': 'Bruxelles',
    'BZ': 'Belmopan',
    'BJ': 'Porto-Novo',
    'BT': 'Thimphou',
    'BO': 'Sucre',
    'BA': 'Sarajevo',
    'BW': 'Gaborone',
    'BR': 'Brasilia',
    'BN': 'Bandar Seri Begawan',
    'BG': 'Sofia',
    'BF': 'Ouagadougou',
    'BI': 'Gitega',
    'CV': 'Praia',
    'KH': 'Phnom Penh',
    'CM': 'Yaoundé',
    'CA': 'Ottawa',
    'CF': 'Bangui',
    'TD': 'N\'Djamena',
    'CL': 'Santiago',
    'CN': 'Pékin',
    'CO': 'Bogota',
    'KM': 'Moroni',
    'CD': 'Kinshasa',
    'CG': 'Brazzaville',
    'CR': 'San José',
    'CI': 'Yamoussoukro',
    'HR': 'Zagreb',
    'CU': 'La Havane',
    'CY': 'Nicosie',
    'CZ': 'Prague',
    'DK': 'Copenhague',
    'DJ': 'Djibouti',
    'DM': 'Roseau',
    'DO': 'Saint-Domingue',
    'EC': 'Quito',
    'EG': 'Le Caire',
    'SV': 'San Salvador',
    'GQ': 'Malabo',
    'ER': 'Asmara',
    'EE': 'Tallinn',
    'SZ': 'Mbabane',
    'ET': 'Addis-Abeba',
    'FJ': 'Suva',
    'FI': 'Helsinki',
    'FR': 'Paris',
    'GA': 'Libreville',
    'GM': 'Banjul',
    'GE': 'Tbilissi',
    'DE': 'Berlin',
    'GH': 'Accra',
    'GR': 'Athènes',
    'GD': 'Saint-Georges',
    'GT': 'Guatemala',
    'GN': 'Conakry',
    'GW': 'Bissau',
    'GY': 'Georgetown',
    'HT': 'Port-au-Prince',
    'HN': 'Tegucigalpa',
    'HU': 'Budapest',
    'IS': 'Reykjavik',
    'IN': 'New Delhi',
    'ID': 'Jakarta',
    'IR': 'Téhéran',
    'IQ': 'Bagdad',
    'IE': 'Dublin',
    'IL': 'Jérusalem',
    'IT': 'Rome',
    'JM': 'Kingston',
    'JP': 'Tokyo',
    'JO': 'Amman',
    'KZ': 'Noursoultan',
    'KE': 'Nairobi',
    'KI': 'Tarawa-Sud',
    'KP': 'Pyongyang',
    'KR': 'Séoul',
    'KW': 'Koweït',
    'KG': 'Bichkek',
    'LA': 'Vientiane',
    'LV': 'Riga',
    'LB': 'Beyrouth',
    'LS': 'Maseru',
    'LR': 'Monrovia',
    'LY': 'Tripoli',
    'LI': 'Vaduz',
    'LT': 'Vilnius',
    'LU': 'Luxembourg',
    'MG': 'Antananarivo',
    'MW': 'Lilongwe',
    'MY': 'Kuala Lumpur',
    'MV': 'Malé',
    'ML': 'Bamako',
    'MT': 'La Valette',
    'MH': 'Majuro',
    'MR': 'Nouakchott',
    'MU': 'Port-Louis',
    'MX': 'Mexico',
    'FM': 'Palikir',
    'MD': 'Chișinău',
    'MC': 'Monaco',
    'MN': 'Oulan-Bator',
    'ME': 'Podgorica',
    'MA': 'Rabat',
    'MZ': 'Maputo',
    'MM': 'Naypyidaw',
    'NA': 'Windhoek',
    'NR': 'Yaren',
    'NP': 'Katmandou',
    'NL': 'Amsterdam',
    'NZ': 'Wellington',
    'NI': 'Managua',
    'NE': 'Niamey',
    'NG': 'Abuja',
    'MK': 'Skopje',
    'NO': 'Oslo',
    'OM': 'Mascate',
    'PK': 'Islamabad',
    'PW': 'Ngerulmud',
    'PA': 'Panama',
    'PG': 'Port Moresby',
    'PY': 'Asuncion',
    'PE': 'Lima',
    'PH': 'Manille',
    'PL': 'Varsovie',
    'PT': 'Lisbonne',
    'QA': 'Doha',
    'RO': 'Bucarest',
    'RU': 'Moscou',
    'RW': 'Kigali',
    'KN': 'Basseterre',
    'LC': 'Castries',
    'VC': 'Kingstown',
    'WS': 'Apia',
    'SM': 'Saint-Marin',
    'ST': 'São Tomé',
    'SA': 'Riyad',
    'SN': 'Dakar',
    'RS': 'Belgrade',
    'SC': 'Victoria',
    'SL': 'Freetown',
    'SG': 'Singapour',
    'SK': 'Bratislava',
    'SI': 'Ljubljana',
    'SB': 'Honiara',
    'SO': 'Mogadiscio',
    'ZA': 'Pretoria',
    'SS': 'Djouba',
    'ES': 'Madrid',
    'LK': 'Sri Jayawardenepura Kotte',
    'SD': 'Khartoum',
    'SR': 'Paramaribo',
    'SE': 'Stockholm',
    'CH': 'Berne',
    'SY': 'Damas',
    'TW': 'Taipei',
    'TJ': 'Douchanbé',
    'TZ': 'Dodoma',
    'TH': 'Bangkok',
    'TL': 'Dili',
    'TG': 'Lomé',
    'TO': 'Nukuʻalofa',
    'TT': 'Port-d\'Espagne',
    'TN': 'Tunis',
    'TR': 'Ankara',
    'TM': 'Achgabat',
    'TV': 'Funafuti',
    'UG': 'Kampala',
    'UA': 'Kyiv',
    'AE': 'Abou Dabi',
    'GB': 'Londres',
    'US': 'Washington',
    'UY': 'Montevideo',
    'UZ': 'Tachkent',
    'VU': 'Port-Vila',
    'VA': 'Cité du Vatican',
    'VE': 'Caracas',
    'VN': 'Hanoï',
    'YE': 'Sanaa',
    'ZM': 'Lusaka',
    'ZW': 'Harare',
    'AW': 'Oranjestad',
    'AI': 'The Valley',
    'BM': 'Hamilton',
    'BQ': 'Kralendijk',
    'VG': 'Road Town',
    'KY': 'George Town',
    'CK': 'Avarua',
    'CW': 'Willemstad',
    'FK': 'Stanley',
    'FO': 'Tórshavn',
    'GL': 'Nuuk',
    'GD': 'Saint-Georges',
    'GU': 'Hagåtña',
    'GG': 'Saint-Pierre-Port',
    'HK': 'Hong Kong',
    'IM': 'Douglas',
    'JE': 'Saint-Hélier',
    'MO': 'Macao',
    'MP': 'Saipan',
    'MS': 'Plymouth',
    'PR': 'San Juan',
    'BL': 'Gustavia',
    'MF': 'Marigot',
    'PM': 'Saint-Pierre',
    'SX': 'Philipsburg',
    'TC': 'Cockburn Town',
    'VI': 'Charlotte Amalie',
    'WF': 'Mata-Utu',
    'AX': 'Mariehamn',
    'AS': 'Pago Pago',
    'IO': 'Diego Garcia',
    'CC': 'West Island',
    'CX': 'Flying Fish Cove',
    'TF': 'Port-aux-Français',
    'HM': '',
    'PS': 'Ramallah',
    'PN': 'Adamstown',
    'GS': 'King Edward Point',
    'UM': '',
    'EH': 'Laâyoune',
    'GF': 'Cayenne',
    'GP': 'Basse-Terre',
    'MQ': 'Fort-de-France',
    'RE': 'Saint-Denis',
    'PF': 'Papeete',
    'NC': 'Nouméa',
    'YT': 'Mamoudzou'
  };

  // Données de secours pour la France et la Norvège
  const fallbackCountryData = {
    'FR': {
      flag: 'https://flagcdn.com/w320/fr.png',
      languages: 'Français'
    },
    'NO': {
      flag: 'https://flagcdn.com/w320/no.png',
      languages: 'Norvégien Nynorsk, Norvégien Bokmål, Sami'
    }
  };

  // Table de correspondance pour traduire les codes/noms de langues en français
  const languageTranslations = {
    'eng': 'Anglais',
    'fra': 'Français',
    'spa': 'Espagnol',
    'deu': 'Allemand',
    'ita': 'Italien',
    'por': 'Portugais',
    'rus': 'Russe',
    'ara': 'Arabe',
    'hin': 'Hindi',
    'zho': 'Chinois',
    'jpn': 'Japonais',
    'kor': 'Coréen',
    'nld': 'Néerlandais',
    'swe': 'Suédois',
    'fin': 'Finnois',
    'dan': 'Danois',
    'nor': 'Norvégien',
    'pol': 'Polonais',
    'ukr': 'Ukrainien',
    'tur': 'Turc',
    'fas': 'Persan',
    'urd': 'Ourdou',
    'ben': 'Bengali',
    'pan': 'Pendjabi',
    'tam': 'Tamoul',
    'tel': 'Télougou',
    'tha': 'Thaï',
    'vie': 'Vietnamien',
    'ind': 'Indonésien',
    'msa': 'Malais',
    'heb': 'Hébreu',
    'ell': 'Grec',
    'ron': 'Roumain',
    'hun': 'Hongrois',
    'ces': 'Tchèque',
    'slk': 'Slovaque',
    'bul': 'Bulgare',
    'hrv': 'Croate',
    'srp': 'Serbe',
    'kat': 'Géorgien',
    'arm': 'Arménien',
    'aze': 'Azéri',
    'eus': 'Basque',
    'cat': 'Catalan',
    'afr': 'Afrikaans',
    'swa': 'Swahili',
    'amh': 'Amharique',
    'hau': 'Haoussa',
    'yor': 'Yoruba',
    'ibo': 'Igbo',
    'zul': 'Zoulou',
    'mlt': 'Maltais',
    'alb': 'Albanais',
    'mkd': 'Macédonien',
    'bel': 'Biélorusse',
    'kaz': 'Kazakh',
    'uzb': 'Ouzbek',
    'kir': 'Kirghiz',
    'tgk': 'Tadjik',
    'mon': 'Mongol',
    'mya': 'Birman',
    'khm': 'Khmer',
    'lao': 'Lao',
    'sin': 'Cingalais',
    'nep': 'Népalais',
    'tib': 'Tibétain',
    'uig': 'Ouïghour',
    'epo': 'Espéranto',
    'isl': 'Islandais',
    'gle': 'Irlandais',
    'cym': 'Gallois',
    'bre': 'Breton',
    'cos': 'Corse',
    'que': 'Quechua',
    'grn': 'Guarani',
    'kur': 'Kurde',
    'snd': 'Sindhi',
    'pus': 'Pachtou',
    'div': 'Maldivien',
    'mri': 'Maori',
    'nav': 'Navajo',
    'cha': 'Chamorro',
    'tet': 'Tétoum',
    'ton': 'Tongien',
    'smo': 'Samoan',
    'fij': 'Fidjien',
    'gil': 'Gilbertais',
    'tkl': 'Tokelau',
    'tvl': 'Tuvalu',
    'niu': 'Niuéen',
    'rar': 'Rarotongien',
    'mah': 'Marshallais',
    'mlg': 'Malgache',
    'ber': 'Berbère',
    'kab': 'Kabyle',
    'French': 'Français',
    'Norwegian Nynorsk': 'Norvégien Nynorsk',
    'Norwegian Bokmål': 'Norvégien Bokmål',
    'Sami': 'Sami'
  };

  var map = null;
  var geojsonLayer = null;
  var carteMondeModal = document.getElementById('carteMondeModal');

  // Charger les données des pays depuis countries.json
  async function loadCountryData() {
    try {
      const response = await fetch('data/countries.json');
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}: Impossible de charger countries.json`);
      }
      const data = await response.json();
      data.forEach(country => {
        countryData[country.cca2] = {
          flag: country.flags.png,
          languages: Object.values(country.languages).join(', ')
        };
      });
      console.log('countryData chargé:', countryData);
    } catch (error) {
      console.error('Erreur lors du chargement de countries.json:', error);
      // Utiliser les données de secours si countries.json échoue
      Object.assign(countryData, fallbackCountryData);
      console.log('Données de secours appliquées:', countryData);
    }
  }

  carteMondeModal.addEventListener('shown.bs.modal', async function () {
    if (map === null) {
      map = L.map('map').setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);

      // Charger countryData avant le GeoJSON
      await loadCountryData();

      try {
        const response = await fetch('data/ne_110m_admin_0_countries.geojson'); // Utiliser le fichier local
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}: Impossible de charger le GeoJSON`);
        }
        const data = await response.json();
        geojsonLayer = L.geoJSON(data, {
          style: {
            color: '#3388ff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.2
          },
          onEachFeature: function (feature, layer) {
            let isoCode = feature.properties.ISO_A2 || 'N/A';
            // Correction spécifique pour la France et la Norvège
            if (feature.properties.NAME_FR === 'France' || feature.properties.ADMIN === 'France') {
              isoCode = 'FR';
            } else if (feature.properties.NAME_FR === 'Norvège' || feature.properties.ADMIN === 'Norway') {
              isoCode = 'NO';
            } else {
              isoCode = isoCorrections[isoCode] || isoCode;
            }
            console.log(`Pays: ${feature.properties.NAME_FR || feature.properties.ADMIN}, ISO_A2: ${feature.properties.ISO_A2}, Corrigé: ${isoCode}`); // Débogage
            const countryInfo = countryData[isoCode] || fallbackCountryData[isoCode] || {};
            const flagUrl = countryInfo.flag || 'N/A';
            let languages = countryInfo.languages || 'N/A';
            if (languages !== 'N/A') {
              languages = languages
                .split(', ')
                .map(lang => languageTranslations[lang] || lang)
                .join(', ');
            }
            const capital = feature.properties.CAPITAL || capitalFallbacks[isoCode] || 'N/A';
            const population = feature.properties.POP_EST ? feature.properties.POP_EST.toLocaleString('fr-FR') : 'N/A';
            const countryName = feature.properties.NAME_FR || feature.properties.ADMIN || 'N/A';

            if (!feature.properties.CAPITAL) {
              console.log(`Capitale manquante pour ${countryName} :`, {
                ISO_A2: isoCode,
                Corrigé: isoCode,
                FallbackCapital: capitalFallbacks[isoCode] || 'N/A'
              });
            }

            let popupContent = `<b>Pays :</b> ${countryName}<br>`;
            popupContent += `<b>Code ISO :</b> ${isoCode}<br>`;
            popupContent += `<b>Capitale :</b> ${capital}<br>`;
            popupContent += `<b>Population :</b> ${population}<br>`;
            popupContent += `<b>Langue(s) officielle(s) :</b> ${languages}<br>`;
            if (flagUrl !== 'N/A') {
              popupContent += `<b>Drapeau :</b><br><img src="${flagUrl}" alt="Drapeau de ${countryName}" style="width: 50px; height: auto;" />`;
            } else {
              popupContent += `<b>Drapeau :</b> Non disponible<br>`;
            }

            layer.bindPopup(popupContent);
            layer.on({
              click: function (e) {
                map.fitBounds(e.target.getBounds());
              },
              mouseover: function (e) {
                e.target.setStyle({
                  fillOpacity: 0.5,
                  weight: 3
                });
              },
              mouseout: function (e) {
                geojsonLayer.resetStyle(e.target);
              }
            });
          }
        }).addTo(map);
      } catch (error) {
        console.error('Erreur lors du chargement GeoJSON :', error);
        alert('Impossible de charger les données des pays. Vérifiez que le fichier data/ne_110m_admin_0_countries.geojson est présent et accessible.');
      }
    } else {
      map.invalidateSize();
    }
  });

  carteMondeModal.addEventListener('hidden.bs.modal', function () {
    if (map !== null) {
      map.remove();
      map = null;
      geojsonLayer = null;
    }
  });

  // Fonction pour effacer toutes les sélections et réinitialiser les boutons
  function clearSelection() {
    if (confirm("Voulez-vous vraiment effacer toutes les sélections ?")) {
      // Effacer toutes les pages principales
      Object.keys(PAGES).forEach(page => {
        saveToLocalStorage(`selectedWords_${page}`, []);
      });
      
      // EFFACER AUSSI la page classification des langues
      saveToLocalStorage('selectedWords_langues-classification', []);
      saveToLocalStorage('selectedWords', []);

      // Mettre à jour l'affichage de toutes les pages
      Object.keys(PAGES).forEach(page => {
        displayWordsForPage(page);
      });

      // Mettre à jour aussi l'affichage de la page13 (qui inclut classification)
      displayWordsForPage('page13');

      // Déclencher un événement de stockage
      localStorage.setItem('clearSelectionEvent', Date.now().toString());

      // MISE À JOUR DU CADRE GLOBAL
      updateGlobalSelectedWords();

      console.log('Toutes les sélections ont été effacées');
    }
  }
  // === MISE À JOUR CADRE GLOBAL ===
  function updateGlobalSelectedWords() {
    const allWords = [];
    Object.keys(PAGES).forEach(page => {
      const words = loadFromLocalStorage(`selectedWords_${page}`) || [];
      allWords.push(...words);
    });

    const container = document.getElementById('globalSelectedWords');
    const list = document.getElementById('globalWordsList');
    if (!container || !list) return;

    if (allWords.length === 0) {
      container.style.display = 'none';
      return;
    }

    container.style.display = 'block';
    list.innerHTML = allWords.map(word => `
      <span class="badge bg-primary text-white me-1" data-bs-toggle="tooltip" title="${wordDefinitions[word]?.definition || ''}">
        ${word}
      </span>
    `).join('');

    // Réactiver les tooltips
    list.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      const t = bootstrap.Tooltip.getInstance(el);
      if (t) t.dispose();
      new bootstrap.Tooltip(el, { trigger: 'hover' });
    });
  }

  // === ÉCOUTE LES CHANGEMENTS (localStorage) ===
  document.addEventListener("DOMContentLoaded", () => {
    updateGlobalSelectedWords();

    window.addEventListener('storage', (e) => {
      if (e.key?.startsWith('selectedWords_') || e.key === 'forceGlobalUpdate') {
        updateGlobalSelectedWords();
      }
    });

    
  });

  // Écoute les suppressions depuis index.html
  window.addEventListener('storage', (e) => {
    if (e.key === 'forceGlobalUpdate') {
      // Recharger les mots sélectionnés localement
      const pageName = window.location.pathname.split('/').pop().replace('.html', '');
      const saved = JSON.parse(localStorage.getItem(`selectedWords_${pageName}`)) || [];
      
      // Mettre à jour les classes .selected
      document.querySelectorAll('.selectable').forEach(span => {
        const text = span.textContent.trim();
        if (saved.includes(text)) {
          span.classList.add('selected');
        } else {
          span.classList.remove('selected');
        }
      });

      // Masquer le panneau si plus rien
      if (saved.length === 0) {
        document.getElementById('definition-container').style.display = 'none';
      }
    }
  });


  // === SUPPRESSION D'UN MOT DEPUIS index.html (croix) ===
  function deleteWordFromMainPage(page, word) {
    if (!confirm(`Supprimer "${word}" ?`)) return;

  // Si c'est page13, chercher dans les deux pages
    if (page === 'page13') {
      const page13Words = loadFromLocalStorage('selectedWords_page13') || [];
      const classificationWords = loadFromLocalStorage('selectedWords_langues-classification') || [];
      
      saveToLocalStorage('selectedWords_page13', page13Words.filter(w => w !== word));
      saveToLocalStorage('selectedWords_langues-classification', classificationWords.filter(w => w !== word));
    } else {
      const pageWords = loadFromLocalStorage(`selectedWords_${page}`) || [];
      saveToLocalStorage(`selectedWords_${page}`, pageWords.filter(w => w !== word));
    }

    // Désactiver tous les tooltips du conteneur avant suppression
    const container = document.querySelector(`.selected-words-container[data-page="${page}"]`);
    if (container) {
      const tooltips = container.querySelectorAll('.tag');
      tooltips.forEach(tag => {
        const tooltip = bootstrap.Tooltip.getInstance(tag);
        if (tooltip) {
          tooltip.dispose();
        }
      });
    }

    const pageWords = loadFromLocalStorage(`selectedWords_${page}`) || [];
    saveToLocalStorage(`selectedWords_${page}`, pageWords.filter(w => w !== word));

    const globalWords = loadFromLocalStorage('selectedWords') || [];
    saveToLocalStorage('selectedWords', globalWords.filter(w => w !== word));

    // Recréer l'affichage (ce qui réinitialisera les tooltips)
    displayWordsForPage(page);
    updateGlobalSelectedWords();

    console.log(`Mot "${word}" supprimé de ${page}`);
  }


  // ==================== SPECTROGRAMME – VERSION QUI MARCHE À 100% (GARANTI) ====================
  const spectroCanvas = document.getElementById('spectrogramCanvas');
  const spectroCtx = spectroCanvas?.getContext('2d');
  let history = [];

  // ON FORCE LE REDIMENSIONNEMENT CORRECT DU CANVAS À CHAQUE FOIS
  function resizeSpectrogramCanvas() {
    if (!spectroCanvas) return;
    spectroCanvas.width = spectroCanvas.offsetWidth;
    spectroCanvas.height = 180;
    history = []; // on vide l'historique pour repartir propre
  }

  function drawSpectrogram() {
    if (!spectroCtx || !analyserLeftGlobal || !dataArrayLeftGlobal) return;

    analyserLeftGlobal.getByteFrequencyData(dataArrayLeftGlobal);

    // === SCROLL TRÈS LENT + FONDU ULTRA-DOUX ===
    spectroCtx.drawImage(spectroCtx.canvas, -1, 0);

    // Nouvelle colonne à droite
    const height = spectroCanvas.height;
    const width = spectroCanvas.width;

    for (let i = 0; i < dataArrayLeftGlobal.length; i += 2) {
      const value = dataArrayLeftGlobal[i] / 255;
      if (value < 0.02) continue;

      const y = height - (i / dataArrayLeftGlobal.length) * height;

      // === COULEURS INTENSES ET DURABLES ===
      let r, g, b;
      if (value < 0.2) {
        r = 0;
        g = 0;
        b = Math.round(120 + 135 * (value / 0.2));
      } else if (value < 0.4) {
        r = Math.round(180 * ((value - 0.2) / 0.2));
        g = 0;
        b = 255;
      } else if (value < 0.6) {
        r = 255;
        g = Math.round(180 * ((value - 0.4) / 0.2));
        b = 255;
      } else if (value < 0.8) {
        r = 255;
        g = 255;
        b = Math.round(255 - 200 * ((value - 0.6) / 0.2));
      } else {
        r = 255;
        g = Math.round(255 - 100 * ((value - 0.8) / 0.2));
        b = Math.round(255 - 255 * ((value - 0.8) / 0.2));
      }

      spectroCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      spectroCtx.fillRect(width - 1, y, 2, 8); // 2px de large pour plus de lumière
    }

    // === FONDU TRÈS LENT (le secret !) ===
    spectroCtx.fillStyle = 'rgba(0, 0, 0, 0.008)';  // 0.008 = très très lent
    spectroCtx.fillRect(0, 0, width - 2, height);
  }


  // On redimensionne au chargement + au resize
  window.addEventListener('load', resizeSpectrogramCanvas);
  window.addEventListener('resize', resizeSpectrogramCanvas);


  // === AFFICHAGE PRO + SUPPRESSION DU FICHIER CHARGÉ (VERSION FINALE) ===
  const fileInput = document.getElementById('audioFile');
  const fileInfo = document.getElementById('audioFileInfo');
  const fileNameSpan = document.getElementById('audioFileName');
  const fileDetailsSpan = document.getElementById('audioFileDetails');
  const clearBtn = document.getElementById('clearAudioFile');
  const player = document.getElementById('audioPlayer');

  if (fileInput && fileInfo && fileNameSpan && fileDetailsSpan && clearBtn && player) {

    function formatBytes(bytes) {
      if (!bytes) return '0 o';
      const k = 1024;
      const sizes = ['o', 'Ko', 'Mo', 'Go'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    function formatDuration(seconds) {
      if (!seconds || isNaN(seconds)) return '—';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function showFileInfo() {
      fileInfo.style.display = 'flex';
      setTimeout(() => fileInfo.classList.remove('opacity-0'), 10);
    }

    function hideFileInfo() {
      fileInfo.classList.add('opacity-0');
      setTimeout(() => fileInfo.style.display = 'none', 400);
    }

    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;

      fileNameSpan.textContent = file.name;
      fileDetailsSpan.textContent = `${formatBytes(file.size)} · calcul de la durée...`;
      showFileInfo();

      const tempUrl = URL.createObjectURL(file);
      player.src = tempUrl;

      player.addEventListener('loadedmetadata', () => {
        fileDetailsSpan.textContent = `${formatDuration(player.duration)} · ${formatBytes(file.size)}`;
        URL.revokeObjectURL(tempUrl);
      }, { once: true });
    });

    // Bouton de suppression
  clearBtn.addEventListener('click', async () => {
    if (!confirm("Supprimer le fichier audio chargé ?")) return;

    try {
      // 1. On supprime physiquement de IndexedDB
      const db = await openDB();
      const transaction = db.transaction(['audioStore'], 'readwrite');
      const store = transaction.objectStore('audioStore');
      await store.delete('userAudio');  // clé magique qui efface tout
      await store.delete('audioState'); // au cas où tu sauvegardes aussi l'état
      console.log('Fichier supprimé d\'IndexedDB');

      // 2. On vide le lecteur
      player.src = '';
      player.load();

      // 3. On vide l'input fichier
      fileInput.value = '';

      // 4. On cache l'affichage avec animation
      fileInfo.classList.add('opacity-0');
      setTimeout(() => {
        fileInfo.style.display = 'none';
        fileNameSpan.textContent = 'Aucun fichier chargé';
        fileDetailsSpan.textContent = '—';
      }, 400);

    } catch (err) {
      console.error("Erreur lors de la suppression du fichier", err);
      alert("Erreur lors de la suppression. Réessayez.");
    }
  });
  }

  // === RESTAURATION DE L'AFFICHAGE DU FICHIER AU CHARGEMENT DE LA PAGE ===
  async function restoreFileDisplay() {
    try {
      const savedAudioData = await loadAudioFromDB(); // ta fonction existante
      if (!savedAudioData || !savedAudioData.fileName) return;

      // On a un fichier sauvegardé → on restaure l'affichage
      const fileInfo = document.getElementById('audioFileInfo');
      const fileNameSpan = document.getElementById('audioFileName');
      const fileDetailsSpan = document.getElementById('audioFileDetails');

      if (fileInfo && fileNameSpan && fileDetailsSpan) {
        fileNameSpan.textContent = savedAudioData.fileName;

        // Si on a aussi sauvegardé la durée (recommandé !), on l'affiche
        if (savedAudioData.duration) {
          const formattedDuration = formatDuration(savedAudioData.duration);
          const formattedSize = formatBytes(savedAudioData.blob?.size || 0);
          fileDetailsSpan.textContent = `${formattedDuration} · ${formattedSize}`;
        } else {
          fileDetailsSpan.textContent = `${formatBytes(savedAudioData.blob?.size || 0)}`;
        }

        // On affiche le bloc avec animation
        fileInfo.style.display = 'flex';
        setTimeout(() => fileInfo.classList.remove('opacity-0'), 50);
      }
    } catch (err) {
      console.warn("Impossible de restaurer l'affichage du fichier", err);
    }
  }

  // On appelle cette fonction au chargement de la page principale
  document.addEventListener('DOMContentLoaded', () => {
    const currentPage = getPageName();
    if (currentPage === '' || currentPage === 'index') {
      restoreFileDisplay();
    }
  });

  