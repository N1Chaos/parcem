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

// Mettre à jour localStorage avec les mots sélectionnés
function updateSelectedWords() {
    const pageName = window.location.pathname.split('/').pop().replace('.html', '');
    const selectedWordsOnPage = Array.from(document.querySelectorAll('.selected')).map(el => el.textContent);
    let selectedWords = JSON.parse(localStorage.getItem('selectedWords')) || [];
    
    // Supprimer les mots de cette page qui ne sont plus sélectionnés
    const pageWords = Array.from(words).map(el => el.textContent);
    selectedWords = selectedWords.filter(word => !pageWords.includes(word) || selectedWordsOnPage.includes(word));
    
    // Ajouter les nouveaux mots sélectionnés
    selectedWordsOnPage.forEach(word => {
        if (!selectedWords.includes(word)) {
            selectedWords.push(word);
        }
    });
    
    localStorage.setItem('selectedWords', JSON.stringify(selectedWords));
    localStorage.setItem(`selectedWords_${pageName}`, JSON.stringify(selectedWordsOnPage));
    console.log(`Mots mis à jour pour ${pageName}:`, selectedWordsOnPage);
}

// Gestion des mots
words.forEach(word => {
    word.addEventListener('click', () => {
        word.classList.toggle('selected');
        updateSelectedWords();
        if (word.classList.contains('selected')) {
            const wordData = wordDefinitions[word.textContent] || { definition: "Aucune définition disponible." };
            definitionTitle.textContent = word.textContent;
            definitionText.innerHTML = wordData.definition.replace(/\n/g, '<br>');
            // Gérer l'image
            definitionImageContainer.style.display = wordData.image ? 'block' : 'none';
            if (wordData.image) {
                definitionImage.src = wordData.image;
                definitionImage.style.display = 'block';
            } else {
                definitionImage.style.display = 'none';
            }
            // Gérer l'audio
            definitionAudioContainer.style.display = wordData.audio ? 'block' : 'none';
            if (wordData.audio) {
                definitionAudioSource.src = wordData.audio;
                definitionAudio.style.display = 'block';
                definitionAudio.load();
            } else {
                definitionAudio.style.display = 'none';
            }
            // Gérer la vidéo
            definitionVideoContainer.style.display = wordData.video ? 'block' : 'none';
            if (wordData.video) {
                definitionVideoSource.src = wordData.video;
                definitionVideo.style.display = 'block';
                definitionVideo.load();
            } else {
                definitionVideo.style.display = 'none';
            }
            // Afficher le panneau
            definitionContainer.style.display = 'block';
        } else {
            // Masquer le panneau si aucun mot n'est sélectionné
            const anySelected = document.querySelectorAll('.selected').length > 0;
            if (!anySelected) {
                definitionContainer.style.display = 'none';
            }
        }
        // Positionner le conteneur de définitions
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        if (definitionContainer.parentElement) {
            definitionContainer.parentElement.removeChild(definitionContainer);
        }
        if (isMobile) {
            definitionContainer.style.position = 'relative';
            definitionContainer.style.left = '';
            definitionContainer.style.top = '';
            definitionContainer.style.width = '100%';
            definitionContainer.style.maxWidth = '';
            word.insertAdjacentElement('afterend', definitionContainer);
        } else {
            definitionContainer.style.position = 'fixed';
            definitionContainer.style.right = '20px';
            definitionContainer.style.top = '20px';
            definitionContainer.style.width = '300px';
            definitionContainer.style.maxWidth = '600px';
            document.body.appendChild(definitionContainer);
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
        // Masquer le panneau
        definitionContainer.style.display = 'none';
        console.log(`Sélections annulées pour ${pageName}`);
    }
}

function returnWords() {
    const selectedWordsOnPage = Array.from(document.querySelectorAll('.selected')).map(el => el.textContent);
    console.log(`Retour à la page principale, mots sélectionnés pour ${window.location.pathname.split('/').pop().replace('.html', '')}:`, selectedWordsOnPage);
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