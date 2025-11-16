// === FONCTIONS MANQUANTES POUR PAGES ANNEXES ===
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function getPageName() {
  return window.location.pathname.split('/').pop().replace('.html', '');
}


// PAGES doit être défini pour les pages annexes aussi
const PAGES = window.PAGES || {
  page1: "Styles", page2: "Effectif", page3: "Instruments", 
  page4: "Voix", page5: "Timbre", page6: "Forme", page7: "Harmonie", 
  page8: "Procédé", page9: "Tempo", page10: "Rythme", page11: "Genre", 
  page12: "Dynamique", page13: "Langues", page14: "Adjectifs",
  'langues-classification': "Classification"
};

// Fonction pour gérer la sélection des mots
const words = document.querySelectorAll('.selectable');
const definitionContainer = document.getElementById('definition-container');
const definitionTitle = document.getElementById('definition-title');
const definitionText = document.getElementById('definition-text');
const definitionImage = document.getElementById('definition-image');
const definitionAudio = document.getElementById('definition-audio');
const definitionAudioSource = document.getElementById('definition-audio-source');
const definitionVideo = document.getElementById('definition-video');
const definitionVideoSource = document.getElementById('definition-video-source');
const definitionImageContainer = document.getElementById('definition-image-container');
const definitionAudioContainer = document.getElementById('definition-audio-container');
const definitionVideoContainer = document.getElementById('definition-video-container');



// Redimensionnement
let isResizing = false;
let startX, startY, startWidth, startHeight;

definitionContainer.addEventListener('mousedown', (e) => {
    const rect = definitionContainer.getBoundingClientRect();
    const handleSize = 20;
    if (e.clientX <= rect.left + handleSize && e.clientY >= rect.bottom - handleSize) {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseFloat(getComputedStyle(definitionContainer).width);
        startHeight = parseFloat(getComputedStyle(definitionContainer).height);
        e.preventDefault();
    }
});

document.addEventListener('mousemove', (e) => {
    if (isResizing) {
        const newWidth = startWidth - (e.clientX - startX);
        const newHeight = startHeight + (e.clientY - startY);
        definitionContainer.style.width = `${Math.max(250, Math.min(newWidth, 600))}px`;
        definitionContainer.style.height = `${Math.max(200, Math.min(newHeight, 800))}px`;
    }
});

document.addEventListener('mouseup', () => {
    isResizing = false;
});

// Restaurer les mots sélectionnés au chargement de la page
function restoreSelectedWords() {
    const pageName = window.location.pathname.split('/').pop().replace('.html', '');
    const savedWords = JSON.parse(localStorage.getItem(`selectedWords_${pageName}`)) || [];
    words.forEach(word => {
        if (savedWords.includes(word.textContent)) {
            word.classList.add('selected');
        }
    });
    console.log(`Mots restaurés pour ${pageName}:`, savedWords);
}

function updateSelectedWords() {
  const pageName = window.location.pathname.split('/').pop().replace('.html', '');
  const selectedWordsOnPage = Array.from(document.querySelectorAll('.selected')).map(el => el.textContent.trim());

  // SAUVEGARDE LOCALE (page actuelle)
  saveToLocalStorage(`selectedWords_${pageName}`, selectedWordsOnPage);

  // NOUVEAU : Fusion globale de TOUTES les pages
  const allGlobalWords = [];
  Object.keys(PAGES).forEach(page => {
    const words = loadFromLocalStorage(`selectedWords_${page}`) || [];
    words.forEach(word => {
      if (!allGlobalWords.includes(word)) {
        allGlobalWords.push(word);
      }
    });
  });

  // SAUVEGARDE GLOBALE
  localStorage.setItem('selectedWords', JSON.stringify(allGlobalWords));

  console.log(`Mots mis à jour [${pageName}]:`, selectedWordsOnPage);
  console.log('Global fusionné:', allGlobalWords);

  // NOTIFIER index.html
  localStorage.setItem('forceGlobalUpdate', Date.now().toString());
}

// === DÉTECTION DE LA PAGE PRINCIPALE ===
const isMainPage = window.location.pathname === '/' || 
                    window.location.pathname.includes('index.html') ||
                    !window.location.pathname.includes('/pages/');

// === GESTION DES MOTS (SÉCURISÉE) ===
words.forEach(word => {
  word.addEventListener('click', function (e) {
    // ARRÊTER LA PROPAGATION SI C'EST LA CROIX
    if (e.target.closest('.delete-word')) return;

    const wordText = this.textContent.trim();
    const isSelected = this.classList.toggle('selected');

    updateSelectedWords();

    if (isSelected) {
      const wordData = wordDefinitions[wordText] || { definition: "Aucune définition disponible." };

      definitionTitle.textContent = wordText;
      definitionText.innerHTML = wordData.definition.replace(/\n/g, '<br>');

      definitionImageContainer.style.display = wordData.image ? 'block' : 'none';
      if (wordData.image) {
        definitionImage.src = wordData.image;
        definitionImage.style.display = 'block';
      } else {
        definitionImage.style.display = 'none';
      }

      definitionAudioContainer.style.display = wordData.audio ? 'block' : 'none';
      if (wordData.audio) {
        definitionAudioSource.src = wordData.audio;
        definitionAudio.load();
        definitionAudio.style.display = 'block';
      } else {
        definitionAudio.style.display = 'none';
      }

      definitionVideoContainer.style.display = wordData.video ? 'block' : 'none';
      if (wordData.video) {
        definitionVideoSource.src = wordData.video;
        definitionVideo.load();
        definitionVideo.style.display = 'block';
      } else {
        definitionVideo.style.display = 'none';
      }

      // NE PAS AFFICHER LE PANNEAU SUR index.html
      if (!isMainPage) {
        definitionContainer.style.display = 'block';
      }
    } else {
      if (!isMainPage && document.querySelectorAll('.selected').length === 0) {
        definitionContainer.style.display = 'none';
      }
    }

    // POSITIONNEMENT (uniquement si panneau visible et pas index.html)
    if (!isMainPage && definitionContainer.style.display === 'block') {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      if (definitionContainer.parentElement) {
        definitionContainer.parentElement.removeChild(definitionContainer);
      }

      if (isMobile) {
        definitionContainer.style.position = 'relative';
        definitionContainer.style.left = '';
        definitionContainer.style.top = '';
        definitionContainer.style.right = '';
        definitionContainer.style.width = '100%';
        definitionContainer.style.maxWidth = '';
        this.insertAdjacentElement('afterend', definitionContainer);
      } else {
        definitionContainer.style.position = 'fixed';
        definitionContainer.style.right = '20px';
        definitionContainer.style.top = '20px';
        definitionContainer.style.width = '300px';
        definitionContainer.style.maxWidth = '600px';
       document.body.appendChild(definitionContainer);
      }
    }
  });
});

// NOUVEAU: Écouter les événements de réinitialisation
window.addEventListener('storage', (event) => {
    if (event.key === 'clearSelectionEvent' || event.key === `selectedWords_${getPageName()}`) {
        console.log('Événement de réinitialisation détecté:', event.key);
        restoreSelectedWords();
        // Masquer le panneau si aucune sélection
        definitionContainer.style.display = 'none';
    }
});

function clearSelection() {
  if (confirm('Êtes-vous sûr de vouloir annuler toutes vos sélections ?')) {
    words.forEach(word => word.classList.remove('selected'));
    const pageName = window.location.pathname.split('/').pop().replace('.html', '');
    localStorage.setItem(`selectedWords_${pageName}`, JSON.stringify([]));
    let selectedWords = JSON.parse(localStorage.getItem('selectedWords')) || [];
    const pageWords = Array.from(words).map(el => el.textContent);
    selectedWords = selectedWords.filter(word => !pageWords.includes(word));
    localStorage.setItem('selectedWords', JSON.stringify(selectedWords));
    definitionContainer.style.display = 'none';

    // SIGNAL DE FERMETURE
    localStorage.setItem('closeDefinitionPanel', Date.now().toString());

    console.log(`Sélections annulées pour ${pageName}`);
  }
}

function returnWords() {
    const selectedWordsOnPage = Array.from(document.querySelectorAll('.selected')).map(el => el.textContent);
    console.log(`Retour à la page principale, vocabulaire sélectionné pour ${window.location.pathname.split('/').pop().replace('.html', '')}:`, selectedWordsOnPage);
    window.location.href = "../index.html";
}

function closeDefinition() {
    definitionContainer.style.display = 'none';
}

function goToHomePage() {
    window.location.href = "../index.html";
}

// Fonction pour ouvrir IndexedDB
function openDB() {
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

// Fonction pour charger l'audio depuis IndexedDB
function loadAudioFromDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('AudioDB');
        request.onerror = () => reject('Erreur lors de l’ouverture d’IndexedDB');
        request.onsuccess = event => {
            const db = event.target.result;
            const transaction = db.transaction(['audioStore'], 'readonly');
            const store = transaction.objectStore('audioStore');
            const getAudio = store.get('userAudio');
            getAudio.onsuccess = () => {
                console.log('Résultat de store.get(userAudio):', getAudio.result);
                resolve(getAudio.result);
            };
            getAudio.onerror = () => reject('Erreur lors du chargement de userAudio');
        };
    });
}

// Fonction pour charger l'état audio depuis IndexedDB
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

// Fonction pour sauvegarder l'état audio dans IndexedDB
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

// Fonction utilitaire pour formater le temps
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function setupMiniPlayer() {
    const miniPlayer = document.getElementById('miniPlayer');
    const miniPlayPause = document.getElementById('miniPlayPause');
    const miniSeekBar = document.getElementById('miniSeekBar');
    const miniCurrentTime = document.getElementById('miniCurrentTime');
    const miniDuration = document.getElementById('miniDuration');
    const miniPlayerError = document.getElementById('miniPlayerError');

    if (!miniPlayer || !miniPlayPause || !miniSeekBar || !miniCurrentTime || !miniDuration || !miniPlayerError) {
        console.error('Éléments du mini-lecteur non trouvés dans le DOM:', {
            miniPlayer: !!miniPlayer,
            miniPlayPause: !!miniPlayPause,
            miniSeekBar: !!miniSeekBar,
            miniCurrentTime: !!miniCurrentTime,
            miniDuration: !!miniDuration,
            miniPlayerError: !!miniPlayerError
        });
        return;
    }

    let audio = null;

    const updatePlayerState = (state) => {
        if (!audio || !state) return;
        audio.currentTime = state.time;
        miniSeekBar.value = state.time;
        miniCurrentTime.textContent = formatTime(state.time);
        if (state.isPlaying && audio.paused) {
            audio.play().catch(err => {
                console.error('Erreur lecture mini-lecteur:', err);
                miniPlayerError.textContent = 'Erreur : lecture bloquée. Cliquez sur play.';
                miniPlayerError.classList.remove('d-none');
            });
            miniPlayPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
        } else if (!state.isPlaying && !audio.paused) {
            audio.pause();
            miniPlayPause.innerHTML = '<i class="bi bi-play-fill"></i>';
        }
    };

    loadAudioFromDB().then(savedAudioData => {
        console.log('Audio trouvé dans IndexedDB pour le mini-lecteur:', savedAudioData);
        if (savedAudioData && savedAudioData.blob) {
            try {
                audio = new Audio();
                audio.src = URL.createObjectURL(savedAudioData.blob);
                console.log('URL audio créée:', audio.src);

                miniPlayer.classList.remove('d-none');
                miniPlayerError.classList.add('d-none');
                miniSeekBar.value = savedAudioData.time || 0;
                miniCurrentTime.textContent = formatTime(savedAudioData.time || 0);

                audio.addEventListener('loadedmetadata', () => {
                    console.log('Métadonnées chargées:', audio.duration);
                    miniSeekBar.max = audio.duration;
                    miniDuration.textContent = formatTime(audio.duration);
                });

                audio.addEventListener('timeupdate', () => {
                    miniSeekBar.value = audio.currentTime;
                    miniCurrentTime.textContent = formatTime(audio.currentTime);
                    const state = { time: audio.currentTime, isPlaying: !audio.paused, duration: audio.duration };
                    saveAudioStateToDB(state);
                    localStorage.setItem('audioState', JSON.stringify(state));
                });

                miniSeekBar.addEventListener('input', () => {
                    audio.currentTime = miniSeekBar.value;
                    const state = { time: audio.currentTime, isPlaying: !audio.paused, duration: audio.duration };
                    saveAudioStateToDB(state);
                    localStorage.setItem('audioState', JSON.stringify(state));
                });

                miniPlayPause.addEventListener('click', () => {
                    if (audio.paused) {
                        audio.play().catch(err => {
                            console.error('Erreur lors de la lecture:', err);
                            miniPlayerError.textContent = 'Erreur : lecture bloquée. Cliquez à nouveau.';
                            miniPlayerError.classList.remove('d-none');
                        });
                        miniPlayPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
                    } else {
                        audio.pause();
                        miniPlayPause.innerHTML = '<i class="bi bi-play-fill"></i>';
                    }
                    const state = { time: audio.currentTime, isPlaying: !audio.paused, duration: audio.duration };
                    saveAudioStateToDB(state);
                    localStorage.setItem('audioState', JSON.stringify(state));
                });

                // Charger l'état initial
                loadAudioStateFromDB().then(state => {
                    if (state) {
                        updatePlayerState(state);
                    }
                });

                // Écouter les changements d'état via localStorage
                window.addEventListener('storage', (event) => {
                    if (event.key === 'audioState') {
                        const state = JSON.parse(event.newValue);
                        updatePlayerState(state);
                    }
                });

            } catch (err) {
                console.error('Erreur lors de la configuration du mini-lecteur:', err);
                miniPlayer.classList.add('d-none');
                miniPlayerError.textContent = 'Erreur : impossible de configurer l’audio.';
                miniPlayerError.classList.remove('d-none');
            }
        } else {
            console.log('Aucun audio disponible dans IndexedDB pour le mini-lecteur');
            miniPlayer.classList.add('d-none');
            miniPlayerError.classList.remove('d-none');
        }
    }).catch(err => {
        console.error('Erreur lors du chargement depuis IndexedDB:', err);
        miniPlayer.classList.add('d-none');
        miniPlayerError.classList.remove('d-none');
    });
}

// Appeler la fonction pour restaurer les mots au chargement
document.addEventListener('DOMContentLoaded', () => {
    restoreSelectedWords();
    setupMiniPlayer();
    // Initialiser le panneau de définition avec le message par défaut
    definitionTitle.textContent = "Définition";
    definitionText.innerHTML = "Sélectionnez un mot pour voir la définition.";
    definitionImageContainer.style.display = 'none';
    definitionAudioContainer.style.display = 'none';
    definitionVideoContainer.style.display = 'none';
    // Positionner le panneau au chargement
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    if (definitionContainer.parentElement) {
        definitionContainer.parentElement.removeChild(definitionContainer);
    }
    if (isMobile) {
        definitionContainer.style.position = 'relative';
        definitionContainer.style.left = '';
        definitionContainer.style.top = '';
        definitionContainer.style.width = '100%';
        definitionContainer.style.maxWidth = '';
        if (isPortrait) {
            const h1 = document.querySelector('h1');
            if (h1) {
                h1.insertAdjacentElement('afterend', definitionContainer);
            } else {
                const header = document.querySelector('header');
                if (header) {
                    header.insertAdjacentElement('afterend', definitionContainer);
                } else {
                    document.body.appendChild(definitionContainer);
                }
            }
        } else {
            const header = document.querySelector('header');
            if (header) {
                header.insertAdjacentElement('afterend', definitionContainer);
            } else {
                document.body.appendChild(definitionContainer);
            }
        }
    } else {
        definitionContainer.style.position = 'fixed';
        definitionContainer.style.right = '20px';
        definitionContainer.style.top = '20px';
        definitionContainer.style.width = '300px';
        definitionContainer.style.maxWidth = '600px';
        document.body.appendChild(definitionContainer);
    }
});

window.addEventListener('storage', (e) => {
  if (e.key === 'forceGlobalUpdate') {
    const pageName = window.location.pathname.split('/').pop().replace('.html', '');
    const saved = JSON.parse(localStorage.getItem(`selectedWords_${pageName}`)) || [];
    document.querySelectorAll('.selectable').forEach(span => {
      const text = span.textContent.trim();
      span.classList.toggle('selected', saved.includes(text));
    });
    if (saved.length === 0) {
      document.getElementById('definition-container').style.display = 'none';
    }
  }
});

// FERMER LE PANNEAU SI SUPPRESSION DEPUIS index.html
window.addEventListener('storage', (e) => {
  if (e.key === 'closeDefinitionPanel') {
    const panel = document.getElementById('definition-container');
    if (panel) {
      panel.style.display = 'none';
    }
    // Nettoyer le signal
    localStorage.removeItem('closeDefinitionPanel');
  }
});


  