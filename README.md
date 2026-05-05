## `README.md`

```markdown
# JSQuiz
Quiz interactif pour évaluer et renforcer vos connaissances en JavaScript. Fondamentaux ou concepts avancés, chaque session vous rapproche de la maîtrise.

![JSQuiz](assets/images/image.png)

---

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Niveaux](#niveaux)
- [Types d'exercices](#types-dexercices)
- [Captures d'écran](#captures-décran)
- [Technologies](#technologies)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Utilisation](#utilisation)
- [Système de scoring](#système-de-scoring)
- [Auteur](#auteur)

---

## Aperçu

JSQuiz est une application web éducative conçue pour les étudiants de la filière Informatique et Intelligence Artificielle. Elle propose des exercices variés organisés par niveaux de difficulté croissante, couvrant l'ensemble du programme de JavaScript.

## Fonctionnalités

- 🎬 Écran d'accueil animé avec starfield
- 🦉 Mascotte interactive (aide, réactions)
- 🌙 Thème sombre / clair avec transition fluide
- ⏱️ Minuterie activable / désactivable
- 🎵 Musique de fond et effets sonores
- ⭐ Système de scoring (étoiles, pièces, combo)
- 💾 Progression sauvegardée en localStorage
- 📱 Design responsive (mobile, tablette, desktop)
- 🔄 Réinitialisation complète

## Niveaux

| Niveau | Thème | Difficulté |
|--------|-------|------------|
| 1 | Introduction à JavaScript | Facile |
| 2 | Variables, Types, Opérateurs, Conditions, Boucles | Facile |
| 3 | Fonctions | Moyen |
| 4 | Objets & Tableaux | Moyen |
| 5 | DOM | Difficile |
| 6 | Événements, POO, jQuery & AJAX | Difficile |

## Types d'exercices

Chaque niveau contient **4 sessions**, une par type d'exercice :

| Type | Description | Timer |
|------|-------------|-------|
| **Quiz** | Questions à choix multiples | 15s |
| **Association** | Relier concepts à leurs définitions | — |
| **Complétion** | Taper le mot manquant dans le code | — |
| **Débogage** | Corriger le code erroné dans un éditeur | — |

## Technologies

- **HTML5** — Sémantique, accessibilité
- **CSS3** — Variables CSS, Grid, Flexbox, animations, backdrop-filter
- **JavaScript ES6+** — Vanilla, aucun framework
- **Font Awesome 6** — Icônes
- **Google Fonts** — Syne + DM Sans

## Installation

```bash
git clone https://github.com/NassiraHamiCh/JsQuiz.git
cd jsquiz
```

Ouvrir `index.html` dans votre navigateur.

> Aucun serveur requis — fonctionne en ouvrant directement le fichier HTML.

## Structure du projet

```
jsquiz/
├── index.html              # Page d'accueil (présentation du projet)
├── game.html               # Application quiz (splash + pseudo + jeu)
├── css/
│   └── style.css           # Tous les styles (tokens, composants, responsive)
├── js/
│   ├── questions.js        # Banque de questions (6 niveaux × 4 sessions)
│   ├── script.js           # Logique du jeu (navigation, exercices, scoring)
│   └── landing.js          # Scripts de la page d'accueil (starfield, animations)
├── assets/
│   ├── images/             # Hibou, mascotte, profile, UI
│   └── sounds/             # Musique et effets sonores
└── README.md
```

## Utilisation

1. Ouvrir `index.html` → lire la présentation du projet
2. Cliquer **"Lancer le quiz"** → entrer votre pseudo
3. Choisir un niveau → lire l'intro
4. Cliquer **"Commencer le niveau"**
5. Passer les 4 sessions (quiz → association → complétion → débogage)
6. Terminer le niveau → débloquer le suivant

## Système de scoring

| Action | Points |
|--------|--------|
| Bonne réponse | +20 ⭐ |
| Combo x3+ | +streak × 2 ⭐ |
| Session parfaite (100%) | +30 ⭐ bonus |
| Passer une question | -5 ⭐ |
| Aide du hibou | -5 ⭐ |

- **3 étoiles** par session → niveau validé
- **4 sessions validées** (1 étoile min.) → niveau terminé

## Auteur

**Nassira Hamich**
Filière Informatique et Intelligence Artificielle — FPN

Encadré par : **Pr. Farida BOUROUMANE**
Module : Programmation Web 2 — JavaScript
Année universitaire : 2025 / 2026

---

## Licence

Ce projet est réalisé dans un cadre académique.
```

---









## Plan vidéo démo (7 minutes)

```
╔══════════════════════════════════════════════════════════╗
║  JSQUIZ — SCRIPT VIDÉO DÉMO (7 min)                      ║
╠══════════════════════════════════════════════════════════╣
║                                                            ║
║  FORMAT : Écran enregistré + voix off (texte sur écran)     ║
║  OUTIL  : OBS Studio (gratuit)                            ║
║  RÉSOLUTION : 1920×1080                                    ║
║                                                            ║
╚══════════════════════════════════════════════════════════╝


TEMPS        │ SCÈNE                          │ DURÉE  │ ACTION
─────────────┼─────────────────────────────────┼────────┼──────────
00:00-00:15  │ Page d'accueil index.html        │ 15s    │ Scrollez doucement, montrez le hero, 
             │                                 │        │ les sections "Objectif", "Comment 
             │                                 │        │ jouer", "À propos"
─────────────┼─────────────────────────────────┼────────┼──────────
00:15-00:30  │ Splash screen → Saisie pseudo    │ 15s    │ Le splash apparaît, attendez la 
             │                                 │        │ transition, tapez "Nassira", 
             │                                 │        │ cliquez "Commencer"
─────────────┼─────────────────────────────────┼────────┼──────────
00:30-00:45  │ Page niveaux + welcome banner    │ 15s    │ Montrez "Bienvenue, Nassira", 
             │                                 │        │ les stats (étoiles, pièces, 
             │                                 │        │ niveaux), scrollez les 6 cartes
─────────────┼─────────────────────────────────┼────────┼──────────
00:45-01:00  │ Intro Niveau 1                  │ 15s    │ Cliquez Niveau 1, montrez les 4 
             │                                 │        │ sessions, toggle timer, 
             │                                 │        │ cliquez "Commencer"
─────────────┼─────────────────────────────────┼────────┼──────────
01:00-02:00  │ Session 1 : Quiz (3 questions)   │ 60s    │ Répondez correctement aux 2 
             │                                 │        │ premières, montrez le timer, 
             │                                 │        │ le combo x3 qui apparaît, 
             │                                 │        │ les +20⭐ flottants
─────────────┼─────────────────────────────────┼────────┼──────────
02:00-03:00  │ Session 2 : Association          │ 60s    │ Cliquez gauche puis droite, 
             │                                 │        │ montrez les paires qui se 
             │                                 │        │ valident en vert, le confetti 
             │                                 │        │ à la fin
─────────────┼─────────────────────────────────�────────┼──────────
03:00-04:00  │ Session 3 : Complétion           │ 60s    │ Montrez le code avec le trou, 
             │                                 │        │ tapez la réponse DANS le code, 
             │                                 │        │ montrez "Correct !" vert
─────────────┼─────────────────────────────────�────────┼──────────
04:00-05:15  │ Session 4 : Débogage             │ 75s    │ Montrez le code erroné, 
             │                                 │        │ corrigez-le dans le textarea, 
             │                                 │        │ cliquez "Vérifier", montrez 
             │                                 │        │ "Code corrigé avec succès"
─────────────┼─────────────────────────────────┼────────┼──────────
05:15-05:45  │ Écran résultat                  │ 30s    │ Montrez les étoiles gagnées, 
             │                                 │        │ le score, cliquez 
             │                                 │        │ "Session 2 →"
─────────────┼─────────────────────────────────┼────────┼──────────
05:45-06:15  │ Hibou + aide + skip              │ 30s    │ Montrez le hibou en bas à droite, 
             │                                 │        │ cliquez-le → bulle "Pas assez 
             │                                 │        │ d'étoiles", skippez une question 
             │                                 │        │ avec -5⭐
─────────────┼─────────────────────────────────┼────────┼──────────
06:15-06:40  │ Thème clair + reset             │ 25s    │ Basculez en thème clair (toggle 
             │                                 │        │ en haut), montrez que ça 
             │                                 │        │ marche. Cliquez reset → 
             │                                 │        │ retour vers index.html
─────────────┼─────────────────────────────────┼────────┼──────────
06:40-07:00  │ Écran final + repo GitHub      │ 20s    │ Montrez le repo GitHub, 
             │                                 │        │ le README, texte de fin
             │                                 │        │ "Merci d'avoir regardé !"


╔══════════════════════════════════════════════════════════╗
║  CONSEILS TECHNIQUES                                     ║
╠══════════════════════════════════════════════════════════╣
║                                                            ║
║  AVANT L'ENREGISTREMENT :                                   ║
║  • Fermer tous les onglets sauf celui du jeu                 ║
║  • Vider le cache (Ctrl+Shift+R)                             ║
║  • Désactiver les extensions navigateur                     ║
║  • Mettre le navigateur en mode sombre                       ║
║  • Tester TOUS les exercices au moins 1 fois avant           ║
║                                                            ║
║  PENDANT L'ENREGISTREMENT :                                 ║
║  • NE PAS scroller trop vite (faire des pauses)              ║
║  • Attendre 2-3 secondes après chaque action                  ║
║  • Ne pas hésiter à refaire une scène si erreur               ║
║  • Garder la souris invisible (paramètre OBS)                ║
║  • Parler lentement et clairement                             ║
║                                                            ║
║  RACCOURCIS UTILES :                                        ║
║  • Ctrl+Shift+R = vider le cache                           ║
║  • F11 = plein écran                                       ║
║  • Alt+Tab = ne JAMAIS montrer pendant l'enregistrement       ║
║                                                            ║
║  APRÈS :                                                   ║
║  • Exporter en MP4 dans OBS → Media → Convert                ║
║  • Bitrate : 4000-6000 kbps                                 ║
║  • Ajouter un fade in/out noir de 1 seconde                  ║
║                                                            ║
╚══════════════════════════════════════════════════════════╝


TEXTE POUR ÉCRAN (à afficher pendant la vidéo) :

─────────────────────────────────────────────
  Bienvenue sur JSQuiz
  Un quiz interactif pour maîtriser JavaScript
─────────────────────────────────────────────

  [PENDRE 3 secondes]

─────────────────────────────────────────────
  Niveau 1 : Introduction à JavaScript
  6 niveaux · 4 types d'exercices
─────────────────────────────────────────────

  [PENDRE 3 secondes]

─────────────────────────────────────────────
  Quiz — Questions à choix multiples
  Association — Reliez les concepts
  Complétion — Remplissez le code
  Débogage — Corrigez les erreurs
─────────────────────────────────────────────

  [PENDRE 3 secondes]

─────────────────────────────────────────────
  +20 ⭐ par bonne réponse
  Combo x3+ = bonus étoiles
  Session parfaite = +30 ⭐
─────────────────────────────────────

  [PENDRE 3 secondes]

─────────────────────────────────────────────
  Code corrigé avec succès ! ✓
  Session parfaite ! +30 ⭐ bonus
─────────────────────────────────────

  [PENDRE 3 secondes]

─────────────────────────────────────────────
  Thème sombre · Thème clair
  Progression sauvegardée automatiquement
─────────────────────────────────────

  [PENDRE 3 secondes]

─────────────────────────────────────────────
  Merci d'avoir regardé !
  Laissez une ⭐ sur GitHub
─────────────────────────────────────────────
```

**C'est bon ?** (oui / non)