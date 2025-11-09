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
  page14: "Adjectifs"
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

// Définir les définitions des mots
const wordDefinitions = 
        {
  // Émotions
  "émouvant": { definition: "Qui provoque une émotion intense ou touchante." },
  "envoûtant": { definition: "Qui charme et captive l’attention de manière presque magique." },
  "angoissant": { definition: "Qui suscite une sensation de tension ou d’inquiétude." },
  "joyeux": { definition: "Qui évoque l’allégresse et la bonne humeur." },
  "nostalgique": { definition: "Qui fait naître des souvenirs doux-amers du passé." },
  "mélancolique": { definition: "Triste et rêveur, chargé de douceur et de regrets." },
  "apaisant": { definition: "Qui calme, qui procure du réconfort." },

  // Caractère
  "délicat": { definition: "Subtil, raffiné, exprimé avec finesse." },
  "puissant": { definition: "Imposant, fort, marqué par l'intensité." },
  "enjoué": { definition: "Gai, léger, rempli d’allégresse." },
  "solennel": { definition: "Grave, sérieux, empreint de majesté." },
  "majestueux": { definition: "Noble, imposant, inspirant le respect." },
  "intime": { definition: "Personnel, réservé, chaleureux et discret." },
  "dramatique": { definition: "Fortement expressif, souvent lié à des tensions ou conflits émotionnels." },

  // Texture
  "aérien": { definition: "Léger, flottant, presque immatériel." },
  "dense": { definition: "Compact, riche, rempli de matière sonore." },
  "cristallin": { definition: "Clair, limpide, éclatant comme du cristal." },
  "velouté": { definition: "Doux au toucher, agréable et lisse à l’oreille." },
  "rugueux": { definition: "Brut, avec des aspérités sonores." },
  "fluide": { definition: "Continu, sans heurts, comme coulant naturellement." },
  "granuleux": { definition: "Avec une texture sonore irrégulière ou grésillante." },

  // Mouvement
  "entraînant": { definition: "Qui incite au mouvement ou à la danse." },
  "languissant": { definition: "Lent, mou, presque plaintif." },
  "saccadé": { definition: "Interrompu, marqué par des arrêts nets." },
  "ondulant": { definition: "Souple, aux variations douces comme des vagues." },
  "frénétique": { definition: "Agité, rapide et intense." },
  "mesuré": { definition: "Calme, régulier, structuré." },
  "chaloupé": { definition: "Avec un balancement marqué, typique de certaines danses." },

  // Timbre
  "chaud": { definition: "Riche, rond, agréable à l’oreille." },
  "métallique": { definition: "Brillant, résonant comme le métal." },
  "boisé": { definition: "Rond, naturel, doux comme les sons des instruments en bois." },
  "sourd": { definition: "Mat, étouffé, peu brillant." },
  "éclatant": { definition: "Vif, brillant, frappant." },
  "nasillard": { definition: "Ressemble à une voix nasale, pincée." },
  "soyeux": { definition: "Doux et lisse, comme une texture fluide et raffinée." },

  // Impression globale
  "hypnotique": { definition: "Fascinant au point d’absorber totalement l’attention." },
  "transcendant": { definition: "Qui dépasse le réel, spirituel ou extatique." },
  "captivant": { definition: "Qui retient l’attention de manière forte." },
  "enveloppant": { definition: "Qui entoure l’auditeur, immersif." },
  "immersionnel": { definition: "Qui plonge l’auditeur dans un univers sonore complet." },
  "évocateur": { definition: "Qui suggère des images, des idées ou des émotions." },
  // Nuances de base
  "pianissimo (pp)": {
    definition: "Très doux, presque un murmure."
  },
  "piano (p)": {
    definition: "Doux."
  },
  "mezzo piano (mp)": {
    definition: "Modérément doux."
  },
  "mezzo forte (mf)": {
    definition: "Modérément fort."
  },
  "forte (f)": {
    definition: "Fort."
  },
  "fortissimo (ff)": {
    definition: "Très fort."

  },

  // Nuances extrêmes
  "pianississimo (ppp)": {
    definition: "Extrêmement doux, à peine audible."
  },
  "fortississimo (fff)": {
    definition: "Extrêmement fort, presque crié."
  },
  "sforzando (sfz)": {
    definition: "Accentuation soudaine et forte d'une note ou d’un accord."
  },
  "rinforzando (rfz)": {
    definition: "Renforcement progressif ou soudain d’un passage."
  },
  "forte-piano (fp)": {
    definition: "Attaque forte suivie immédiatement d’un passage doux."

  },

  // Évolution progressive
  "crescendo": {
    definition: "Augmentation progressive du volume."
  },
  "decrescendo": {
    definition: "Diminution progressive du volume."
  },
  "diminuendo": {
    definition: "Synonyme de decrescendo."
  },
  "morendo": {
    definition: "Mourant, diminuant jusqu’au silence."
  },
  "perdendosi": {
    definition: "Se perdant, comme s’évanouissant progressivement."

  },

  // Accentuations
  "accent": {
    definition: "Mise en valeur d’une note par un jeu plus marqué."
  },
  "marcato": {
    definition: "Bien marqué, avec une attaque nette."
  },
  "martelé": {
    definition: "Très accentué, avec une articulation dure."
  },
  "staccato": {
    definition: "Détaché, notes brèves et séparées."
  },
  "tenuto": {
    definition: "Maintenu, avec une légère insistance."

  },

  // Effets dynamiques
  "messa di voce": {
    definition: "Effet vocal consistant à gonfler et diminuer progressivement le volume d’une même note."
  },
  "echo": {
    definition: "Répétition atténuée d’une phrase ou d’un motif musical."
  },
  "subito": {
    definition: "Soudain, généralement utilisé avec une nuance (ex : subito piano)."
  },
  "espressivo": {
    definition: "Expressif, chargé d’émotion."
  },
  "con forza": {
    definition: "Avec force ou intensité."

  },

  // Termes associés
  "doux": {
    definition: "Caractère tendre, peu intense."
  },
  "puissant": {
    definition: "Caractère fort et imposant."
  },
  "léger": {
    definition: "Joué avec finesse et délicatesse."
  },
  "lourd": {
    definition: "Pesant, accentué, parfois lent."
  },
  "délicat": {
    definition: "Subtil, fragile et soigné."
  },
  // Genres vocaux
  "chanson": {
    definition: "Pièce vocale souvent simple, avec paroles, populaire ou traditionnelle."
  },
  "lied": {
    definition: "Chant allemand romantique pour voix et piano, sur un poème."
  },
  "mélodie": {
    definition: "Chant artistique français avec accompagnement, équivalent du lied."
  },
  "aria": {
    definition: "Air chanté par un soliste, souvent dans un opéra ou un oratorio."
  },
  "cantate": {
    definition: "Œuvre vocale avec accompagnement instrumental, en plusieurs mouvements."
  },
  "oratorio": {
    definition: "Grande composition dramatique sacrée pour solistes, chœur et orchestre."
  },
  "messe": {
    definition: "Composition musicale reprenant les parties de la messe liturgique chrétienne."
  },
  "motet": {
    definition: "Œuvre vocale sacrée polyphonique sans accompagnement instrumental (à l'origine).",

  },

  // Genres instrumentaux
  "concerto": {
    definition: "Œuvre pour soliste et orchestre, en trois mouvements souvent contrastés."
  },
  "sonate": {
    definition: "Œuvre instrumentale structurée en plusieurs mouvements, souvent pour un ou deux instruments."
  },
  "symphonie": {
    definition: "Grande composition orchestrale en plusieurs mouvements."
  },
  "prélude": {
    definition: "Pièce courte souvent introductive ou autonome, au caractère libre."
  },
  "fugue": {
    definition: "Pièce contrapuntique développant un thème par imitations successives."
  },
  "étude": {
    definition: "Pièce visant à développer la technique d’un instrumentiste, parfois de concert."
  },
  "nocturne": {
    definition: "Pièce expressive et lyrique, souvent pour piano, évoquant la nuit."
  },
  "ballade": {
    definition: "Pièce lyrique, narrative ou poétique, souvent pour piano seul ou voix."

  },

  // Genres scéniques
  "opéra": {
    definition: "Œuvre dramatique chantée avec orchestre, mise en scène, costumes et décors."
  },
  "opérette": {
    definition: "Forme légère d’opéra avec dialogues parlés, chansons et humour."
  },
  "ballet": {
    definition: "Composition pour la danse, accompagnée d’un orchestre."
  },
  "comédie musicale": {
    definition: "Spectacle mêlant chant, danse et théâtre, souvent populaire."
  },
  "drame musical": {
    definition: "Forme d’opéra avec continuité dramatique et musicale plus intense, sans séparation nette entre les numéros."

  },

  // Musique de chambre
  "quatuor à cordes": {
    definition: "Formation de musique de chambre avec deux violons, un alto et un violoncelle."
  },
  "trio": {
    definition: "Ensemble ou œuvre pour trois instruments ou voix."
  },
  "quintette": {
    definition: "Ensemble ou œuvre pour cinq instruments ou voix."
  },
  "sonate en duo": {
    definition: "Œuvre en deux parties pour deux instruments, souvent piano et un autre instrument mélodique."
  },
  "divertimento": {
    definition: "Pièce légère et divertissante, souvent pour ensemble instrumental."

  },

  // Formes libres
  "fantaisie": {
    definition: "Pièce au caractère improvisé, libre dans la forme."
  },
  "impromptu": {
    definition: "Pièce courte et spontanée, au style libre et expressif."
  },
  "rhapsodie": {
    definition: "Composition libre inspirée de thèmes populaires ou folkloriques."
  },
  "toccata": {
    definition: "Pièce virtuose pour clavier ou orgue, au style libre et rapide."
  },
  "variations": {
    definition: "Œuvre fondée sur la transformation successive d’un même thème."

  },

  // Genres traditionnels
  "suite": {
    definition: "Enchaînement de danses instrumentales ou de mouvements contrastés."
  },
  "partita": {
    definition: "Suite de pièces pour clavier ou instrument seul, apparentée à la suite."
  },
  "chaconne": {
    definition: "Pièce construite sur une basse obstinée répétée."
  },
  "passacaille": {
    definition: "Pièce fondée sur une basse répétée, proche de la chaconne."
  },
  "ricercare": {
    definition: "Forme ancienne de fugue, à l’origine instrumentale et savante."
},
  // Éléments rythmiques
  "pulsation": {
    definition: "Battement régulier qui structure le temps dans la musique."
  },
  "tempo": {
    definition: "Vitesse à laquelle la musique est jouée, mesurée en BPM (battements par minute)."
  },
  "mètre": {
    definition: "Organisation des temps en mesures, représentée par une signature rythmique (ex. : 3/4, 4/4)."
  },
  "mesure": {
    definition: "Groupe de temps délimité par des barres de mesure dans la notation musicale."
  },
  "battement": {
    definition: "Unité de base du tempo, perçue comme une pulsation régulière."
  },
  "contretemps": {
    definition: "Note ou accent rythmique placé entre les temps forts."

  },

  // Figures rythmiques
  "noire": {
    definition: "Figure de note d’une durée d’un temps en 4/4."
  },
  "croche": {
    definition: "Figure de note valant la moitié d’une noire (1/2 temps en 4/4)."
  },
  "double-croche": {
    definition: "Figure de note valant un quart de noire (1/4 temps en 4/4)."
  },
  "ronde": {
    definition: "Figure de note valant quatre temps en 4/4."
  },
  "blanche": {
    definition: "Figure de note valant deux temps en 4/4."
  },
  "soupir": {
    definition: "Silence équivalent à un temps en 4/4 (durée d’une noire)."
  },
  "demi-soupir": {
    definition: "Silence équivalent à une croche (1/2 temps en 4/4)."

  },

  // Techniques rythmiques
  "syncope": {
    definition: "Déplacement de l’accent rythmique sur un temps faible ou entre les temps."
  },
  "pointé": {
    definition: "Rythme où une note est suivie d’un tiers de sa valeur (ex. : noire pointée = noire + croche)."
  },
  "triolet": {
    definition: "Groupe de trois notes jouées dans le temps de deux (ex. : trois croches en une noire)."
  },
  "swing": {
    definition: "Style rythmique avec des croches inégalement jouées pour donner un balancement."
  },
  "shuffle": {
    definition: "Variante du swing avec un balancement plus marqué entre les notes d’un même temps."
  },
  "polyrythmie": {
    definition: "Superposition de plusieurs rythmes différents joués simultanément."

  },

  // Styles rythmiques
  "temps binaire": {
    definition: "Structure rythmique où chaque temps est divisible par deux."
  },
  "temps ternaire": {
    definition: "Structure rythmique où chaque temps est divisible par trois."
  },
  "quaternaire": {
    definition: "Mesure à quatre temps, courante dans la musique occidentale (ex. : 4/4)."
  },
  "bossa-nova": {
    definition: "Rythme syncopé issu de la musique brésilienne, souvent en 2/4 ou 4/4."
  },
  "samba": {
    definition: "Style rythmique brésilien rapide et syncopé, souvent utilisé en danse."
  },
  "funk": {
    definition: "Style musical et rythmique basé sur des grooves syncopés et percussifs."

  },

  // Termes spécifiques
  "anacrouse": {
    definition: "Note ou groupe de notes jouées avant le premier temps fort d’une phrase musicale (levée)."
  },
  "hémiole": {
    definition: "Superposition de deux métriques différentes, souvent 3 contre 2."
  },
  "ostinato": {
    definition: "Motif rythmique ou mélodique répété de façon continue dans une œuvre."
  },
  "rubato": {
    definition: "Liberté expressive dans le rythme, où l’on accélère ou ralentit temporairement le tempo."
  },
  "agogique": {
    definition: "Variations de tempo subtiles et expressives, non notées précisément."

  },

  // Notation
  "chiffrage": {
    definition: "Système de notation des accords ou des signatures rythmiques."
  },
  "barre de mesure": {
    definition: "Barre verticale dans une portée qui délimite les mesures ou indique des répétitions."
  },
  "liaison": {
    definition: "Courbe reliant deux notes de même hauteur (prolongation) ou deux notes différentes (interprétation liée)."
  },
  "point d'orgue": {
    definition: "Symbole indiquant qu'une note ou un silence doit être tenu plus longtemps que sa valeur normale."
  },
  "mesure à blanc": {
    definition: "Mesure sans contenu, souvent utilisée comme mesure d’introduction (levée) ou de respiration."
},
  // Indications de tempo
  "largo": {
    definition: "Très lent, solennel et large dans l’expression."
  },
  "adagio": {
    definition: "Lent, mais légèrement plus rapide que largo, souvent expressif."
  },
  "andante": {
    definition: "Allure modérée, correspondant à un pas tranquille."
  },
  "moderato": {
    definition: "Tempo modéré, ni lent ni rapide."
  },
  "allegro": {
    definition: "Rapide, vif et joyeux."
  },
  "presto": {
    definition: "Très rapide, énergique."
  },
  "prestissimo": {
    definition: "Le plus rapide possible, au-delà de presto."

  },

  // Modifications de tempo
  "accelerando": {
    definition: "Indication d’accélérer progressivement le tempo."
  },
  "ritardando": {
    definition: "Indication de ralentir progressivement le tempo."
  },
  "rallentando": {
    definition: "Similaire à ritardando, désigne un ralentissement progressif."
  },
  "rubato": {
    definition: "Liberté rythmique prise par l’interprète en ralentissant ou accélérant légèrement certaines notes."
  },
  "a tempo": {
    definition: "Reprise du tempo initial après une variation (ex. : rubato ou rallentando)."
  },
  "tempo primo": {
    definition: "Retour au tout premier tempo indiqué dans l’œuvre."

  },

  // Mesures et battements
  "battement": {
    definition: "Unité rythmique perçue comme la pulsation régulière d’un morceau."
  },
  "métronome": {
    definition: "Appareil qui indique un tempo précis en battant une pulsation régulière (exprimée en BPM)."
  },
  "pulsation": {
    definition: "Battement régulier qui sous-tend le tempo d’une œuvre musicale."
  },
  "BPM": {
    definition: "Battements Par Minute, unité de mesure du tempo."
  },
  "mesure": {
    definition: "Unité rythmique contenant un certain nombre de temps, délimitée par des barres de mesure."

  },

  // Termes associés
  "agogique": {
    definition: "Nuances subtiles de tempo non indiquées explicitement mais utilisées pour exprimer la musique."
  },
  "alla breve": {
    definition: "Mesure en deux temps rapides (2/2), équivalente à couper la mesure en deux par rapport à 4/4."
  },
  "lent": {
    definition: "Indication générale pour jouer lentement."
  },
  "vif": {
    definition: "Rapide et plein d’énergie."
  },
  "vivace": {
    definition: "Très rapide et enjoué, plus rapide qu’allegro."
  },
  "tempo grave": {
    definition: "Très lent et sérieux, avec un caractère solennel."

  },

  // Styles rythmiques
  "syncope": {
    definition: "Déplacement de l’accent rythmique sur un temps faible ou entre les temps."
  },
  "contretemps": {
    definition: "Note jouée en dehors des temps forts, accentuant les temps faibles."
  },
  "swing": {
    definition: "Style rythmique jazz caractérisé par une inégalité régulière des notes (temps faible légèrement retardé)."
  },
  "shuffle": {
    definition: "Rythme basé sur des triolets où la première et la troisième note sont jouées, donnant un effet de balancement."
  },
  "pointé": {
    definition: "Rythme utilisant des notes pointées, allongeant la durée d’une note de moitié (ex. : noire pointée suivie d’une croche)."
  },
  // Accords et intervalles
  "accord": {
    definition: "Ensemble de plusieurs sons joués simultanément."
  },
  "accord parfait": {
    definition: "Accord composé d’une fondamentale, d’une tierce majeure ou mineure, et d’une quinte juste."
  },
  "arpège": {
    definition: "Accord dont les notes sont jouées successivement au lieu d’être simultanées."
  },
  "consonance": {
    definition: "Association de sons produisant une impression de stabilité ou d’harmonie."
  },
  "dissonance": {
    definition: "Association de sons produisant une tension ou un effet de déséquilibre sonore."
  },
  "intervalle": {
    definition: "Distance entre deux hauteurs (notes) en musique."
  },
  "renversement": {
    definition: "Disposition d’un accord où une autre note que la fondamentale est à la basse."
  },
  "tierce": {
    definition: "Intervalle de trois degrés entre deux notes (tierce majeure ou mineure)."
  },
  "quinte": {
    definition: "Intervalle de cinq degrés, souvent utilisé comme fondement d’accords."

  },

  // Fonctions harmoniques
  "cadence": {
    definition: "Enchaînement d'accords marquant la fin ou une pause dans une phrase musicale."
  },
  "dominante": {
    definition: "Cinquième degré de la gamme, avec une forte tendance à se résoudre sur la tonique."
  },
  "sous-dominante": {
    definition: "Quatrième degré de la gamme, souvent utilisée pour préparer la dominante."
  },
  "tonique": {
    definition: "Note principale ou centre tonal autour duquel s’organise l’harmonie."
  },
  "modulation": {
    definition: "Changement de tonalité au cours d’un morceau."
  },
  "pivot": {
    definition: "Accord ou note commune à deux tonalités, utilisé pour moduler."
  },
  "résolution": {
    definition: "Passage d’un accord dissonant vers un accord consonant, établissant un repos harmonique."

  },

  // Types d'accords
  "accord de septième": {
    definition: "Accord comprenant une septième en plus de la triade (fondamentale, tierce, quinte)."
  },
  "accord diminué": {
    definition: "Accord avec une tierce mineure et une quinte diminuée, créant une forte tension."
  },
  "accord augmenté": {
    definition: "Accord avec une tierce majeure et une quinte augmentée, produisant une sonorité instable."
  },
  "accord suspendu": {
    definition: "Accord où la tierce est remplacée par une seconde ou une quarte, créant une suspension."
  },
  "accord de neuvième": {
    definition: "Accord de septième auquel on ajoute une neuvième (majeure ou mineure)."
  },
  "accord de sixte": {
    definition: "Accord où une sixte remplace ou complète la quinte, ou une note à la sixte de la basse."

  },

  // Progressions
  "cycle des quintes": {
    definition: "Ordre des tonalités majeures ou mineures séparées par des intervalles de quinte."
  },
  "progression": {
    definition: "Suite d’accords liée par des relations harmoniques logiques ou stylistiques."
  },
  "mouvement harmonique": {
    definition: "Évolution ou changement des accords dans le temps."
  },
  "enchaînement": {
    definition: "Passage d’un accord à un autre, selon des règles harmoniques établies."

  },

  // Techniques
  "contrepoint": {
    definition: "Technique d’écriture combinant plusieurs lignes mélodiques indépendantes."
  },
  "harmonisation": {
    definition: "Ajout d’accords à une mélodie pour créer une texture harmonique."
  },
  "voicing": {
    definition: "Disposition des notes d’un accord entre les différentes voix ou instruments."
  },
  "doublure": {
    definition: "Répétition d’une même note ou mélodie à l’unisson ou à l’octave dans une autre voix."
  },
  "pédale": {
    definition: "Note tenue ou répétée pendant que les accords changent autour d’elle."

  },

  // Concepts avancés
  "harmonie modale": {
    definition: "Utilisation des modes (dorien, phrygien, etc.) comme base harmonique au lieu des gammes majeures ou mineures."
  },
  "polytonalité": {
    definition: "Superposition de deux ou plusieurs tonalités différentes jouées simultanément."
  },
  "cluster": {
    definition: "Accord composé de notes très proches (souvent à demi-tons) créant une forte dissonance."
  },
  "quartal": {
    definition: "Harmonie construite à partir d’intervalles de quarte."
  },
  "quintal": {
    definition: "Harmonie basée sur des intervalles de quinte."
  },
  // Formations vocales
  "solo vocal": {
    definition: "Performance d’un seul chanteur sans accompagnement vocal d’autres personnes."
  },
  "duo vocal": {
    definition: "Ensemble de deux chanteurs interprétant une œuvre vocale ensemble."
  },
  "trio vocal": {
    definition: "Ensemble de trois chanteurs chantant simultanément ou en alternance."
  },
  "quatuor vocal": {
    definition: "Groupe de quatre chanteurs, souvent avec une répartition typique des voix (soprano, alto, ténor, basse)."
  },
  "chœur": {
    definition: "Groupe de chanteurs interprétant ensemble une œuvre polyphonique."
  },
  "chœur mixte": {
    definition: "Chœur composé de voix masculines et féminines (soprano, alto, ténor, basse)."
  },
  "chœur d'hommes": {
    definition: "Chœur composé exclusivement de voix masculines (ténors, barytons, basses)."
  },
  "chœur de femmes": {
    definition: "Chœur composé uniquement de voix féminines (sopranos, mezzo-sopranos, altos)."
  },
  "chœur d'enfants": {
    definition: "Chœur composé d’enfants, généralement avec des voix aiguës et claires."

  },

  // Formations instrumentales
  "solo instrumental": {
    definition: "Performance d’un seul instrumentiste jouant seul ou avec accompagnement."
  },
  "duo instrumental": {
    definition: "Ensemble de deux instrumentistes."
  },
  "trio instrumental": {
    definition: "Ensemble de trois instrumentistes jouant une œuvre de musique de chambre."
  },
  "quatuor instrumental": {
    definition: "Groupe de quatre musiciens, souvent à cordes (2 violons, 1 alto, 1 violoncelle)."
  },
  "quintette": {
    definition: "Ensemble de cinq musiciens, pouvant varier selon les instruments (vents, cordes, etc.)."
  },
  "ensemble": {
    definition: "Petit groupe d’instrumentistes jouant ensemble, sans effectif fixe."
  },
  "orchestre": {
    definition: "Grand groupe instrumental, souvent composé de cordes, bois, cuivres et percussions."
  },
  "orchestre symphonique": {
    definition: "Orchestre de grande taille interprétant des œuvres symphoniques, avec toutes les familles d’instruments."
  },
  "orchestre de chambre": {
    definition: "Orchestre plus réduit que le symphonique, souvent utilisé pour la musique de chambre."

  },

  // Formations mixtes
  "voix et instrument": {
    definition: "Association d’une ou plusieurs voix avec un ou plusieurs instruments (ex. : chant et piano)."
  },
  "voix et ensemble": {
    definition: "Voix ou groupe vocal accompagné par un petit ensemble instrumental."
  },
  "voix et orchestre": {
    definition: "Voix ou chœur accompagné par un orchestre complet."
  },
  "chœur et orchestre": {
    definition: "Formation réunissant un chœur et un orchestre, souvent pour des œuvres oratorios, cantates ou messes."
  },
            
                "latin": {
                  "definition": "Langue indo-européenne de l'Antiquité parlée à Rome et en Italie, à l'origine des langues romanes modernes et utilisée longtemps comme langue savante en Europe."
                },
                "grec": {
                  "definition": "Langue indo-européenne parlée en Grèce antique, connue pour ses grands textes littéraires, philosophiques et scientifiques en grec ancien, ancêtre du grec moderne."
                },              
                "langues créoles": {
                  "definition": "Langues nées du contact entre plusieurs langues, devenues langues maternelles, souvent issues de situations coloniales, comme le créole haïtien ou le créole réunionnais."
                },
                "langues pidgin": {
                  "definition": "Langues simplifiées créées pour permettre la communication entre groupes ne partageant pas de langue commune, généralement utilisées comme langues secondaires."
                },
                "langues signées": {
                  "definition": "Langues naturelles utilisant les gestes, expressions faciales et mouvements des mains pour communiquer, comme la langue des signes française (LSF) ou l'American Sign Language (ASL)."
                },
                "langues construites": {
                  "definition": "Langues inventées volontairement par des individus ou des groupes pour des buts spécifiques (communication universelle, œuvres de fiction ou musicales), comme l'espéranto, le Sindarin (langue des Elfes de la Terre du Milieu) ou le Kobaïen du groupe Magma."
                },              
                "langues aborigènes": {
                  "definition": "Ensemble de centaines de langues parlées traditionnellement par les peuples aborigènes d'Australie, souvent très variées et appartenant à plusieurs familles distinctes comme le pama-nyungan."
                },              
                "langues amérindiennes": {
                  "definition": "Ensemble très diversifié de langues parlées par les peuples autochtones des Amériques, comme le quechua, le nahuatl, le guarani et le navajo."
                },
            "langue coréenne": {
              "definition": "Langue parlée en Corée du Sud et du Nord, utilisant l'alphabet hangul, considérée comme une langue isolée sans parenté clairement établie avec d'autres familles linguistiques."
            },
            "langue japonaise": {
             "definition": "Langue isolée parlée au Japon, utilisant trois systèmes d'écriture (hiragana, katakana, kanji) et n'ayant pas de lien direct confirmé avec d'autres familles linguistiques."
                },
            "langues sino-tibétaines": {
              "definition": "Grande famille linguistique d'Asie regroupant le chinois (mandarin, cantonais), le tibétain et le birman."
            },
            "langues dravidiennes": {
              "definition": "Famille de langues du sud de l'Inde et du Sri Lanka, comprenant le tamoul, le télougou, le kannada et le malayalam."
            },
            "langues ouraliennes": {
              "definition": "Famille de langues d'Europe du Nord et de Sibérie, dont le finnois, l'estonien et le hongrois sont les principales représentantes."
            },
            "langues altaïques": {
              "definition": "Groupe hypothétique rassemblant les langues turques, mongoles et toungouses d'Asie centrale et orientale."
            },
            "langues austroasiatiques": {
              "definition": "Famille de langues d'Asie du Sud-Est comprenant le vietnamien, le khmer (cambodgien) et plusieurs langues tribales."
            },
            "langues austronésiennes": {
              "definition": "Grande famille de langues parlées des îles du Pacifique jusqu'à Madagascar, incluant le malais, le tagalog et le maori."
            },          
        "langues afro-asiatiques": {
          "definition": "Famille de langues parlées principalement en Afrique du Nord et au Moyen-Orient, incluant l'arabe, le berbère, et le haoussa."
        },
        "langues nilo-sahariennes": {
          "definition": "Groupe hypothétique de langues parlées autour du Nil et du Sahara central, comprenant le dinka, le kanuri et d'autres langues minoritaires."
        },
        "langues nigéro-congolaises": {
          "definition": "La plus grande famille de langues africaines en nombre de langues, comprenant le swahili, le yoruba et le zoulou."
        },
        "langues khoïsan": {
          "definition": "Groupe de langues d'Afrique australe caractérisées par l'utilisation de clics, parlées par les peuples khoïkhoïs et sans."
        },
        "langues oubanguiennes": {
          "definition": "Sous-groupe de langues nigéro-congolaises parlées principalement en République centrafricaine et ses alentours, incluant le sango."
        },
        "langues mandé": {
          "definition": "Sous-famille de langues nigéro-congolaises parlée en Afrique de l'Ouest, incluant le bambara, le malinké et le soninké."
        },      
        "langues germaniques": {
          "definition": "Groupe de langues indo-européennes apparu en Europe du Nord, comprenant l'anglais, l'allemand, le néerlandais et les langues scandinaves."
        },
        "langues romanes": {
          "definition": "Groupe de langues issues du latin vulgaire de l'Empire romain, incluant le français, l'espagnol, l'italien, le portugais et le roumain."
        },
        "langues slaves": {
          "definition": "Famille de langues indo-européennes parlées en Europe de l'Est et du Nord, comme le russe, le polonais, le tchèque et le serbe."
        },
        "langues finno-ougriennes": {
          "definition": "Groupe de langues non indo-européennes d'Europe du Nord et de l'Oural, comprenant le finnois, l'estonien et le hongrois."
        },
        "langues celtiques": {
          "definition": "Anciennes langues indo-européennes parlées historiquement en Europe de l'Ouest, dont le breton, le gaélique irlandais et le gallois."
        },
        "langue basque": {
          "definition": "Langue isolée, sans lien connu avec d'autres familles, parlée au Pays basque entre la France et l'Espagne."
        },
  "langues polynésiennes": {
    "definition": "Groupe de langues austronésiennes parlées dans le triangle polynésien (Hawaï, Île de Pâques, Nouvelle-Zélande), incluant le maori, le tahitien et le samoan, caractérisées par une structure phonologique simple et une forte intercompréhension."
  },
  "langues mélanésiennes": {
    "definition": "Langues austronésiennes et papoues parlées en Mélanésie (Nouvelle-Guinée, Fidji, Vanuatu, etc.), très diverses, comme le tok pisin ou le bislama, souvent influencées par des contacts coloniaux et des langues pidgins."
  },
  "langues quechua": {
    "definition": "Famille de langues indigènes d’Amérique du Sud, principalement parlées dans les Andes (Pérou, Bolivie, Équateur), avec le quechua cuzqueño comme variante notable, issues de l’héritage inca et encore parlées par des millions de locuteurs."
  },
  "langues mayas": {
    "definition": "Groupe de langues indigènes mésoaméricaines parlées au Mexique et en Amérique centrale (Guatemala, Belize), incluant le yucatèque, le k’iche’ ou le tzotzil, avec une riche tradition écrite remontant à la civilisation maya."
  },
  "langues tupi-guarani": {
    "definition": "Famille de langues indigènes d’Amérique du Sud, principalement au Brésil, au Paraguay et en Bolivie, incluant le guarani, langue officielle du Paraguay, et le tupi, autrefois dominant dans la région amazonienne."
  },
  "esperanto": {
    "definition": "Langue construite créée en 1887 par L.L. Zamenhof pour faciliter la communication internationale, avec une grammaire régulière et un vocabulaire dérivé de langues européennes, parlée par une communauté mondiale estimée à plusieurs milliers de locuteurs."
  },
        "musique occidentale de tradition écrite": {
            "definition": "Style musical savant européen caractérisé par son système de notation et son évolution historique à travers les périodes stylistiques majeures."
        },
        "musique du Moyen-Age": {
            "definition": "Style (Ve-XVe siècles) marqué par le chant grégorien, l'organum, les troubadours et l'émergence de la polyphonie. Instruments typiques : vièle, harpe, flûte à bec."
        },
        "musique de la Renaissance": {
            "definition": "Style (XVe-XVIe siècles) caractérisé par la polyphonie vocale complexe et le développement des instruments comme le luth et le clavecin."
        },
        "style baroque": {
            "definition": "Style (1600-1750) marqué par la basse continue, l'opéra, les formes concertantes et les grands maîtres comme Bach et Haendel."
        },
        "style classique": {
            "definition": "Style (1750-1800) caractérisé par la clarté formelle, l'équilibre et les compositeurs comme Mozart et Haydn."
        },
        "style romantique": {
            "definition": "Style (1800-1900) privilégiant l'expression des émotions, les formes libres et les grands virtuoses comme Chopin et Liszt."
        },
        "musique moderne": {
            "definition": "Style (début XXe siècle) marqué par la rupture avec le système tonal et l'émergence de nouvelles techniques compositionnelles."
        },
        "musique contemporaine": {
            "definition": "Style actuel (après 1945) explorant des approches innovantes comme la musique concrète ou minimaliste."
        },

    
            "musiques traditionnelles / folk": {
                "definition": "Style musical transmis oralement, propre à une culture ou région, utilisant souvent des instruments locaux caractéristiques."
            },
            "musique celtique": {
                "definition": "Style musical des pays celtes utilisant harpe, cornemuse et violon, avec des mélodies caractéristiques."
            },
            "flamenco": {
                "definition": "Style andalou associant chant passionné, danse expressive et guitare rythmique."
            },
            "fado": {
                "definition": "Style chanté portugais exprimant la nostalgie, accompagné de la guitare portugaise."
            },
            "gnawa": {
                "definition": "Style marocain aux rythmes hypnotiques, mêlant traditions africaines et soufies."
            },
            "blues traditionnel": {
                "definition": "Style afro-américain né dans le Delta du Mississippi, basé sur des structures simples et une expressivité vocale intense."
            },
            "musique africaine": {
                "definition": "Style diversifié caractérisé par des polyphonies et des polyrythmies complexes."
            },
        
                "musiques populaires modernes": {
                    "definition": "Styles musicaux apparus principalement au XXe siècle, caractérisé par :\n1. Une large diffusion médiatique (radio, disques, streaming)\n2. Une production souvent industrielle\n3. Une forte association avec la culture de masse\n4. L'utilisation d'instruments amplifiés/électroniques\n\nPrincipales caractéristiques :\n- Structures souvent simples et répétitives\n- Importance du rythme et de la mélodie\n- Forte connexion avec les mouvements sociaux et générationnels\n- Évolution rapide influencée par la technologie."
                },
                "jazz": {
                    "definition": "Style musical né aux États-Unis combinant improvisation, syncopes et harmonies sophistiquées."
                },
                "rock": {
                    "definition": "Style apparu dans les années 1950 centré sur les guitares électriques et une énergie rythmique puissante."
                },
                "reggae": {
                    "definition": "Style jamaïcain au tempo modéré, marqué par l'accentuation du contretemps et des textes engagés."
                },
                "rap": {
                    "definition": "Style vocal parlé-rythmé, utilisant à l'origine des samples en boucle comme accompagnement, élément central de la culture hip-hop."
                },
                "musiques du monde": {
        "definition": "Catégorie regroupant les traditions musicales non-occidentales et les fusions interculturelles, caractérisées par : une transmission souvent orale ou maître-élève, l'utilisation d'instruments traditionnels spécifiques, des systèmes musicaux différents de la théorie occidentale (échelles, rythmes), des fonctions sociales/cérémonielles importantes."
},
                    "samba": {
                        "definition": "Style brésilien énergique associé au carnaval, basé sur des percussions complexes."
                    },
                    "raga": {
                        "definition": "Style mélodique de la musique indienne lié à des moments précis et des émotions spécifiques."
                    },
                    "musique arabo-andalouse": {
                        "definition": "Style résultant d'un métissage entre musique arabe venue de l'Orient, musique afro-berbère du Maghreb et musique pratiquée dans la Péninsule Ibérique avant le VIIIe siècle, utilisant des modes spécifiques."
                    },
                    "chants pygmées": {
                        "definition": "Style vocal africain caractérisé par des polyphonies complexes et l'utilisation du yodel."
                    },
                    "musiques rituelles ou spirituelles": {
        "definition": "Pratiques musicales sacrées ou cérémonielles remplissant une fonction médiatrice entre le profane et le sacré. Elles ont pour vocation d'établir une communication avec les entités spirituelles (invocations, prières chantées), de faciliter les transitions ritualisées (rites de passage, cycles calendaires), de transmettre des connaissances religieuses par la mise en musique des textes sacrés, d'induire des états de conscience modifiés (transe, extase, méditation)."
},
                        "chamanisme": {
                            "definition": "Style musical utilisé dans les pratiques spirituelles pour induire des états de transe."
                        },
                        "gospel": {
                            "definition": "Style religieux afro-américain marqué par son intensité émotionnelle et ses harmonies vocales riches."
                        },
                        "qawwali": {
                            "definition": "Style soufi visant à provoquer l'extase mystique par la répétition rythmique et mélodique."
                        },
                            "musique de tradition orale": {
                                "definition": "Style transmis sans support écrit, par imitation et mémoire collective."
                            },
                            "musique de tradition écrite": {
                                "definition": "Pratique musicale fondée sur un système de notation précis permettant la fixation et la transmission des œuvres."},
                            "musique savante": {
                                "definition": "Style composé et noté, relevant d'une démarche artistique élaborée."
                            },
                                "musique populaire": {
                                  "definition": "Musique transmise principalement par voie orale au sein d'une communauté, associée à des pratiques collectives et quotidiennes, se distinguant de la musique savante par son mode de transmission et son ancrage dans une culture."
                                },
                                "cas hybrides": {
                                  "definition": "Pratiques musicales combinant des éléments de transmission orale et écrite, créant un continuum entre culture savante et populaire. Ces formes émergent lorsque des traditions orales sont notées, lorsque des musiques écrites intègrent des pratiques improvisées, ou lorsque des musiciens formés à l'écrit revisitent des répertoires traditionnels. Exemples typiques : le jazz (improvisation orale sur structures harmoniques écrites), le flamenco (phrases mélodiques transmises oralement mais styles codifiés par écrit), ou certaines musiques baroques (partitions écrites avec ornementation improvisée)."
                                },
    // Cordes frottées
    "violon": {
        definition: "Instrument à cordes frottées, le plus petit et aigu de sa famille. Joué avec un archet ou en pizzicato.",
        image: "images/violon.jpg",
        audio: "audio/violon.mp3"
    },
    "violon alto": {
        definition: "Instrument à cordes frottées, légèrement plus grand que le violon, avec un son plus chaud et grave.",
        image: "images/alto.jpg",
        audio: "audio/alto.mp3"
    },
    "violoncelle": {
        definition: "Instrument à cordes frottées joué assis, tenu entre les jambes. Tessiture entre l'alto et la contrebasse.",
        image: "images/violoncelle.jpg",
        audio: "audio/violoncelle.mp3"
    },
    "contrebasse": {
        definition: "Le plus grand et le plus grave des instruments à cordes frottées, utilisé en classique et en jazz.",
        image: "images/contrebasse.jpg",
        audio: "audio/contrebasse.mp3"
    },
    "archet": {
        definition: "Baguette en bois avec crins de cheval tendus, utilisée pour frotter les cordes des instruments.",
        image: "images/archet.jpg",
        audio: "audio/archet.mp3"
    },

    // Cordes pincées
    "guitare": {
        definition: "Instrument à cordes pincées, avec caisse de résonance et manche fretté. Existe en versions classique, folk et électrique.",
        image: "images/guitare.jpg",
        audio: "audio/guitare.mp3"
    },
    "harpe": {
        definition: "Grand instrument à cordes pincées, joué verticalement. Utilisé en musique classique et celtique.",
        image: "images/harpe.jpg",
        audio: "audio/harpe.mp3"
    },
    "clavecin": {
        definition: "Instrument à clavier et cordes pincées, très utilisé à l'époque baroque.",
        image: "images/clavecin.jpg",
        audio: "audio/clavecin.mp3"
    },
    "guitare électrique": {
        definition: "Guitare sans caisse de résonance, nécessitant un amplificateur. Utilisée en rock, blues et jazz.",
        image: "images/guitare-electrique.jpg",
        audio: "audio/guitare-electrique.mp3"
    },
    "basse électrique": {
        definition: "Version grave de la guitare électrique, souvent à 4 cordes. Essentielle dans les groupes modernes.",
        image: "images/basse-electrique.jpg",
        audio: "audio/basse-electrique.mp3"
    },

    // Cordes frappées
    "piano": {
        definition: "Instrument à clavier où les cordes sont frappées par des marteaux. Existe en versions acoustique et numérique.",
        image: "images/piano.jpg",
        audio: "audio/piano.mp3"
    },

    // Bois
    "flûte traversière": {
        definition: "Instrument à vent en métal (originellement en bois), sans anche. Son clair et brillant.",
        image: "images/flute-traversiere.jpg",
        audio: "audio/flute-traversiere.mp3"
    },
    "flûte à bec": {
        definition: "Petite flûte droite avec un bec, souvent utilisée pour l'apprentissage musical.",
        image: "images/flute-a-bec.jpg",
        audio: "audio/flute-a-bec.mp3"
    },
    "clarinette": {
        definition: "Instrument à anche simple, au son chaud et expressif. Utilisée en classique et jazz.",
        image: "images/clarinette.jpg",
        audio: "audio/clarinette.mp3"
    },
    "cor de basset": {
        definition: "Variété de clarinette alto, plus grave, utilisée notamment par Mozart.",
        image: "images/cor-de-basset.jpg",
        audio: "audio/cor-de-basset.mp3"
    },
    "saxophone": {
        definition: "Instrument en métal à anche simple, inventé par Adolphe Sax. Très présent en jazz.",
        image: "images/saxophone.jpg",
        audio: "audio/saxophone.mp3"
    },

    // Cuivres
    "trompette": {
        definition: "Instrument à vent aigu, à pistons. Son brillant et puissant.",
        image: "images/trompette.jpg",
        audio: "audio/trompette.mp3"
    },
    "cor": {
        definition: "Instrument à vent avec large pavillon, son chaud et rond. Utilisé en orchestre.",
        image: "images/cor.jpg",
        audio: "audio/cor.mp3"
    },
    "trombone": {
        definition: "Instrument à coulisse, permettant des glissandos. Son puissant et noble.",
        image: "images/trombone.jpg",
        audio: "audio/trombone.mp3"
    },
    "tuba": {
        definition: "Le plus grave des cuivres, avec un son profond et rond.",
        image: "images/tuba.jpg",
        audio: "audio/tuba.mp3"
    },

    // Percussions (catégories générales)
    "percussions": {
        definition: "Famille d'instruments dont le son est produit en frappant, secouant ou grattant.",
        image: "images/percussions.jpg",
        audio: "audio/percussions.mp3"
    },
    "percussions à peau": {
        definition: "Percussions dont le son est produit par la vibration d'une membrane tendue.",
        image: "images/percussions-peau.jpg",
        audio: "audio/percussions-peau.mp3"
    },
    "percussions en bois": {
        definition: "Percussions faites en bois.",
        image: "images/percussions-bois.jpg",
        audio: "audio/percussions-bois.mp3"
    },
    "percussions métalliques": {
        definition: "Percussions faites en métal, comme les cymbales ou le triangle.",
        image: "images/percussions-metal.jpg",
        audio: "audio/percussions-metal.mp3"
    },

    // Percussions à hauteur indéterminée

    "afuche cabasa": {
      definition: "Percussion latine/africaine à perles métalliques frottées, produisant un grésillement rythmé. Son métallique continu, idéal pour les grooves. Populaire en salsa, bossa et musiques actuelles.",
      video: "videos/afuche cabasa.mp4"
    },

    "batterie": {
        definition: "Ensemble de percussions (toms, cymbales, grosse caisse) joué avec des baguettes.",
        image: "images/batterie.jpg",
        audio: "audio/batterie.mp3"
    },
    "caisse claire": {
        definition: "Tambour avec timbre (fil métallique vibrant), utilisé en orchestre et batterie.",
        image: "images/caisse-claire.jpg",
        audio: "audio/caisse-claire.mp3"
    },
    "grosse caisse": {
        definition: "Tambour très grave, utilisé pour marquer les temps forts.",
        image: "images/grosse-caisse.jpg",
        audio: "audio/grosse-caisse.mp3"
    },
    "tom": {
        definition: "Tambour sans timbre, de différentes tailles, composant de la batterie.",
        image: "images/tom.jpg",
        audio: "audio/tom.mp3"
    },
    "cymbales": {
        definition: "Disques métalliques frappés ou entrechoqués pour produire un son vibrant.",
        image: "images/cymbales.jpg",
        audio: "audio/cymbales.mp3"
    },
    "charlestone": {
        definition: "Paire de cymbales actionnée par une pédale, composant de la batterie.",
        image: "images/charlestone.jpg",
        audio: "audio/charlestone.mp3"
    },
    "tambourin": {
        definition: "Petit cadre avec des cymbalettes ou une peau, secoué ou frappé.",
        image: "images/tambourin.jpg",
        audio: "audio/tambourin.mp3"
    },
    "triangle": {
        definition: "Tige métallique en forme de triangle, frappée avec une baguette.",
        image: "images/triangle.jpg",
        audio: "audio/triangle.mp3"
    },
    "woodblock": {
        definition: "Bloc de bois creux frappé avec une baguette, son sec et percussif.",
        image: "images/woodblock.jpg",
        audio: "audio/woodblock.mp3"
    },
    "claves": {
        definition: "Bâtons de bois dur entrechoqués pour produire un son claquant.",
        image: "images/claves.jpg",
        audio: "audio/claves.mp3"
    },
    "guiro": {
        definition: "Instrument à rainures frottées avec une baguette, son gratté caractéristique.",
        image: "images/guiro.jpg",
        audio: "audio/guiro.mp3"
    },
    "congas": {
        definition: "Tambours cubains hauts et étroits, joués à mains nues.",
        image: "images/congas.jpg",
        audio: "audio/congas.mp3"
    },
    "bongos": {
        definition: "Petits tambours jumelés, d'origine cubaine, joués avec les doigts.",
        image: "images/bongos.jpg",
        audio: "audio/bongos.mp3"
    },
    "djembe": {
        definition: "Tambour africain en forme de calice, joué à mains nues.",
        image: "images/djembe.jpg",
        audio: "audio/djembe.mp3"
    },
    "timbales latines": {
        definition: "Petits tambours à peau fine, utilisés dans la musique latine.",
        image: "images/timbales-latines.jpg",
        audio: "audio/timbales-latines.mp3"
    },
    "shaker": {
        definition: "Petit instrument secoué, rempli de granulés pour produire un son continu.",
        image: "images/shaker.jpg",
        audio: "audio/shaker.mp3"
    },
    "maracas": {
        definition: "Instrument de percussion secoué, constitué d'une sphère creuse remplie de graines.",
        image: "images/maracas.jpg",
        audio: "audio/maracas.mp3"
    },
    "tambour de basque": {
        definition: "Cadre circulaire avec une peau et des cymbalettes, joué en le secouant ou en frappant la peau.",
        image: "images/tambour-basque.jpg",
        audio: "audio/tambour-basque.mp3"
    },
    
    "tam-tam": {
        definition: "Grand disque métallique suspendu, sans note définie, produisant un son complexe et étalé.",
        image: "images/tam-tam.jpg",
        audio: "audio/tam-tam.mp3"
    },

    // Percussions à hauteur déterminée
    "timbales": {
        definition: "Tambours accordables, utilisés en orchestre pour des notes précises.",
        image: "images/timbales.jpg",
        audio: "audio/timbales.mp3"
    },
    "xylophone": {
        definition: "Instrument à lames de bois frappées, son sec et clair.",
        image: "images/xylophone.jpg",
        audio: "audio/xylophone.mp3"
    },
    "marimba": {
        definition: "Cousin grave du xylophone, avec des lames en bois et des résonateurs.",
        image: "images/marimba.jpg",
        audio: "audio/marimba.mp3"
    },
    "vibraphone": {
        definition: "Instrument à lames métalliques avec motorisation pour un effet vibrato.",
        image: "images/vibraphone.jpg",
        audio: "audio/vibraphone.mp3"
    },
    "glockenspiel": {
        definition: "Petit instrument à lames métalliques, son cristallin et aigu.",
        image: "images/glockenspiel.jpg",
        audio: "audio/glockenspiel.mp3"
    },
    "cloches tubulaires": {
        definition: "Série de tubes métalliques accordés, frappés avec un maillet.",
        image: "images/cloches-tubulaires.jpg",
        audio: "audio/cloches-tubulaires.mp3"
    },
    "célesta": {
        definition: "Instrument à clavier et lames métalliques, son proche du carillon.",
        image: "images/celesta.jpg",
        audio: "audio/celesta.mp3"
    },
    "gong": {
        definition: "Grand disque métallique suspendu, frappé pour produire un son à hauteur déterminé profond et résonnant.",
        image: "images/gong.jpg",
        audio: "audio/gong.mp3"
    },

    // Catégories générales (vents)
    "bois": {
        definition: "Famille d'instruments à vent traditionnellement en bois (flûtes, clarinettes, etc.).",
        image: "images/bois.jpg",
        audio: "audio/bois.mp3"
    },
    "cuivres": {
        definition: "Famille d'instruments à vent en métal, où le son est produit par la vibration des lèvres (trompette, trombone, etc.).",
        image: "images/cuivres.jpg",
        audio: "audio/cuivres.mp3"
    },

    "soprano colorature": {
        definition: "Type de soprano avec un large ambitus et une grande agilité vocale.",
        audio: "audio/soprano-colorature.mp3"  // Chemin du fichier audio
    },
    "soprano": {
        definition: "Registre le plus aigu des voix féminines.",
        image: "images/soprano.jpg", // Chemin de l'image
        audio: "audio/soprano.mp3"  // Chemin du fichier audio
    },
    "mezzo-soprano": {
        definition: "Registre moyen des voix féminines.",
        image: "images/mezzo-soprano.jpg", // Chemin de l'image
        audio: "audio/mezzo-soprano.mp3"  // Chemin du fichier audio
    },
    "alto": {
        definition: "Registre le plus grave des voix féminines, dans le cadre d'une ensemble vocal."
        // Pas d'image ni d'audio pour cette définition
    },
    "contralto": {
        definition: "Registre le plus grave des voix féminines solistes."
        // Pas d'image ni d'audio pour cette définition
    },
    "haute-contre": {
        definition: "Ténor qui utilise sa voix de tête pour certains aigus ou ténor léger.",
        audio: "audio/contretenor.mp3"  // Chemin du fichier audio
    },
    "contreténor": {
        definition: "Chanteur utilisant sa voix de tête, produisant une tessiture similaire à celle d'une soprano.",
        image: "images/contretenor.jpg", // Chemin de l'image
        audio: "audio/contretenor.mp3"  // Chemin du fichier audio
    },
    "ténor": {
        definition: "Registre le plus aigu des voix masculines.",
        image: "images/tenor.jpg", // Chemin de l'image
        audio: "audio/tenor.mp3"  // Chemin du fichier audio
    },
    "baryton": {
        definition: "Registre moyen des voix masculines.",
        image: "images/baryton.jpg", // Chemin de l'image
        audio: "audio/baryton.mp3"  // Chemin du fichier audio
    },
    "basse": {
        definition: "Registre le plus grave des voix masculines.",
    },
    "basse profonde": {
        definition: "Basse avec une tessiture très grave, capable de produire des sons très bas.",
        audio: "audio/basse-profonde.mp3"  // Chemin du fichier audio
    },
    "aigu": {
        definition: "Un registre vocal élevé, souvent utilisé pour désigner des sons de haute fréquence, comme ceux produits par un soprano."
        // Pas d'image ni d'audio pour cette définition
    },
    "médium": {
        definition: "Le registre vocal intermédiaire, ni trop aigu, ni trop grave. Il est souvent utilisé par des voix comme les mezzo-sopranos."
        // Pas d'image ni d'audio pour cette définition
    },
    "grave": {
        definition: "Un registre vocal grave, souvent utilisé par des voix de basse ou des voix masculines plus profondes."
        // Pas d'image ni d'audio pour cette définition
    },
    "ambitus": {
        definition: "Étendue des notes qu'un chanteur peut produire, du plus grave au plus aigu."
        // Pas d'image ni d'audio pour cette définition
    },
    "tessiture": {
        definition: "Étendue des notes qu'un chanteur peut produire confortablement, du plus grave au plus aigu."
        // Pas d'image ni d'audio pour cette définition
    },
    "registre": {
        definition: "Partie de tessiture d’une voix avec les mêmes caractéristiques sonores."
        // Pas d'image ni d'audio pour cette définition
    },
    "registre naturel": {
        definition: "Ou registre de poitrine, ou voix de poitrine, utilisé principalement par les hommes."
        // Pas d'image ni d'audio pour cette définition
    },
    "registre aigu": {
        definition: "Ou voix de fausset ou falsetto (utilisé par les contreténors), ou voix de tête (pour les voix féminines)."
        // Pas d'image ni d'audio pour cette définition
    },
    "voix mixte": {
        definition: "Registre intermédiaire, permet d’éviter la coupure entre les registres graves et aigus."
        // Pas d'image ni d'audio pour cette définition
    },
    "abdomen": {
        definition: "Partie inférieure du tronc, impliquée dans la respiration abdominale, technique importante pour le soutien vocal."
        // Pas d'image ni d'audio pour cette définition
    },
    "bronches": {
        definition: "Voies aériennes principales menant aux poumons."
        // Pas d'image ni d'audio pour cette définition
    },
    "cavités de résonance": {
        definition: "Espaces au-dessus du larynx, incluant la gorge et la bouche, qui sont utilisés pour la résonance vocale et modulent le son produit."
        // Pas d'image ni d'audio pour cette définition
    },
    "cordes vocales": {
        definition: "Muscles tendus dans le larynx qui vibrent pour produire des sons lorsqu'ils sont comprimées par l'air provenant des poumons.",
        image: "images/cordes-vocales.jpg", // Chemin de l'image
        audio: "audio/cordes-vocales.mp3"  // Chemin du fichier audio
    },
    "côtes": {
        definition: "Os qui protègent les organes vitaux dans la poitrine, dont le rôle est important dans la respiration."
        // Pas d'image ni d'audio pour cette définition
    },
    "diaphragme": {
        definition: "Muscle principal utilisé dans la respiration, situé sous les poumons, qui permet d'inhaler et d'exhaler et dont le contrôle est important dans le chant.",
        image: "images/diaphragme.jpg", // Chemin de l'image
        audio: "audio/diaphragme.mp3"  // Chemin du fichier audio
    },
    "résonateurs": {
        definition: "Cavités (bouche, gorge, nez, sinus) permettant l'amplification et la modulation des sons produits par les cordes vocales, donnant ainsi à la voix son timbre unique."
        // Pas d'image ni d'audio pour cette définition
    },
    "fosses nasales": {
        definition: "Passages dans le nez par lesquels l'air est inhalé avant de passer dans les poumons, et qui contribuent à la résonance du son vocal."
        // Pas d'image ni d'audio pour cette définition
    },
    "glotte": {
        definition: "Espace entre les cordes vocales dans le larynx, par lequel l'air passe pour produire des sons."
        // Pas d'image ni d'audio pour cette définition
    },
    "larynx": {
        definition: "Organe situé dans la gorge qui contient les cordes vocales. Il est crucial dans la production de la voix.",
        image: "images/larynx.jpg", // Chemin de l'image
        audio: "audio/larynx.mp3"  // Chemin du fichier audio
    },
    "oreille": {
        definition: "L'organe de l'audition qui permet de percevoir les sons et de maintenir un contrôle précis de la hauteur et de la justesse de la voix."
        // Pas d'image ni d'audio pour cette définition
    },
    "pharynx": {
        definition: "La zone derrière la bouche et le nez qui mène à l'œsophage et aux voies respiratoires. Il joue un rôle dans la résonance vocale."
        // Pas d'image ni d'audio pour cette définition
    },
    "poumons": {
        definition: "Organes responsables de l'échange de gaz (oxygène et dioxyde de carbone).",
        image: "images/poumons.jpg", // Chemin de l'image
        audio: "audio/poumons.mp3"  // Chemin du fichier audio
    },
    "physiologie": {
        definition: "La science qui étudie le fonctionnement des systèmes du corps humain, y compris la respiration et la production vocale."
        // Pas d'image ni d'audio pour cette définition
    },
    "sternum": {
        definition: "Os du thorax auquel les côtes sont attachées. Il protège le cœur et les poumons et est un point de référence pour la respiration."
        // Pas d'image ni d'audio pour cette définition
    },
    "thorax": {
        definition: "Partie du tronc qui contient les poumons et le cœur."
        // Pas d'image ni d'audio pour cette définition
    },
    "trachée": {
        definition: "Tube qui mène de la gorge aux poumons, permettant le passage de l'air pour la respiration et la production vocale."
        // Pas d'image ni d'audio pour cette définition
    },
    "voies aériennes": {
        definition: "Passages par lesquels l'air entre et sort des poumons, incluant la trachée et les bronches."
        // Pas d'image ni d'audio pour cette définition
    },
    "voile du palais": {
        definition: "Partie postérieure du palais qui peut être levée pour fermer ou ouvrir les cavités nasales, affectant la résonance du son."
        // Pas d'image ni d'audio pour cette définition
    },
    "a cappella": {
        definition: "Chanter sans accompagnement instrumental."
        // Pas d'image ni d'audio pour cette définition
    },
    "décomposition du son": {
        definition: "Façon dont un son vocal est formé par la vibration des cordes vocales et modulé par les cavités de résonance."
        // Pas d'image ni d'audio pour cette définition
    },
    "intonation": {
        definition: "Manière dont les variations de hauteur et de tonalité sont utilisées pour exprimer des émotions ou des significations."
        // Pas d'image ni d'audio pour cette définition
    },
    "mélisme": {
        definition: "Art de chanter plusieurs notes sur une seule syllabe, souvent utilisé dans les chants classiques et la musique religieuse."
        // Pas d'image ni d'audio pour cette définition
    },
    "onomatopées": {
        definition: "Mots qui imitent le son qu'ils représentent (buzz, clang...)."
        // Pas d'image ni d'audio pour cette définition
    },
    "phénomène vibratoire": {
        definition: "Processus par lequel les cordes vocales vibrent pour produire du son. La fréquence de cette vibration détermine la hauteur du son."
        // Pas d'image ni d'audio pour cette définition
    },
    "résonance": {
        definition: "Effet de modulation et d'amplification du son émis par les cordes vocales, produit par les résonateurs."
        // Pas d'image ni d'audio pour cette définition
    },
    "soutien": {
        definition: "Engagement de la respiration abdominale et du diaphragme pour maintenir la constance du son."
        // Pas d'image ni d'audio pour cette définition
    },
    "terminaison du son": {
        definition: "Manière dont un chanteur contrôle l'extinction d'une note ou d'une phrase musicale."
        // Pas d'image ni d'audio pour cette définition
    },
    "timbre": {
        definition: "Qualité ou 'couleur' de la voix, qui permet de la distinguer d'une autre, même si elles chantent la même note."
        // Pas d'image ni d'audio pour cette définition
    },
    "voile": {
        definition: "La partie postérieure du palais qui peut être levée pour fermer ou ouvrir les cavités nasales, affectant la résonance du son vocal."
        // Pas d'image ni d'audio pour cette définition
    },
    "attaque du son": {
        definition: "Moment et manière dont un chanteur initie un son ; cela peut influencer la qualité, la précision et le caractère de la voix. L'attaque du son peut être : \n- douce (ou légère) : les cordes vocales commencent à vibrer avant que l'air ne soit pleinement expulsé, ce qui produit un son fluide et doux ; souvent utilisé pour un effet plus délicat ou lyrique.\n- dure (ou coup de glotte) : les cordes vocales se ferment fermement avant de s'ouvrir brusquement sous la pression de l'air, produisant un son net et précis ; utile pour des effets dramatiques.\n- équilibrée : l'air et les cordes vocales se synchronisent de manière optimale pour un son clair et soutenu sans tension excessive."
        // Pas d'image ni d'audio pour cette définition
    },
    "vocalise": {
        definition: "Exercice vocal consistant à chanter des notes sur des voyelles sans paroles, utilisé pour échauffer la voix."
        // Pas d'image ni d'audio pour cette définition
    },
    "échauffement": {
        definition: "Exercices effectués pour préparer la voix."
        // Pas d'image ni d'audio pour cette définition
    },
    "gestion du souffle": {
        definition: "Maîtrise et optimisation de l'utilisation de l'air pendant l'émission vocale. Elle est essentielle pour produire un son stable, puissant et contrôlé, tout en évitant la fatigue vocale."
        // Pas d'image ni d'audio pour cette définition
    },
    "inspiration": {
        definition: "Processus de prise de l'air dans les poumons."
        // Pas d'image ni d'audio pour cette définition
    },
    "expiration": {
        definition: "Processus d'expulsion de l'air contenu dans les poumons."
        // Pas d'image ni d'audio pour cette définition
    },
    "physiologie": {
        definition: "Science qui étudie le fonctionnement des systèmes du corps humain, y compris la respiration et la production vocale."
        // Pas d'image ni d'audio pour cette définition
    },
    "forme à thèmes": {
        "definition": "Basée sur le développement et la variation de thèmes mélodiques."
    },
    "forme bipartite": {
        "definition": "Deux sections distinctes, souvent notées A et B."
    },
    "forme continue": {
        "definition": "Forme dans laquelle aucune section n'est clairement définie."
    },
    "forme ouverte": {
        "definition": "Sans section clairement délimitée, elle permet une grande liberté dans l'organisation des idées musicales et l'improvisation. Fréquente en musique contemporaine, où l'interprète ou le compositeur ont une grande marge de manœuvre."
    },
    "forme par argument": {
        "definition": "Basée sur le développement logique d'idées thématiques."
    },
    "forme strophique": {
        "definition": "Chaque strophe de texte est chantée sur la même mélodie."
    },
    "break": {
        "definition": "Section d'une composition où un instrument ou un groupe joue seul."
    },
    "cellule": {
        "definition": "Petit motif musical répété ou développé."
    },
    "citation": {
        "definition": "Extrait musical préexistant dans une nouvelle composition ; pour créer un effet de reconnaissance ou d’hommage."
    },
    "couplet": {
        "definition": "Section qui alterne avec le refrain."
    },
    "développement": {
        "definition": "Section où les thèmes sont transformés, combinés ou explorés."
    },
    "élément": {
        "definition": "Composant de base, comme une mélodie, un rythme, une harmonie ou un timbre."
    },
    "exposition": {
        "definition": "Première section, dans laquelle les thèmes principaux sont présentés."
    },
    "partie": {
        "definition": "Section souvent définie par son caractère ou sa fonction ; par exemple, les parties d’une chanson (couplet, refrain, pont)."
    },
    "phrase": {
        "definition": "Unité mélodique ou harmonique complète qui forme une idée musicale."
    },
    "refrain": {
        "definition": "Section répétée, avec les mêmes paroles et mélodie."
    },
    "strophe": {
        "definition": "Une section d’une chanson où les paroles changent, mais la musique reste la même."
    },
    "ABA": {
        "definition": "Forme musicale en trois parties : une première section (A), une section contrastée (B), puis un retour à la première section (A)."
    },
    "antienne": {
        "definition": "Court chant liturgique, souvent répété avant et après un psaume."
    },
    "cyclique": {
        "definition": "Forme où des thèmes ou motifs réapparaissent tout au long d'une œuvre, créant une unité."
    },
    "da capo": {
        "definition": "Indication pour répéter une section depuis le début (littéralement 'depuis le début')."
    },
    "fugue": {
        "definition": "Forme contrapuntique où un thème (sujet) est introduit puis repris par différentes voix ou instruments. Typique de la musique baroque."
    },
    "ground / chaconne / passacaille": {
        "definition": "Formes basées sur une basse répétée."
    },
    "marche": {
        "definition": "Composition au rythme régulier, souvent utilisée pour accompagner des défilés."
    },
    "petit rondo (ABA C ABA)": {
        "definition": "Variante du rondo."
    },
    "reprise": {
        "definition": "Retour d’une section musicale après une autre partie."
    },
    "rondeau": {
        "definition": "Forme avec alternance entre refrain et couplets ; en musique française instrumentale et vocale, des périodes médiévale à baroque."
    },
    "rondo": {
        "definition": "Comme le rondeau ; souvent utilisé pour les mouvements vifs et joyeux, dans la sonate et la symphonie comme pièce finale."
    },
    "thème et variations": {
        "definition": "Structure où le thème initial est suivi de plusieurs variations (mélodie, rythme, harmonie, etc.)."
    },
    "variation": {
        "definition": "Transformation de certains aspects d’un thème (mélodie, rythme, harmonie, texture, etc.), tout en gardant des éléments reconnaissables avec l’idée originale."
    },
    "basse obstinée": {
        "definition": "Ligne de basse répétée tout au long d'une composition, servant de fondation harmonique."
    },
    "boucle": {
        "definition": "Motif répété ; dans les musiques modernes."
    },
    "leitmotiv": {
        "definition": "Thème récurrent associé à un personnage, une idée ou une émotion dans une œuvre."
    },
    "motif": {
        "definition": "Court élément mélodique ou rythmique répété ou développé dans une composition."
    },
    "ostinato mélodique, rythmique ou mélodico-rythmique": {
        "definition": "Motif répété tout au long d'une composition."
    },
    "récurrence": {
        "definition": "Retour répété d’un élément musical (thème, motif, harmonie). Crée une cohésion dans une œuvre."
    },
    "répétition": {
        "definition": "Réutilisation d’une section ou d’un motif musical."
    },
    "sample": {
        "definition": "Extrait sonore préenregistré, réutilisé dans une nouvelle composition."
    },
    "sujet": {
        "definition": "Thème principal d'une œuvre contrapuntique, notamment d'une fugue."
    },
    "contraste": {
        "definition": "Élément opposé (dynamique, tempo, texture) pour créer de la variété."
    },
    "dialogue": {
        "definition": "Interaction musicale entre deux voix ou instruments, on parle souvent de 'question-réponse'."
    },
    "échelle": {
        "definition": "Série de notes ascendantes ou descendantes, souvent utilisée comme base pour une mélodie ou une improvisation."
    },
    "lamento": {
        "definition": "Pièce musicale exprimant la tristesse ou le deuil, souvent basée sur une basse descendante."
    },
    "mouvement": {
        "definition": "Section autonome d'une œuvre plus large, comme une symphonie ou une sonate."
    },
    "programme": {
        "definition": "Idée extra-musicale, poème ou histoire, qui sert de fil conducteur à une composition."
    },
    "réponse": {
        "definition": "Dans le cadre d'une fugue, la réponse est la version du sujet après qu'il ait été présenté une première fois. Elle est souvent transposée et modifiée pour s’adapter à la tonalité du passage. Souvent transposée à une quarte ou une quinte."
    },
    "rupture": {
        "definition": "Changement soudain ou marqué dans une œuvre musicale, au niveau du tempo, de la tonalité, de la texture ou du style."
    },
    "scherzo": {
        "definition": "Composition sans forme fixe, autonome ou mouvement d'une sonate, d'une symphonie, etc. ; caractère vif et brillant."
    },
    "ternaire (ABA)": {
        "definition": "Structure musicale en trois parties."
    },
    "canon": {
        "definition": "Forme contrapuntique où une mélodie est imitée par une ou plusieurs voix à intervalles réguliers."
    },
    "canzone": {
        "definition": "Souvent de style léger et mélodique."
    },
    "chaconne": {
        "definition": "Forme basée sur la répétition d'une progression harmonique ou d'un motif de basse."
    },
    "contre-sujet": {
        "definition": "Mélodie secondaire dans une fugue, jouée en contrepoint avec le sujet principal."
    },
    "contrepoint": {
        "definition": "Technique musicale où plusieurs mélodies indépendantes sont combinées harmonieusement."
    },
    "développement": {
        "definition": "Le développement est une section où le sujet et les contre-sujets sont transformés, fragmentés, combinés ou explorés de manière créative. Après l’exposition (où toutes les voix ont présenté le sujet et la réponse), le développement explore les possibilités du matériel thématique. Il peut inclure des modulations (changements de tonalité), des strettes (entrées rapprochées du sujet) ou des inversions (le sujet joué à l’envers) et prépare le retour à la tonalité principale pour la conclusion."
    },
    "fantaisie": {
        "definition": "Forme libre, souvent improvisée, sans structure prédéfinie."
    },
    "fugato": {
        "definition": "Passage d'une composition qui imite le style d'une fugue sans en être une."
    },
    "fuguette": {
        "definition": "Petite fugue, souvent moins complexe qu'une fugue complète."
    },
    "fughetta": {
        "definition": "Petite fugue, souvent moins développée qu'une fugue complète."
    },
    "imitation": {
        "definition": "Technique contrapuntique où une voix ou un instrument reprend un motif ou un thème (sujet) déjà exposé par une autre voix, souvent à un intervalle différent (généralement quarte ou quinte). Cela crée un dialogue entre les voix, tout en maintenant une cohésion thématique. L'imitation est dite réelle quand la transposition est exacte, tonale quand la réponse est légèrement modifiée pour rester dans la tonalité principale."
    },
    "motet": {
        "definition": "Composition vocale polyphonique a cappella, souvent religieuse."
    },
    "réponse / comes": {
        "definition": "Imitation du sujet dans une autre voix, souvent transposée."
    },
    "ricercare": {
        "definition": "Forme contrapuntique ancienne, précurseur de la fugue."
    },
    "sujet / thème / dux": {
        "definition": "Thème principal d'une fugue, exposé au début et développé tout au long de la composition."
    },
    "air": {
        "definition": "Mélodie principale ou section mélodique dans une composition, souvent chantée."
    },
    "aléatoire": {
        "definition": "Certains éléments sont laissés au hasard ou à l'interprétation de l'exécutant."
    },
    "aria": {
        "definition": "Pièce vocale soliste dans un opéra ou une cantate, souvent de forme ABA."
    },
    "contraste": {
        "definition": "Élément opposé (dynamique, tempo, texture) pour créer de la variété."
    },
    "dialogue": {
        "definition": "Interaction musicale entre deux voix ou instruments, on parle souvent de 'question-réponse'."
    },
    "échelle": {
        "definition": "Série de notes ascendantes ou descendantes, souvent utilisée comme base pour une mélodie ou une improvisation."
    },
    "lamento": {
        "definition": "Pièce musicale exprimant la tristesse ou le deuil, souvent basée sur une basse descendante."
    },
    "mouvement": {
        "definition": "Section autonome d'une œuvre plus large, comme une symphonie ou une sonate."
    },
    "programme": {
        "definition": "Idée extra-musicale, poème ou histoire, qui sert de fil conducteur à une composition."
    },
    "réponse": {
        "definition": "Dans le cadre d'une fugue, la réponse est la version du sujet après qu'il ait été présenté une première fois. Elle est souvent transposée et modifiée pour s’adapter à la tonalité du passage. Souvent transposée à une quarte ou une quinte."
    },
    "rupture": {
        "definition": "Changement soudain ou marqué dans une œuvre musicale, au niveau du tempo, de la tonalité, de la texture ou du style."
    },
    "scherzo": {
        "definition": "Composition sans forme fixe, autonome ou mouvement d'une sonate, d'une symphonie, etc. ; caractère vif et brillant."
    },
    "ternaire": {
        "definition": "Structure musicale en trois parties. Exemple : ABA"
    },
    "grille": {
        "definition": "En jazz, séquence d'accords répétée qui sert de base à l'improvisation."
    },
    "improvisation": {
        "definition": "Art, action de composer et d'exécuter simultanément."
    },
    "sarabande": {
        "definition": "Danse noble et grave, à trois temps (3/4 ou 3/2), de forme binaire, dont chaque phase débutait sur un temps fort, qui se dansait par couples et qui fut introduite à la cour de France au XVIIe siècle. Au XVIIIe, elle est un des éléments fondamentaux de la suite classique située entre la courante et la gigue."
    },
    "gavotte": {
        "definition": "Danse française, à deux temps, d'origine populaire, très en vogue aux dix-septième et dix-huitième siècles."
    },
    "timbre": {
        "definition": "Caractéristique d'un son qui permet de distinguer deux sons de même hauteur et intensité, mais produits par des sources différentes."
    },
    "timbre instrumental": {
        "definition": "Qualité sonore propre à chaque instrument, déterminée par sa construction et sa manière d'être joué."
    },
    "timbre vocal": {
        "definition": "Caractéristique unique de la voix d'une personne, influencée par des facteurs physiologiques."
    },
    "couleur": {
        "definition": "Terme souvent utilisé pour décrire le timbre d'un son ou d'une musique, en référence à sa richesse et ses nuances."
    },
    "texture": {
        "definition": "Manière dont les éléments musicaux (mélodie, harmonie, rythme) sont tissés ensemble pour créer une 'trame' sonore."
    },
    "spectre sonore": {
        "definition": "Ensemble des fréquences (fondamentale et harmoniques) qui caractérisent un son."
    },
    "harmoniques": {
        "definition": "Fréquences multiples de la fréquence fondamentale, qui enrichissent le timbre d'un son."
    },
    "densité": {
        "definition": "Quantité d'éléments sonores présents dans une texture musicale."
    },
    "fondamental": {
        "definition": "Fréquence la plus basse d'un son, qui détermine sa hauteur perçue."
    },
    "formant": {
        "definition": "Renforcement de certaines fréquences dans le spectre sonore, influençant le timbre."
    },
    "enveloppe du son": {
        "definition": "Description de l'évolution d'un son dans le temps, divisée en attaque, decay, sustain et release."
    },
    "enveloppe sonore": {
        "definition": "Façon dont un son évolue dans le temps, influençant sa perception."
    },
    "bruit": {
        "definition": "Son complexe et non périodique, souvent perçu comme désagréable."
    },
    "résonance": {
        "definition": "Amplification naturelle d'un son due à la vibration d'un objet ou d'une cavité."
    },
    "vibration": {
        "definition": "Mouvement oscillatoire qui produit un son."
    },
    "fréquence": {
        "definition": "Nombre de vibrations par seconde d'un son, mesuré en hertz (Hz)."
    },
    "hauteur": {
        "definition": "Caractéristique d'un son qui permet de le classer comme grave ou aigu, déterminée par la fréquence."
    },
    "ultrason": {
        "definition": "Son dont la fréquence est trop élevée pour être perçue par l'oreille humaine (au-dessus de 20 000 Hz)."
    },
    "son": {
        "definition": "Vibration acoustique perçue par l'oreille."
    },
    "synthèse sonore": {
        "definition": "Création de sons artificiels en manipulant des ondes sonores, des harmoniques et des enveloppes."
    },
    "son de synthèse": {
        "definition": "Son généré électroniquement, souvent à l'aide de synthétiseurs."
    },
    "mixage": {
        "definition": "Processus de combinaison et d'équilibrage des pistes sonores pour créer une version finale."
    },
    "panoramique": {
        "definition": "Répartition du son entre les canaux gauche et droit dans un mixage stéréo."
    },
    "espace": {
        "definition": "Répartition des sons dans un environnement acoustique ou dans un mixage."
    },
    "strate": {
        "definition": "Couche sonore dans une composition (mélodie, harmonie, rythme)."
    },
    "sourdine": {
        "definition": "Dispositif utilisé pour atténuer le son d'un instrument, modifiant son timbre."
    },
    "effet": {
        "definition": "Modification du son pour créer une ambiance ou une texture particulière."
    },
    "distorsion": {
        "definition": "Altération du signal sonore pour créer un effet de saturation."
    },
    "rétrograde": {
        "definition": "Technique où une mélodie ou un motif est joué à l'envers."
    },
    "stéréo": {
        "definition": "Technique de diffusion sonore utilisant deux canaux (gauche et droit) pour créer une impression d'espace."
    },
    "réverbération": {
        "definition": "Persistence du son après sa production, due à la réflexion des ondes dans un espace."
    },
    "écho": {
        "definition": "Répétition d'un son due à la réflexion des ondes sonores sur une surface."
    },
    "filtrage": {
        "definition": "Processus de modification du spectre sonore en atténuant ou en amplifiant certaines fréquences."
    },
    "arrangement": {
        "definition": "Adaptation d'une œuvre musicale pour un ensemble différent de l'original."
    },
    "basse continue": {
        "definition": "Technique d'accompagnement baroque utilisant une ligne de basse enrichie d'accords improvisés."
    },
    "instrumentation": {
        "definition": "Art de choisir et de combiner les instruments pour une composition."
    },
    "orchestration": {
        "definition": "Art d'arranger une composition pour un orchestre."
    },
    "réduction": {
        "definition": "Arrangement d'une œuvre orchestrale pour un ensemble plus petit, souvent pour piano."
    },
    "transcription": {
        "definition": "Adaptation d'une œuvre musicale pour un instrument ou un ensemble différent."
    },
    "développement thématique": {
    "definition": "Procédé de composition musicale où un thème principal est transformé, varié ou développé à travers des techniques comme la modulation, l’ornementation ou la fragmentation, pour structurer une œuvre."
  },
  "mélodisation": {
    "definition": "Processus de création ou d’accentuation d’une ligne mélodique claire et expressive, souvent mise en avant comme élément principal d’une composition musicale."
  },
  "hétérophonique": {
    "definition": "Une même mélodie est exécutée simultanément par plusieurs voix ou instruments avec des variations subtiles dans l’ornementation, le rythme ou la hauteur, créant une richesse texturale sans lignes mélodiques indépendantes, comme dans certaines musiques traditionnelles asiatiques ou africaines."
  },
  "homophonique": {
    "definition": "Une voix mélodique principale est soutenue par un accompagnement harmonique, créant une structure verticale dominée par l’harmonie, comme dans les chorals de la période classique."
  },
  "polyphonique": {
    "definition": "Interaction de plusieurs voix mélodiques indépendantes, entrelacées selon des principes de contrepoint, où chaque voix conserve une autonomie rythmique et mélodique, comme dans les fugues ou les motets de la Renaissance."
  },
  "monodique": {
    "definition": "Une seule ligne mélodique, sans accompagnement harmonique ni contrepoint, mettant l’accent sur la pureté de la mélodie, comme dans le chant grégorien ou les monodies profanes de la musique baroque naissante."
  },
  "antiphonique": {
    "definition": "Procédé où deux groupes ou voix alternent ou se répondent dans une composition, souvent utilisé dans les chants liturgiques ou les œuvres chorales."
  },
  "sérialisme": {
    "definition": "Technique de composition du XXe siècle où des séries ordonnées de hauteurs, durées, dynamiques ou timbres sont utilisées pour structurer rigoureusement une œuvre, comme dans les travaux de Schoenberg ou Boulez."
  },
  "spectralisme": {
    "definition": "Courant musical moderne basé sur l’analyse des spectres sonores (fréquences, timbres), utilisant des outils informatiques pour créer des textures et harmonies dérivées des propriétés acoustiques, comme dans les œuvres de Grisey ou Murail."
  },
  "minimalisme": {
    "definition": "Style musical caractérisé par la répétition de motifs simples, des changements graduels et une économie de moyens, souvent hypnotique, comme dans les œuvres de Reich, Glass ou Adams."
  },
  "thème": {
    "definition": "Idée musicale principale, souvent une mélodie ou un motif, servant de base à une composition ou à son développement, comme dans une sonate ou une symphonie."
  },
  "période": {
    "definition": "Structure musicale formée de deux phrases complémentaires (souvent antécédent et conséquent), créant une unité mélodique et harmonique cohérente."
  },
  "inversion": {
    "definition": "Technique où une mélodie ou un motif est transformé en renversant les intervalles (les montées deviennent des descentes et vice versa), utilisée dans le contrepoint ou le sérialisme."
  },
  "rétrogradation": {
    "definition": "Procédé où une mélodie ou une série est jouée à l’envers (du dernier au premier élément), souvent utilisé dans le sérialisme ou les fugues."
  },
  "augmentation": {
    "definition": "Technique où les durées des notes d’un motif ou d’une mélodie sont allongées proportionnellement, ralentissant le rythme tout en conservant la structure mélodique."
  },
  "diminution": {
    "definition": "Technique où les durées des notes d’un motif ou d’une mélodie sont raccourcies proportionnellement, accélérant le rythme tout en préservant la structure mélodique."
  }
};

// ==================== GESTION DES MOTS SÉLECTIONNÉS ====================
function displayWordsForPage(page) {
  const container = document.querySelector(`.selected-words-container[data-page="${page}"]`);
  if (!container) return;

  const words = loadFromLocalStorage(`selectedWords_${page}`);
  container.innerHTML = words.length > 0 
    ? words.map(word => `
        <span class="tag" data-bs-toggle="tooltip" title="${wordDefinitions[word]?.definition || 'Pas de définition'}">
          ${word}
          <span class="delete-word" onclick="deleteWordFromPage('${page}', '${word.replace(/'/g, "\\'")}')">×</span>
        </span>
      `).join(' ')
    : "<span class='empty'>Aucun mot sélectionné</span>";

  container.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el, { trigger: 'hover' });
  });
  console.log(`Mots affichés pour ${page}:`, words);
}

function deleteWordFromPage(page, word) {
  if (confirm(`Supprimer "${word}" ?`)) {
    // Fermer tous les tooltips avant la suppression
    const tooltipInstances = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipInstances.forEach(el => {
      const tooltip = bootstrap.Tooltip.getInstance(el);
      if (tooltip) {
        tooltip.hide(); // Force la fermeture du tooltip
      }
    });

    // Mettre à jour la liste des mots pour la page
    const pageWords = loadFromLocalStorage(`selectedWords_${page}`);
    saveToLocalStorage(`selectedWords_${page}`, pageWords.filter(w => w !== word));

    // Mettre à jour la liste globale des mots sélectionnés
    const selectedWords = loadFromLocalStorage('selectedWords');
    saveToLocalStorage('selectedWords', selectedWords.filter(w => w !== word));

    displayWordsForPage(page);
    console.log(`Mot "${word}" supprimé pour ${page}`);
  }
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

async function saveAudioToDB(blob, time, fileName) {
  try {
    const db = await openDB();
    const transaction = db.transaction(['audioStore'], 'readwrite');
    const store = transaction.objectStore('audioStore');
    const audioData = { id: 'userAudio', blob, time, fileName };
    await store.put(audioData);
    console.log('Sauvegarde dans IndexedDB:', audioData); // Log pour vérifier
  } catch (error) {
    console.error('Erreur lors de la sauvegarde dans IndexedDB:', error);
    alert('Erreur lors de la sauvegarde du fichier audio.');
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

  // Chaîne audio principale avec analyseurs après les effets
  const splitter = audioContext.createChannelSplitter(2);
  source.connect(pannerNode);
  pannerNode.connect(lowFilter);
  lowFilter.connect(midFilter);
  midFilter.connect(highFilter);
  highFilter.connect(gainNode);
  gainNode.connect(splitter);
  splitter.connect(analyserLeft, 0);
  splitter.connect(analyserRight, 1);
  gainNode.connect(audioContext.destination);

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
      // Toujours dessiner le spectre
      drawSpectrum();
      // Dessiner les VU-mètres et formes d'onde uniquement si visualisations visibles
      if (visualizations.classList.contains('active')) {
        drawVUMeters();
        drawWaveform();
      }
      animationId = requestAnimationFrame(animate);
    } catch (error) {
      console.error('Erreur dans la boucle d\'animation:', error);
      // Arrêter l'animation en cas d'erreur pour éviter une boucle infinie
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
      const savedVolume = savedAudioState?.volume || 1;
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

      player.addEventListener('error', (e) => {
        console.error('Erreur lors du chargement de l\'audio:', e);
        alert('Erreur lors du rechargement du fichier audio. Veuillez réimporter le fichier.');
        fileNameDisplay.textContent = 'Erreur lors du chargement';
      }, { once: true });
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
        player.load();
        await saveAudioToDB(file, 0, file.name);
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
          if (commentText.value.trim()) {
            localStorage.removeItem('commentDraft');
            commentText.value = '';
          }
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

  document.getElementById('downloadButton').onclick = async () => {
    if (!window.audioBlob) return alert('Aucun enregistrement disponible');

    const fileName = document.getElementById('fileName').value || 'enregistrement';
    
    // Convertir WAV en MP3
    try {
      const arrayBuffer = await window.audioBlob.arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Extraire les données audio (mono ou stéréo)
      const channels = audioBuffer.numberOfChannels;
      const sampleRate = audioBuffer.sampleRate;
      const length = audioBuffer.length;
      const channelData = [];
      for (let i = 0; i < channels; i++) {
        channelData.push(audioBuffer.getChannelData(i));
      }

      // Initialiser Lamejs
      const mp3Encoder = new lamejs.Mp3Encoder(channels, sampleRate, 128); // 128 kbps
      const mp3Data = [];
      const sampleBlockSize = 1152; // Taille des blocs pour Lamejs

      for (let i = 0; i < length; i += sampleBlockSize) {
        const left = channelData[0].slice(i, i + sampleBlockSize);
        const right = channels > 1 ? channelData[1].slice(i, i + sampleBlockSize) : left;

        // Convertir les échantillons en entiers 16 bits
        const leftInt = Int16Array.from(left, x => x * 32767);
        const rightInt = Int16Array.from(right, x => x * 32767);

        // Encoder en MP3
        const mp3buf = mp3Encoder.encodeBuffer(leftInt, rightInt);
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }
      }

      // Finaliser l'encodage
      const mp3buf = mp3Encoder.flush();
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }

      // Créer le Blob MP3
      const mp3Blob = new Blob(mp3Data, { type: 'audio/mp3' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(mp3Blob);
      link.download = `${fileName}.mp3`;
      link.click();
      console.log('Fichier MP3 téléchargé:', `${fileName}.mp3`);
    } catch (error) {
      console.error('Erreur lors de la conversion en MP3:', error);
      alert('Erreur lors de la conversion en MP3. Téléchargement en WAV à la place.');
      const link = document.createElement('a');
      link.href = URL.createObjectURL(window.audioBlob);
      link.download = `${fileName}.wav`;
      link.click();
    }
  };
});

// ==================== GÉNÉRATION FICHIER TEXTE ====================
function generateTextFile() {
  const text = document.getElementById('commentText').value.trim();
  if (!text) return alert('Veuillez écrire un commentaire');

  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'commentaire.txt';
  link.click();
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

  document.getElementById('downloadButton').onclick = () => {
    if (!window.audioBlob) return alert('Aucun enregistrement disponible');
    const fileName = document.getElementById('fileName').value || 'enregistrement';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(window.audioBlob);
    link.download = `${fileName}.wav`;
    link.click();
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
    // Effacer toutes les clés de localStorage pour les mots sélectionnés
    Object.keys(PAGES).forEach(page => {
      saveToLocalStorage(`selectedWords_${page}`, []);
    });
    saveToLocalStorage('selectedWords', []);

    // Mettre à jour l'affichage des mots pour toutes les pages
    Object.keys(PAGES).forEach(page => {
      displayWordsForPage(page);
    });

    // Déclencher un événement de stockage pour réinitialiser les boutons sur les pages annexes
    localStorage.setItem('clearSelectionEvent', Date.now().toString());

    console.log('Toutes les sélections ont été effacées');
  }
}
