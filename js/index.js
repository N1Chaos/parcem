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
async function setupAudioPlayer() {
  const player = document.getElementById('audioPlayer');
  const fileInput = document.getElementById('audioFile');
  const fileNameDisplay = document.getElementById('audioFileName');
  const playbackSpeed = document.getElementById('playbackSpeed');
  const volumeControl = document.getElementById('volumeControl');
  const balanceControl = document.getElementById('balanceControl');
  const eqLow = document.getElementById('eqLow');
  const eqMid = document.getElementById('eqMid');
  const eqHigh = document.getElementById('eqHigh');
  const vuMeterLeftCanvas = document.getElementById('vuMeterLeftCanvas');
  const vuMeterRightCanvas = document.getElementById('vuMeterRightCanvas');
  const waveformLeftCanvas = document.getElementById('waveformLeftCanvas');
  const waveformRightCanvas = document.getElementById('waveformRightCanvas');
  const spectrumCanvas = document.getElementById('spectrumCanvas');
  const toggleControls = document.getElementById('toggleControls');
  const audioControls = document.getElementById('audioControls');
  const visualizations = document.querySelector('.visualizations');

  // Vérification des éléments DOM
  if (!player || !fileInput || !fileNameDisplay || !vuMeterLeftCanvas || !vuMeterRightCanvas || !waveformLeftCanvas || !waveformRightCanvas || !spectrumCanvas || !toggleControls || !audioControls || !visualizations) {
    console.error('Éléments audio, affichage ou visualisations non trouvés dans le DOM:', {
      player: !!player,
      fileInput: !!fileInput,
      fileNameDisplay: !!fileNameDisplay,
      vuMeterLeftCanvas: !!vuMeterLeftCanvas,
      vuMeterRightCanvas: !!vuMeterRightCanvas,
      waveformLeftCanvas: !!waveformLeftCanvas,
      waveformRightCanvas: !!waveformRightCanvas,
      spectrumCanvas: !!spectrumCanvas,
      toggleControls: !!toggleControls,
      audioControls: !!audioControls,
      visualizations: !!visualizations
    });
    fileNameDisplay.textContent = 'Aucun fichier chargé';
    return;
  }

  // Initialisation de Web Audio API
  const audioContext = new AudioContext();
  let source;
  try {
    source = audioContext.createMediaElementSource(player);
  } catch (error) {
    console.error('Erreur lors de la création de la source audio:', error);
    fileNameDisplay.textContent = 'Erreur: Veuillez réimporter le fichier';
    return;
  }
  const analyserLeft = audioContext.createAnalyser();
  const analyserRight = audioContext.createAnalyser();
  
  analyserLeft.fftSize = 2048;
  analyserRight.fftSize = 2048;
  const gainNode = audioContext.createGain();
  const pannerNode = audioContext.createStereoPanner();
  const lowFilter = audioContext.createBiquadFilter();
  lowFilter.type = 'lowshelf';
  lowFilter.frequency.value = 200;
  const midFilter = audioContext.createBiquadFilter();
  midFilter.type = 'peaking';
  midFilter.frequency.value = 1000;
  const highFilter = audioContext.createBiquadFilter();
  highFilter.type = 'highshelf';
  highFilter.frequency.value = 4000;

    // === LARGEUR STÉRÉO (Mid-Side) – VERSION ULTRA SÛRE ===
  const merger = audioContext.createChannelMerger(2);
  const midGain = audioContext.createGain();
  const sideGain = audioContext.createGain();
  midGain.gain.value = 1;
  sideGain.gain.value = 1; // on contrôle ça avec le curseur après

  // Chaîne audio principale avec analyseurs après les effets
  const splitter = audioContext.createChannelSplitter(2);
  source.connect(pannerNode);
  pannerNode.connect(lowFilter);
  lowFilter.connect(midFilter);
  midFilter.connect(highFilter);
  highFilter.connect(gainNode);
    // On garde le son normal
  gainNode.connect(splitter);
  gainNode.connect(audioContext.destination);     // son garanti

  // On ajoute le traitement Mid-Side en parallèle
  splitter.connect(midGain, 0);
  splitter.connect(midGain, 1);
  splitter.connect(sideGain, 0);
  splitter.connect(sideGain, 1);

  midGain.connect(merger, 0, 0);
  midGain.connect(merger, 0, 1);
  sideGain.connect(merger, 0, 0);
  sideGain.connect(merger, 0, 1);
  sideGain.gain.value = -1; // inversion côté droit pour le Side

  merger.connect(audioContext.destination);

  splitter.connect(analyserLeft, 0);
  splitter.connect(analyserRight, 1);

  // Activer le curseur de balance par défaut
  balanceControl.disabled = false;
  balanceControl.title = 'Ajuster la balance stéréo (gauche/droite)';

  // Vérification du nombre de canaux après chargement
  let isMono = false;
  async function checkChannels() {
    try {
      if (!player.src) {
        console.warn('Aucun fichier audio chargé pour vérifier les canaux');
        return;
      }
      const response = await fetch(player.src);
      if (!response.ok) {
        throw new Error('Échec du chargement du fichier audio pour la vérification des canaux');
      }
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const channels = audioBuffer.numberOfChannels;
      console.log(`Nombre de canaux de l'audio : ${channels}`);
      isMono = channels === 1;
      if (isMono) {
        console.warn('Fichier audio mono détecté. Le contrôle de balance stéréo et le VU-mètre droit sont désactivés.');
        balanceControl.disabled = true;
        balanceControl.title = 'Non disponible pour les fichiers mono';
      } else {
        balanceControl.disabled = false;
        balanceControl.title = 'Ajuster la balance stéréo (gauche/droite)';
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des canaux:', error);
      balanceControl.disabled = false;
      isMono = false;
    }
  }

  // Gestion du bouton Contrôles
  const savedAudioState = await loadAudioStateFromDB();
  console.log('Données récupérées de IndexedDB:', savedAudioState);
  // Forcer les contrôles et visualisations à être masqués au chargement
  audioControls.classList.remove('active');
  visualizations.classList.remove('active');
  toggleControls.textContent = 'Contrôles';
  console.log('État initial des contrôles et visualisations: masqués');

  toggleControls.addEventListener('click', () => {
    console.log('Bouton Contrôles cliqué');
    const isVisible = audioControls.classList.toggle('active');
    visualizations.classList.toggle('active', isVisible);
    console.log('Nouvel état des contrôles et visualisations:', isVisible ? 'affiché' : 'masqué');
    toggleControls.textContent = isVisible ? 'Masquer les contrôles' : 'Contrôles';
    updateAudioState();
    if (isVisible) {
      // Réinitialiser les dimensions et contextes des canvas lorsque les visualisations sont affichées
      vuMeterLeftCanvas.width = vuMeterLeftCanvas.offsetWidth;
      vuMeterLeftCanvas.height = 125;
      vuMeterRightCanvas.width = vuMeterRightCanvas.offsetWidth;
      vuMeterRightCanvas.height = 125;
      waveformLeftCanvas.width = waveformLeftCanvas.offsetWidth;
      waveformLeftCanvas.height = 125;
      waveformRightCanvas.width = waveformRightCanvas.offsetWidth;
      waveformRightCanvas.height = 125;
      // Réacquérir les contextes
      vuMeterLeftCtx = vuMeterLeftCanvas.getContext('2d');
      vuMeterRightCtx = vuMeterRightCanvas.getContext('2d');
      waveformLeftCtx = waveformLeftCanvas.getContext('2d');
      waveformRightCtx = waveformRightCanvas.getContext('2d');
      console.log('Contextes des canvas réinitialisés pour les visualisations');
    }
  });

  // Initialisation des canvas
  vuMeterLeftCanvas.width = vuMeterLeftCanvas.offsetWidth;
  vuMeterLeftCanvas.height = 125;
  vuMeterRightCanvas.width = vuMeterRightCanvas.offsetWidth;
  vuMeterRightCanvas.height = 125;
  waveformLeftCanvas.width = waveformLeftCanvas.offsetWidth;
  waveformLeftCanvas.height = 125;
  waveformRightCanvas.width = waveformRightCanvas.offsetWidth;
  waveformRightCanvas.height = 125;
  spectrumCanvas.width = spectrumCanvas.offsetWidth;
  spectrumCanvas.height = 100;

  // Déclarer les contextes comme variables modifiables
  let vuMeterLeftCtx = vuMeterLeftCanvas.getContext('2d');
  let vuMeterRightCtx = vuMeterRightCanvas.getContext('2d');
  let waveformLeftCtx = waveformLeftCanvas.getContext('2d');
  let waveformRightCtx = waveformRightCanvas.getContext('2d');
  let spectrumCtx = spectrumCanvas.getContext('2d');
  const bufferLength = analyserLeft.frequencyBinCount;
  const dataArrayLeft = new Uint8Array(bufferLength);
  const dataArrayRight = new Uint8Array(bufferLength);
  analyserLeftGlobal = analyserLeft;
  dataArrayLeftGlobal = dataArrayLeft;
  resizeSpectrogramCanvas();


  // Calcul du RMS pour les VU-mètres
  function calculateRMS(analyser, dataArray) {
    try {
      analyser.getByteTimeDomainData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const value = (dataArray[i] - 128) / 128;
        sum += value * value;
      }
      const mean = sum / dataArray.length;
      const rms = Math.sqrt(mean);
      return Math.max(0, Math.min(1, rms));
    } catch (error) {
      console.error('Erreur lors du calcul du RMS:', error);
      return 0;
    }
  }

  // Dessin des VU-mètres à aiguille avec look analogique
  function drawVUMeters() {
    try {
      const centerX = vuMeterLeftCanvas.width / 2;
      const centerY = vuMeterLeftCanvas.height - 23.4375;
      const radius = Math.min(vuMeterLeftCanvas.width / 2 - 10, vuMeterLeftCanvas.height - 39.0625);
      const startAngle = -Math.PI / 2;
      const endAngle = Math.PI / 2;

      // VU-mètre gauche
      vuMeterLeftCtx.clearRect(0, 0, vuMeterLeftCanvas.width, vuMeterLeftCanvas.height);
      const gradient = vuMeterLeftCtx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
      gradient.addColorStop(0, '#f0f0f0');
      gradient.addColorStop(1, '#d0d0d0');
      vuMeterLeftCtx.fillStyle = gradient;
      vuMeterLeftCtx.fillRect(0, 0, vuMeterLeftCanvas.width, vuMeterLeftCanvas.height);
      vuMeterLeftCtx.strokeStyle = '#555';
      vuMeterLeftCtx.lineWidth = 4;
      vuMeterLeftCtx.strokeRect(2, 2, vuMeterLeftCanvas.width - 4, vuMeterLeftCanvas.height - 4);
      vuMeterLeftCtx.beginPath();
      vuMeterLeftCtx.arc(centerX, centerY, radius, startAngle, endAngle);
      vuMeterLeftCtx.lineWidth = 10;
      vuMeterLeftCtx.strokeStyle = '#e0e0e0';
      vuMeterLeftCtx.stroke();
      vuMeterLeftCtx.fillStyle = '#0000FF';
      vuMeterLeftCtx.font = '10px var(--body-font)';
      const levels = [-60, -50, -40, -30, -20, -10, 0];
      levels.forEach(level => {
        const angle = startAngle + ((level + 60) / 60) * (endAngle - startAngle);
        const x = centerX + Math.cos(angle) * (radius + 5);
        const y = centerY + Math.sin(angle) * (radius + 5);
        vuMeterLeftCtx.fillText(`${level} dB`, x - 15, y + 5);
        vuMeterLeftCtx.beginPath();
        vuMeterLeftCtx.moveTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        vuMeterLeftCtx.lineTo(centerX + Math.cos(angle) * (radius - 5), centerY + Math.sin(angle) * (radius - 5));
        vuMeterLeftCtx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        vuMeterLeftCtx.stroke();
      });
      const rmsLeft = calculateRMS(analyserLeft, dataArrayLeft);
      const angleLeft = startAngle + rmsLeft * (endAngle - startAngle);
      vuMeterLeftCtx.beginPath();
      vuMeterLeftCtx.moveTo(centerX, centerY);
      vuMeterLeftCtx.lineTo(centerX + Math.cos(angleLeft) * radius, centerY + Math.sin(angleLeft) * radius);
      vuMeterLeftCtx.lineWidth = 2;
      vuMeterLeftCtx.strokeStyle = '#e63946'; // Rouge pour l'aiguille gauche, même couleur que la forme d'onde gauche
      vuMeterLeftCtx.stroke();
      vuMeterLeftCtx.beginPath();
      vuMeterLeftCtx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
      vuMeterLeftCtx.fillStyle = '#333';
      vuMeterLeftCtx.fill();
      vuMeterLeftCtx.strokeStyle = '#000';
      vuMeterLeftCtx.lineWidth = 1;
      vuMeterLeftCtx.stroke();

      // VU-mètre droit
      vuMeterRightCtx.clearRect(0, 0, vuMeterRightCanvas.width, vuMeterRightCanvas.height);
      vuMeterRightCtx.fillStyle = gradient;
      vuMeterRightCtx.fillRect(0, 0, vuMeterRightCanvas.width, vuMeterRightCanvas.height);
      vuMeterRightCtx.strokeStyle = '#555';
      vuMeterRightCtx.lineWidth = 4;
      vuMeterRightCtx.strokeRect(2, 2, vuMeterRightCanvas.width - 4, vuMeterRightCanvas.height - 4);
      if (isMono) {
        vuMeterRightCtx.fillStyle = 'var(--font-color)';
        vuMeterRightCtx.font = '12px var(--body-font)';
        vuMeterRightCtx.textAlign = 'center';
        vuMeterRightCtx.fillText('Mono', vuMeterRightCanvas.width / 2, vuMeterRightCanvas.height / 2);
      } else {
        vuMeterRightCtx.beginPath();
        vuMeterRightCtx.arc(centerX, centerY, radius, startAngle, endAngle);
        vuMeterRightCtx.lineWidth = 10;
        vuMeterRightCtx.strokeStyle = '#e0e0e0';
        vuMeterRightCtx.stroke();
        vuMeterRightCtx.fillStyle = '#0000FF';
        vuMeterRightCtx.font = '10px var(--body-font)';
        levels.forEach(level => {
          const angle = startAngle + ((level + 60) / 60) * (endAngle - startAngle);
          const x = centerX + Math.cos(angle) * (radius + 5);
          const y = centerY + Math.sin(angle) * (radius + 5);
          vuMeterRightCtx.fillText(`${level} dB`, x - 15, y + 5);
          vuMeterRightCtx.beginPath();
          vuMeterRightCtx.moveTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
          vuMeterRightCtx.lineTo(centerX + Math.cos(angle) * (radius - 5), centerY + Math.sin(angle) * (radius - 5));
          vuMeterRightCtx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
          vuMeterRightCtx.stroke();
        });
        const rmsRight = calculateRMS(analyserRight, dataArrayRight);
        const angleRight = startAngle + rmsRight * (endAngle - startAngle);
        vuMeterRightCtx.beginPath();
        vuMeterRightCtx.moveTo(centerX, centerY);
        vuMeterRightCtx.lineTo(centerX + Math.cos(angleRight) * radius, centerY + Math.sin(angleRight) * radius);
        vuMeterRightCtx.lineWidth = 2;
        vuMeterRightCtx.strokeStyle = '#f4a261'; // Orange pour l'aiguille droite, même couleur que la forme d'onde droite
        vuMeterRightCtx.stroke();
        vuMeterRightCtx.beginPath();
        vuMeterRightCtx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
        vuMeterRightCtx.fillStyle = '#333';
        vuMeterRightCtx.fill();
        vuMeterRightCtx.strokeStyle = '#000';
        vuMeterRightCtx.lineWidth = 1;
        vuMeterRightCtx.stroke();
      }
    } catch (error) {
      console.error('Erreur lors du dessin des VU-mètres:', error);
    }
  }

  // Visualisation de la forme d'onde (gauche et droite) en couleur
  function drawWaveform() {
    try {
      analyserLeft.getByteTimeDomainData(dataArrayLeft);
      analyserRight.getByteTimeDomainData(dataArrayRight);
      waveformLeftCtx.clearRect(0, 0, waveformLeftCanvas.width, waveformLeftCanvas.height);
      waveformLeftCtx.beginPath();
      waveformLeftCtx.strokeStyle = '#e63946'; // Rouge pour la forme d'onde gauche
      waveformLeftCtx.lineWidth = 2;
      let sliceWidth = waveformLeftCanvas.width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArrayLeft[i] / 128.0;
        const y = (v * waveformLeftCanvas.height) / 2;
        if (i === 0) {
          waveformLeftCtx.moveTo(x, y);
        } else {
          waveformLeftCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      waveformLeftCtx.stroke();
      waveformLeftCtx.fillStyle = 'var(--font-color)';
      waveformLeftCtx.font = '10px var(--body-font)';
      const duration = player.duration || 60;
      for (let t = 0; t <= duration; t += 25) {
        const xPos = (t / duration) * waveformLeftCanvas.width;
        waveformLeftCtx.fillText(`${t}s`, xPos, waveformLeftCanvas.height - 5);
        waveformLeftCtx.beginPath();
        waveformLeftCtx.moveTo(xPos, 0);
        waveformLeftCtx.lineTo(xPos, waveformLeftCanvas.height);
        waveformLeftCtx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        waveformLeftCtx.stroke();
      }
      waveformRightCtx.clearRect(0, 0, waveformRightCanvas.width, waveformRightCanvas.height);
      waveformRightCtx.beginPath();
      waveformRightCtx.strokeStyle = '#f4a261'; // Orange pour la forme d'onde droite
      waveformRightCtx.lineWidth = 2;
      x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArrayRight[i] / 128.0;
        const y = (v * waveformRightCanvas.height) / 2;
        if (i === 0) {
          waveformRightCtx.moveTo(x, y);
        } else {
          waveformRightCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      waveformRightCtx.stroke();
      waveformRightCtx.fillStyle = 'var(--font-color)';
      waveformRightCtx.font = '10px var(--body-font)';
      for (let t = 0; t <= duration; t += 25) {
        const xPos = (t / duration) * waveformRightCanvas.width;
        waveformRightCtx.fillText(`${t}s`, xPos, waveformRightCanvas.height - 5);
        waveformRightCtx.beginPath();
        waveformRightCtx.moveTo(xPos, 0);
        waveformRightCtx.lineTo(xPos, waveformRightCanvas.height);
        waveformRightCtx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        waveformRightCtx.stroke();
      }
    } catch (error) {
      console.error('Erreur lors du dessin des formes d\'onde:', error);
    }
  }

  // Visualisation spectrale avec couleurs par plage de fréquences
  function drawSpectrum() {
    try {
      analyserLeft.getByteFrequencyData(dataArrayLeft);
      spectrumCtx.clearRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);
      const barWidth = (spectrumCanvas.width / bufferLength) * 2.5;
      const maxFreq = audioContext.sampleRate / 2;
      const lowFreqLimit = 200;
      const midFreqLimit = 4000;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const freq = (i / bufferLength) * maxFreq;
        let color;
        if (freq <= lowFreqLimit) {
          color = '#ff4c4c';
        } else if (freq <= midFreqLimit) {
          color = '#ffeb3b';
        } else {
          color = '#2196f3';
        }
        spectrumCtx.fillStyle = color;
        const barHeight = dataArrayLeft[i];
        spectrumCtx.fillRect(x, spectrumCanvas.height - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
      }
      spectrumCtx.fillStyle = 'var(--font-color)';
      spectrumCtx.font = '10px var(--body-font)';
      const freqs = [50, 100, 200, 500, 1000, 2000, 5000, 10000, 15000];
      freqs.forEach(freq => {
        const xPos = (freq / maxFreq) * spectrumCanvas.width;
        spectrumCtx.fillText(`${freq < 1000 ? freq : freq / 1000 + 'k'}Hz`, xPos, 15);
        spectrumCtx.beginPath();
        spectrumCtx.moveTo(xPos, 0);
        spectrumCtx.lineTo(xPos, spectrumCanvas.height);
        spectrumCtx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        spectrumCtx.stroke();
      });
    } catch (error) {
      console.error('Erreur lors du dessin du spectre:', error);
    }
  }

  // Gestion de l'animation avec annulation
  let animationId = null;
  function animate() {
  try {
    drawSpectrum();
    // nouveau : dessiner le spectrogramme ici, avec accès aux variables locales
    if (frameCount++ % 2 === 0) drawSpectrogram();
    if (visualizations.classList.contains('active')) {
      drawVUMeters();
      drawWaveform();
    }
    animationId = requestAnimationFrame(animate);
  } catch (error) {
    console.error('Erreur dans la boucle d\'animation:', error);
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }
}


  // Arrêter l'animation lorsque la page est déchargée
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
      console.log('Animation arrêtée avant déchargement de la page');
    }
  });

  // Contrôle de la balance stéréo
  balanceControl.addEventListener('input', () => {
    pannerNode.pan.value = parseFloat(balanceControl.value);
    console.log('Balance stéréo ajustée:', pannerNode.pan.value);
    updateAudioState();
  });

    // === LARGEUR STÉRÉO L12/R04 – VERSION FINALE PROPRE & IMMERSIVE CASQUE ===
  const widthControl = document.getElementById('widthControl');
  const widthLabel   = document.getElementById('widthLabel');

  if (widthControl && widthLabel) {
    const updateWidth = () => {
      const val = parseFloat(widthControl.value);
      const level = val / 100;

      let sideLevel;
      if (level <= 0.42) {
        sideLevel = level * 1.9;                    // montée très douce
      } else {
        sideLevel = 0.8 + (level - 0.42) * 2.4;     // boost progressif mais contrôlé
      }

      sideGain.gain.setValueAtTime(Math.min(sideLevel, 1.2), audioContext.currentTime);

      let text = "Mono";

if (val <= 10) {
  text = "Mono";
} else if (val <= 40) {
  text = "Étroite";
} else if (val <= 60) {
  text = "Normale";
} else if (val <= 80) {
  text = "Large";
} else if (val <= 92) {
  text = "L12/R04";
} else {
  text = "Ultra-large";
}

// Ajustement spécial
if (val >= 83 && val <= 88) {
  text = "L12/R04 – Orchestre";
}


      widthLabel.textContent = `${text} (${val} %)`;
    };

    widthControl.addEventListener('input', updateWidth);
    updateWidth(); // valeur initiale
  }

  // Contrôle de la vitesse de lecture
  playbackSpeed.addEventListener('change', () => {
    player.playbackRate = parseFloat(playbackSpeed.value);
    updateAudioState();
  });

  // Contrôle du volume
  volumeControl.addEventListener('input', () => {
    gainNode.gain.value = parseFloat(volumeControl.value);
    console.log('Volume ajusté:', gainNode.gain.value);
    updateAudioState();
  });

  // Contrôles de l'égaliseur
  eqLow.addEventListener('input', () => {
    lowFilter.gain.value = parseFloat(eqLow.value);
    console.log('Égaliseur basses ajusté:', lowFilter.gain.value);
    updateAudioState();
  });
  eqMid.addEventListener('input', () => {
    midFilter.gain.value = parseFloat(eqMid.value);
    console.log('Égaliseur médiums ajusté:', midFilter.gain.value);
    updateAudioState();
  });
  eqHigh.addEventListener('input', () => {
    highFilter.gain.value = parseFloat(eqHigh.value);
    console.log('Égaliseur aigus ajusté:', highFilter.gain.value);
    updateAudioState();
  });

  const updateAudioState = async () => {
    const state = {
      time: player.currentTime,
      isPlaying: !player.paused,
      duration: player.duration || 0,
      playbackRate: player.playbackRate,
      volume: gainNode.gain.value,
      balance: pannerNode.pan.value,
      eqLow: lowFilter.gain.value,
      eqMid: midFilter.gain.value,
      eqHigh: highFilter.gain.value,
      controlsVisible: audioControls.classList.contains('active'),
      visualizationsVisible: visualizations.classList.contains('active')
    };
    await saveAudioStateToDB(state);
    localStorage.setItem('audioState', JSON.stringify(state));
    console.log('État audio mis à jour:', state);
  };

  // Recharger l'audio sauvegardé
  const savedAudioData = await loadAudioFromDB();
  console.log('Données audio récupérées de IndexedDB:', savedAudioData);

  if (savedAudioData && savedAudioData.blob) {
    try {
      const audioUrl = URL.createObjectURL(savedAudioData.blob);
      console.log('URL de l\'audio créé:', audioUrl);
      player.src = audioUrl;
      player.load();
      fileNameDisplay.textContent = savedAudioData.fileName 
        ? `Fichier chargé : ${savedAudioData.fileName}` 
        : 'Aucun nom de fichier disponible';
      console.log('Nom affiché:', fileNameDisplay.textContent);

      const savedTime = savedAudioState?.time || parseFloat(savedAudioData.time || 0);
      const isPlaying = savedAudioState?.isPlaying || false;
      const savedPlaybackRate = savedAudioState?.playbackRate || 1;
      const savedVolume = savedAudioState?.volume ?? 0.4;
      const savedBalance = savedAudioState?.balance || 0;
      const savedEqLow = savedAudioState?.eqLow || 0;
      const savedEqMid = savedAudioState?.eqMid || 0;
      const savedEqHigh = savedAudioState?.eqHigh || 0;

      player.playbackRate = savedPlaybackRate;
      gainNode.gain.value = savedVolume;
      pannerNode.pan.value = savedBalance;
      lowFilter.gain.value = savedEqLow;
      midFilter.gain.value = savedEqMid;
      highFilter.gain.value = savedEqHigh;

      playbackSpeed.value = savedPlaybackRate;
      volumeControl.value = savedVolume;
      balanceControl.value = savedBalance;
      eqLow.value = savedEqLow;
      eqMid.value = savedEqMid;
      eqHigh.value = savedEqHigh;

      player.addEventListener('canplaythrough', async () => {
        console.log('Événement canplaythrough déclenché');
        player.currentTime = savedTime;
        console.log('Audio prêt, minutage appliqué:', player.currentTime);
        await checkChannels();
        if (isPlaying) {
          try {
            await audioContext.resume();
            await player.play();
            console.log('Lecture automatique démarrée');
            if (!animationId) {
              animate();
              console.log('Animation démarrée après lecture automatique');
            }
          } catch (err) {
            console.error('Erreur lors de la lecture automatique:', err);
            fileNameDisplay.textContent = 'Erreur: Cliquez sur play pour démarrer';
          }
        } else if (!animationId) {
          animate();
          console.log('Animation démarrée sans lecture automatique');
        }
      }, { once: true });

      player.addEventListener('error', () => {
  console.warn("Erreur de lecture audio ignorée (fichier supprimé ou corrompu)");
});
    } catch (error) {
      console.error('Erreur lors de la configuration de l\'audio:', error);
      alert('Erreur lors du rechargement de l\'audio. Essayez de réimporter le fichier.');
      fileNameDisplay.textContent = 'Erreur lors du chargement';
    }
  } else {
    console.log('Aucun audio sauvegardé dans IndexedDB');
    fileNameDisplay.textContent = 'Aucun fichier chargé';
  }

  // Gestion explicite du bouton play (si présent dans le DOM)
  const playButton = document.querySelector('#playButton');
  if (playButton) {
    playButton.addEventListener('click', async () => {
      try {
        await audioContext.resume();
        await player.play();
        console.log('Lecture démarrée via le bouton play');
        if (!animationId) {
          animate();
          console.log('Animation démarrée via le bouton play');
        }
      } catch (err) {
        console.error('Erreur lors de la lecture via le bouton play:', err);
        alert('Erreur lors de la lecture. Vérifiez le fichier audio.');
      }
    });
  }

  player.addEventListener('timeupdate', updateAudioState);
  player.addEventListener('play', async () => {
    await audioContext.resume();
    updateAudioState();
    if (!animationId) {
      animate();
      console.log('Animation démarrée lors de la lecture');
    }
  });
  player.addEventListener('pause', updateAudioState);
  player.addEventListener('ended', async () => {
    const state = { 
      time: 0, 
      isPlaying: false, 
      duration: player.duration || 0, 
      playbackRate: player.playbackRate, 
      volume: gainNode.gain.value, 
      balance: pannerNode.pan.value,
      eqLow: lowFilter.gain.value,
      eqMid: midFilter.gain.value,
      eqHigh: highFilter.gain.value,
      controlsVisible: audioControls.classList.contains('active'),
      visualizationsVisible: visualizations.classList.contains('active')
    };
    await saveAudioStateToDB(state);
    localStorage.setItem('audioState', JSON.stringify(state));
  });

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log('Aucun fichier sélectionné');
      fileNameDisplay.textContent = 'Aucun fichier chargé';
      return;
    }

    console.log('Importation d\'un nouveau fichier:', file.name, 'Taille (octets):', file.size);
    fileNameDisplay.textContent = `Fichier chargé : ${file.name}`;
    localStorage.setItem('audioFileName', file.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const audioData = e.target.result;
        player.src = audioData;

        eqLow.value = -6;           // le curseur "Basses" démarre à -6
        lowFilter.gain.value = -6;  // applique immédiatement -6 dB sur les basses

        player.load();
        await saveAudioToDB(file, player.currentTime || 0, file.name, player.duration || 0);
        console.log('Nouveau fichier audio sauvegardé dans IndexedDB');
        player.addEventListener('canplaythrough', async () => {
          player.currentTime = 0;
          updateAudioState();
          await checkChannels();
          if (!animationId) {
            animate();
            console.log('Animation démarrée après chargement de nouveau fichier');
          }
        }, { once: true });
      } catch (error) {
        console.error('Erreur lors du chargement du nouveau fichier:', error);
        alert('Erreur lors du chargement du fichier audio.');
        fileNameDisplay.textContent = 'Erreur lors du chargement';
      }
    };
    reader.onerror = (e) => {
      console.error('Erreur de lecture du fichier:', e);
      alert('Impossible de lire le fichier audio.');
      fileNameDisplay.textContent = 'Erreur lors du chargement';
    };
    reader.readAsDataURL(file);
  });
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
  const currentPage = getPageName();
  console.log('Page actuelle:', currentPage);
  if (currentPage === '' || currentPage === 'index') {
    console.log('Initialisation de setupAudioPlayer sur la page principale');
    await setupAudioPlayer();

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
  spectroCanvas.height = 250;
  history = []; // on vide l'historique pour repartir propre
}

function drawSpectrogram() {
  if (!spectroCtx || !analyserLeftGlobal || !dataArrayLeftGlobal) return;

  analyserLeftGlobal.getByteFrequencyData(dataArrayLeftGlobal);

  // On ajoute la nouvelle colonne
  history.push(new Uint8Array(dataArrayLeftGlobal));
  if (history.length > spectroCanvas.width) history.shift();

  // Fond noir
  spectroCtx.fillStyle = 'black';
  spectroCtx.fillRect(0, 0, spectroCanvas.width, spectroCanvas.height);

  const barW = spectroCanvas.width / history.length;

  for (let x = 0; x < history.length; x++) {
    const col = history[x];
    for (let i = 0; i < col.length; i += 3) {  // 3 = plus de détail + plus rapide
      const v = col[i] / 255;  // 0 à 1

      if (v > 0.01) {  // seuil très bas pour voir même les signaux faibles
        const y = spectroCanvas.height - (i / col.length) * spectroCanvas.height;

        // Palette Audacity / iZotope — violet → bleu → vert → jaune → rouge
        let r, g, b;
        if (v < 0.25) {
          // Violet → bleu
          r = Math.round(100 + 155 * (v / 0.25));
          g = 0;
          b = Math.round(180 + 75 * (v / 0.25));
        } else if (v < 0.5) {
          // Bleu → cyan
          const t = (v - 0.25) / 0.25;
          r = Math.round(255 - 155 * t);
          g = Math.round(100 + 155 * t);
          b = 255;
        } else if (v < 0.75) {
          // Cyan → jaune
          const t = (v - 0.5) / 0.25;
          r = 255;
          g = 255;
          b = Math.round(255 - 255 * t);
        } else {
          // Jaune → rouge
          const t = (v - 0.75) / 0.25;
          r = 255;
          g = Math.round(255 - 255 * t);
          b = 0;
        }

        spectroCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        spectroCtx.fillRect(x * barW, y, barW + 1, spectroCanvas.height - y);
      }
    }
  }
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