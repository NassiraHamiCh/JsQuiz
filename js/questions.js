/* ══════════════════════════════════════════════════════════════
   QUESTIONS.JS — 1 session = 1 type d'exercice
   6 Niveaux × 4 sessions (quiz, assoc, comp, debug)
   ══════════════════════════════════════════════════════════════ */

var LEVELS_DATA = [

  /* ─── NIVEAU 1 : Introduction à JavaScript ─── */
  {
    id: 1, title: "Introduction à JavaScript", icon: "fa-js",
    desc: "Historique, caractéristiques principales de JavaScript, et environnements d'exécution.",
    difficulty: "Facile", time: "8 min", questions: 10, status: "playable",
    sessions: [
      {
        type: "quiz",
        quiz: [
          { 
            q: "En quelle année JavaScript a-t-il été créé ?", 
            opts: ["1995", "1998", "2005", "2010"], 
            ans: 0, 
            hint: "Créé par Brendan Eich chez Netscape." 
          },
          { 
            q: "Pourquoi JavaScript a-t-il été initialement développé ?", 
            opts: ["Gérer des bases de données", "Rendre les pages web interactives", "Créer des applications mobiles", "Pour le traitement d'images"], 
            ans: 1, 
            hint: "Il visait à dynamiser les pages HTML statiques." 
          },
          { 
            q: "Laquelle de ces caractéristiques décrit correctement JavaScript ?", 
            opts: ["Langage compilé et typé statiquement", "Langage interprété et typé dynamiquement", "Langage strictement orienté objet", "Langage utilisé uniquement pour le backend"], 
            ans: 1, 
            hint: "Il n'exige pas de spécifier le type des variables." 
          },
          { 
            q: "Quel environnement d'exécution permet d'exécuter JavaScript côté serveur ?", 
            opts: ["Navigateur", "Node.js", "Apache", "PHP"], 
            ans: 1, 
            hint: "C'est une révolution qui a permis d'utiliser JS hors du navigateur." 
          },
          { 
            q: "Que permet JavaScript dans un navigateur ?", 
            opts: ["Lire les fichiers système", "Modifier dynamiquement le contenu d'une page", "Exécuter des requêtes SQL", "Compiler du code Python"], 
            ans: 1, 
            hint: "Il interagit avec le DOM." 
          },
          { 
            q: "À quoi fait référence ECMAScript ?", 
            opts: ["Une bibliothèque JavaScript", "Une norme pour JavaScript", "Un outil de gestion de serveurs", "Un environnement d'exécution"], 
            ans: 1, 
            hint: "C'est une norme définie par ECMA International." 
          },
          { 
            q: "Que signifie le « dynamisme » du typage dans JavaScript ?", 
            opts: ["Il fonctionne uniquement pour des projets web", "Les variables peuvent changer de type à l'exécution", "C'est un langage strictement typé", "Il ne fonctionne pas hors navigateur"], 
            ans: 1, 
            hint: "Une variable peut contenir une chaîne puis un nombre." 
          },
          { 
            q: "Pourquoi JavaScript est-il limité dans un navigateur ?", 
            opts: ["Pour économiser de la mémoire", "Pour éviter des failles de sécurité (lecture de fichiers)", "Parce qu'il ne gère pas les bases de données", "Pour limiter la taille des scripts"], 
            ans: 1, 
            hint: "Il n'accède pas aux fichiers locaux de l'utilisateur." 
          },
          { 
            q: "En combien de temps Brendan Eich a-t-il créé JavaScript ?", 
            opts: ["10 jours", "1 mois", "1 an", "10 ans"], 
            ans: 0, 
            hint: "C'était un temps de développement extrêmement court." 
          },
          { 
            q: "Que permet le DOM (Document Object Model) en JavaScript ?", 
            opts: ["Créer de nouveaux langages", "Interagir et modifier la structure HTML et CSS", "Compiler le JavaScript", "Remplacer le serveur web"], 
            ans: 1, 
            hint: "C'est une interface de manipulation de page web." 
          }
        ]
      },
      {
        type: "assoc",
        assoc: [
          { left: "Brendan Eich", right: "Créateur de JavaScript en 1995" },
          { left: "ECMAScript", right: "Norme officielle de JavaScript" },
          { left: "Node.js", right: "Environnement d'exécution côté serveur" },
          { left: "Navigateur", right: "Exécute JavaScript côté client" },
          { left: "DOM", right: "Permet de modifier HTML et CSS" },
          { left: "Typage dynamique", right: "Les variables changent de type à l'exécution" },
          { left: "Langage interprété", right: "Non compilé, exécuté directement" },
          { left: "Netscape", right: "Entreprise où JS a été créé" },
          { left: "Interactivité", right: "But initial de la création de JS" },
          { left: "Sécurité", right: "Raison pour laquelle JS ne lit pas les fichiers locaux" },
          { left: "camelCase", right: "Convention de nommage (ex: userName)" },
          { left: "Espace", right: "Caractère interdit dans un nom de variable" }
        ]
      },
      {
        type: "comp",
        completion: [
          { code: "JavaScript a été créé en ___", answer: "1995", hint: "L'année de sa création par Brendan Eich." },
          { code: "JavaScript a été conçu chez Netscape en seulement ___ jours", answer: "10", hint: "Un délai très court." },
          { code: "La norme officielle définie par ECMA International s'appelle ___", answer: "ECMAScript", hint: "Norme standardisant JS." },
          { code: "L'environnement ___ permet d'exécuter JavaScript côté serveur", answer: "Node.js", hint: "Révolution pour le backend." },
          { code: "JavaScript dans le navigateur ne peut pas lire les ___ système pour des raisons de sécurité", answer: "fichiers", hint: "Données locales de l'utilisateur." },
          { code: "Le ___ (Document Object Model) permet de modifier le HTML", answer: "DOM", hint: "Interface pour interagir avec la page." },
          { code: "JavaScript est un langage ___, il ne nécessite pas d'être compilé", answer: "interprété", hint: "Exécuté à la volée." },
          { code: "En JS, on ne spécifie pas le type des variables, le typage est ___", answer: "dynamique", hint: "Le type change à l'exécution." },
          { code: "La convention ___ consiste à utiliser une majuscule pour les mots suivants (ex: nomUtilisateur)", answer: "camelCase", hint: "Façon de nommer les variables." },
          { code: "Un nom de variable ne doit jamais contenir d'___", answer: "espace", hint: "Caractère vide." }
        ]
      },
      {
        type: "debug",
        debug: [
          { 
            code: "JavaScript a été créé en 2005 par Brendan Eich.", 
            answer: "JavaScript a été créé en 1995 par Brendan Eich.", 
            hint: "Vérifie l'année de création." 
          },
          { 
            code: "Le navigateur exécute JavaScript côté serveur.", 
            answer: "Le navigateur exécute JavaScript côté client.", 
            hint: "Côté client ou serveur ?" 
          },
          { 
            code: "Node.js est un navigateur web.", 
            answer: "Node.js est un environnement d'exécution côté serveur.", 
            hint: "Quelle est la vraie nature de Node.js ?" 
          },
          { 
            code: "JavaScript est un langage strictement typé.", 
            answer: "JavaScript est un langage typé dynamiquement.", 
            hint: "Les types peuvent-ils changer ?" 
          },
          { 
            code: "Le DOM est utilisé pour gérer des bases de données.", 
            answer: "Le DOM est utilisé pour modifier la structure HTML et CSS des pages.", 
            hint: "A quoi sert le Document Object Model ?" 
          },
          { 
            code: "ECMAScript est un nouveau langage de programmation.", 
            answer: "ECMAScript est une norme pour JavaScript.", 
            hint: "Est-ce un langage ou une norme ?" 
          },
          { 
            code: "Dans le navigateur, JS peut lire les fichiers système de l'utilisateur.", 
            answer: "Dans le navigateur, JS ne peut pas lire les fichiers système de l'utilisateur.", 
            hint: "Pense aux règles de sécurité." 
          },
          { 
            code: "Un nom de variable en JavaScript peut contenir un espace.", 
            answer: "Un nom de variable en JavaScript ne doit pas contenir d'espace.", 
            hint: "Les espaces sont-ils autorisés ?" 
          },
          { 
            code: "JavaScript est un langage compilé.", 
            answer: "JavaScript est un langage interprété.", 
            hint: "Est-il compilé ou interprété ?" 
          },
          { 
            code: "La convention camelCase met toutes les lettres en majuscules.", 
            answer: "La convention camelCase met la première lettre en minuscule et les mots suivants en majuscule.", 
            hint: "Comment fonctionne le camelCase ?" 
          }
        ]
      }
    ]
  },


  /* ─── NIVEAU 2 : Fondamentaux de JavaScript ─── */
  {
      id: 2,
      title: "Variables, Types, Opérateurs, Conditions, Boucles",
      icon: "fa-code",
      desc: "Maîtriser les variables, les types de données, les opérateurs, les structures conditionnelles et les boucles.",
      difficulty: "Facile",
      time: "10 min",
      questions: 15,
      status: "locked",
      sessions: [
        {
          type: "quiz",
          quiz: [
            { 
              q: "Quel mot-clé déclare une variable non réassignable ?", 
              opts: ["var", "let", "const", "static"], 
              ans: 2, 
              hint: "Introduit avec ES6, idéal pour les valeurs fixes." 
            },
            { 
              q: "Que retourne l'expression typeof 42 ?", 
              opts: ['"number"', '"integer"', '"float"', '"numeric"'], 
              ans: 0, 
              hint: "En JavaScript, il n'y a qu'un seul type pour les nombres." 
            },
            { 
              q: "Lequel de ces éléments n'est PAS un type primitif en JavaScript ?", 
              opts: ["String", "Number", "Array", "Boolean"], 
              ans: 2, 
              hint: "Les tableaux (Array) sont en réalité des objets." 
            },
            { 
              q: "Que retourne : typeof null ?", 
              opts: ['"null"', '"undefined"', '"object"', '"boolean"'], 
              ans: 2, 
              hint: "C'est un bug historique très connu de JavaScript." 
            },
            { 
              q: "Quelle est la principale différence entre == et === ?", 
              opts: ["Aucune", "=== compare la valeur ET le type", "== est plus strict", "=== convertit les types automatiquement"], 
              ans: 1, 
              hint: "=== est appelé l'opérateur d'égalité stricte." 
            },
            { 
              q: "Que vaut une variable déclarée avec let sans être initialisée ?", 
              opts: ["null", "0", "''", "undefined"], 
              ans: 3, 
              hint: "Le moteur JS lui attribue cette valeur par défaut." 
            },
            { 
              q: "Quel est l'opérateur ternaire en JavaScript ?", 
              opts: ["&&", "||", "? :", "!"], 
              ans: 2, 
              hint: "Il s'écrit sous la forme : condition ? valeur1 : valeur2" 
            },
            { 
              q: "Quelle est la particularité de la boucle do...while par rapport à while ?", 
              opts: ["Elle est infinie", "Elle s'exécute au moins une fois", "Elle ne vérifie jamais la condition", "Elle est obsolète"], 
              ans: 1, 
              hint: "La condition est vérifiée APRÈS l'exécution du bloc." 
            },
            { 
              q: "Quel mot-clé permet d'interrompre et de sortir immédiatement d'une boucle ?", 
              opts: ["exit", "stop", "break", "return"], 
              ans: 2, 
              hint: "Il casse l'exécution de la boucle en cours." 
            },
            { 
              q: "Que produit l'opérateur + entre une chaîne de caractères et un nombre (ex: '5' + 3) ?", 
              opts: ["Une addition (8)", "Une soustraction (2)", "Une concaténation ('53')", "Une erreur"], 
              ans: 2, 
              hint: "Le nombre est converti en chaîne." 
            },
            { 
              q: "À quoi sert l'instruction switch ?", 
              opts: ["À créer une boucle infinie", "À comparer une variable à plusieurs valeurs possibles", "À déclarer une fonction", "À typer une variable"], 
              ans: 1, 
              hint: "C'est une alternative élégante à une suite de if/else if." 
            },
            { 
              q: "Pourquoi est-il important d'utiliser break dans un case de switch ?", 
              opts: ["Pour des raisons esthétiques", "Pour empêcher l'exécution des cas suivants (fall-through)", "Pour fermer le switch", "C'est une erreur de l'utiliser"], 
              ans: 1, 
              hint: "Sans cela, le code continue de s'exécuter dans les case du dessous." 
            },
            { 
              q: "Quelle boucle est la plus adaptée lorsqu'on connaît à l'avance le nombre d'itérations ?", 
              opts: ["while", "do...while", "for", "for...in"], 
              ans: 2, 
              hint: "Elle intègre l'initialisation, la condition et l'incrémentation." 
            },
            { 
              q: "Que fait l'instruction continue dans une boucle ?", 
              opts: ["Elle arrête définitivement la boucle", "Elle saute le reste du code et passe à l'itération suivante", "Elle relance la boucle à zéro", "Elle met le script en pause"], 
              ans: 1, 
              hint: "Elle ignore le reste du bloc pour le tour actuel." 
            },
            { 
              q: "Lequel de ces opérateurs permet de calculer le reste d'une division entière ?", 
              opts: ["/", "//", "%", "**"], 
              ans: 2, 
              hint: "On l'appelle l'opérateur modulo." 
            }
          ]
        },
        {
          type: "assoc",
          assoc: [
            { left: "var", right: "Portée de fonction (ancienne syntaxe)" },
            { left: "let", right: "Portée de bloc (réassignable)" },
            { left: "const", right: "Portée de bloc (non réassignable)" },
            { left: "typeof", right: "Opérateur pour connaître le type" },
            { left: "===", right: "Égalité stricte (valeur + type)" },
            { left: "==", right: "Égalité faible (avec conversion)" },
            { left: "&&", right: "Opérateur logique ET" },
            { left: "||", right: "Opérateur logique OU" },
            { left: "if / else", right: "Structure conditionnelle classique" },
            { left: "switch", right: "Structure à choix multiples" },
            { left: "break", right: "Sortir d'une boucle ou d'un case" },
            { left: "continue", right: "Passer à l'itération suivante" },
            { left: "for", right: "Boucle avec compteur défini" },
            { left: "while", right: "Boucle avec condition préalable" },
            { left: "do...while", right: "Boucle exécutée au moins une fois" }
          ]
        },
        {
          type: "comp",
          completion: [
            { code: "___ x = 10; // Cette variable ne pourra pas être modifiée", answer: "const", hint: "Mot-clé pour déclarer une constante." },
            { code: "___ y = 5; // Variable locale avec portée de bloc", answer: "let", hint: "Le standard moderne pour remplacer var." },
            { code: "L'instruction typeof 'Bonjour' retourne la chaîne ___", answer: "string", hint: "Type de données pour le texte." },
            { code: "L'instruction typeof true retourne la chaîne ___", answer: "boolean", hint: "Type de données pour Vrai/Faux." },
            { code: "L'opération '5' + 3 retourne la chaîne ___", answer: "53", hint: "Il s'agit d'une concaténation." },
            { code: "L'opération '5' - 3 retourne le nombre ___", answer: "2", hint: "L'opérateur moins convertit la chaîne en nombre." },
            { code: "var age = 20;\n___ (age >= 18) { console.log('Majeur'); }", answer: "if", hint: "Mot-clé introduisant une condition." },
            { code: "for (let i = 0; i < 5; ___) { } // Incrémenter i de 1", answer: "i++", hint: "Raccourci pour i = i + 1." },
            { code: "var note = 16;\nvar mention = (note >= 14) ? 'Bien' : 'Passable';\nLa variable mention contient ___", answer: "Bien", hint: "L'opérateur ternaire évalue si 16 >= 14." },
            { code: "L'expression !false retourne ___", answer: "true", hint: "L'opérateur NOT inverse la valeur logique." },
            { code: "L'expression false || 'défaut' retourne ___", answer: "défaut", hint: "L'opérateur OU renvoie la première valeur 'truthy'." },
            { code: "L'expression true && 'résultat' retourne ___", answer: "résultat", hint: "L'opérateur ET évalue la seconde opérande si la première est vraie." },
            { code: "let x = 0;\ndo { x++; } while (x < 3);\nÀ la fin, x vaut ___", answer: "3", hint: "La boucle s'exécute pour x=0, x=1, x=2, puis s'arrête." },
            { code: "La valeur par défaut d'une variable déclarée mais non initialisée est ___", answer: "undefined", hint: "Signifie 'non défini'." }
          ]
        },
        {
          type: "debug",
          debug: [
            { 
              code: "const x = 5;\nx = 10;", 
              answer: "let x = 5;\nx = 10;", 
              hint: "On ne peut pas réassigner une variable 'const'. Utilise 'let'." 
            },
            { 
              code: "let 1erNom = 'Nassira';", 
              answer: "let premierNom = 'Nassira';", 
              hint: "Le nom d'une variable ne peut pas commencer par un chiffre." 
            },
            { 
              code: "let x = '5';\nlet y = x + 3;\n// On veut que y vaille 8", 
              answer: "let x = '5';\nlet y = Number(x) + 3;\n// ou parseInt(x) + 3", 
              hint: "Attention à la concaténation involontaire, il faut convertir la chaîne en nombre." 
            },
            { 
              code: "if (x = 5) {\n  console.log('x vaut 5');\n}", 
              answer: "if (x === 5) {\n  console.log('x vaut 5');\n}", 
              hint: "Un seul '=' est une assignation. Utilise '===' pour comparer." 
            },
            { 
              code: "let i = 5;\nwhile (i > 0);\n{\n  i--;\n}", 
              answer: "let i = 5;\nwhile (i > 0) {\n  i--;\n}", 
              hint: "Le point-virgule après la condition du while crée une boucle infinie avec une instruction vide." 
            },
            { 
              code: "switch (couleur) {\n  case 'rouge': console.log('A');\n  default: console.log('B');\n}", 
              answer: "switch (couleur) {\n  case 'rouge': console.log('A'); break;\n  default: console.log('B');\n}", 
              hint: "N'oublie pas le 'break' pour éviter l'exécution en cascade." 
            },
            { 
              code: "for (let i = 0; i < 5) { console.log(i); }", 
              answer: "for (let i = 0; i < 5; i++) { console.log(i); }", 
              hint: "Il manque l'expression d'incrémentation dans la boucle for." 
            },
            { 
              code: "if (x === 5) && (y === 10) { }", 
              answer: "if (x === 5 && y === 10) { }", 
              hint: "Toute la condition du if doit être entre une seule paire de parenthèses." 
            },
            { 
              code: "let x = 10;\nif (x > 5) { let res = 'OK'; }\nconsole.log(res);", 
              answer: "let x = 10;\nlet res;\nif (x > 5) { res = 'OK'; }\nconsole.log(res);", 
              hint: "Une variable 'let' n'est pas accessible en dehors de son bloc { }." 
            },
            { 
              code: "do { console.log('L'); } while x < 5;", 
              answer: "do { console.log('L'); } while (x < 5);", 
              hint: "La condition du while doit toujours être entre parenthèses." 
            }
          ]
        }
      ]
  },


  /* ─── NIVEAU 3 : Les Fonctions ─── */
  {
    id: 3, title: "Fonctions", icon: "fa-wand-magic-sparkles",
    desc: "Déclaration, types, paramètres, return et callbacks.",
    difficulty: "Moyen", time: "10 min", questions: 15, status: "locked",
    sessions: [
      {
        type: "quiz",
        quiz: [
          { q: "Quel mot-clé déclare une fonction ?", opts: ["func", "def", "function", "method"], ans: 2, hint: "function nom() { }" },
          { q: "Qu'est-ce qu'une fonction anonyme ?", opts: ["Sans paramètres", "Sans nom", "Sans return", "Vide"], ans: 1, hint: "Généralement stockée dans une variable." },
          { q: "Syntaxe d'une fonction fléchée ?", opts: ["function => {}", "() -> {}", "() => {}", "=> function {}"], ans: 2, hint: "Introduite avec ES6." },
          { q: "Qu'est-ce qu'un callback ?", opts: ["Variable globale", "Fonction passée en argument", "Type de boucle", "Un objet"], ans: 1, hint: "Courant dans événements et asynchrone." },
          { q: "Que retourne une fonction sans return ?", opts: ["0", "null", "''", "undefined"], ans: 3, hint: "Pas de return = undefined." },
          { q: "Valeur d'un paramètre non fourni ?", opts: ["null", "0", "undefined", "Erreur"], ans: 2, hint: "Sauf valeur par défaut définie." },
          { q: "Particularité des fléchées avec this ?", opts: ["Propre this", "Pas de this propre", "Ignorent this", "this = window"], ans: 1, hint: "Héritent du this parent." },
          { q: "Les fonctions déclarées sont accessibles avant ?", opts: ["Non", "Oui (hoisting)", "Seulement en strict", "Seulement avec var"], ans: 1, hint: "Hoisting des déclarations." },
          { q: "Laquelle est une fonction déclarée ?", opts: ["var f = function() {}", "var f = () => {}", "function f() {}", "let f = function() {}"], ans: 2, hint: "Commence directement par function." },
          { q: "Principe d'une seule tâche par fonction ?", opts: ["Responsabilité unique", "DRY", "SOLID", "KISS"], ans: 0, hint: "Une fonction = une tâche." },
          { q: "Pourquoi préférer return à console.log ?", opts: ["Plus rapide", "Valeur réutilisable", "console.log ne marche pas", "return affiche aussi"], ans: 1, hint: "return rend la fonction réutilisable." },
          { q: "Quelle forme idéale pour callbacks courts ?", opts: ["Déclarée", "Anonyme classique", "Fléchée", "Constructeur"], ans: 2, hint: "Syntaxe concise." },
          { q: "Une fonction peut être stockée dans une variable ?", opts: ["Non", "Oui (expression)", "Seulement avec const", "Seulement avec var"], ans: 1, hint: "var fn = function() {} est valide." },
          { q: "Que signifie DRY ?", opts: ["Don't Repeat Yourself", "Do Repeat Yearly", "Don't Run Yolo", "Debug Reset Yourself"], ans: 0, hint: "Éviter la duplication." },
          { q: "Qu'est-ce que le hoisting ?", opts: ["Erreur", "Déclarations remontées", "Callback", "Méthode d'objet"], ans: 1, hint: "Fonctions déclarées appelables avant." },
          { q: "function add(a, b = 10) { return a + b; }\nadd(5) retourne ?", opts: ["NaN", "5", "15", "Erreur"], ans: 2, hint: "b prend la valeur par défaut 10." }
        ]
      },
      {
        type: "assoc",
        assoc: [
          { left: "Fonction déclarée", right: "function nom() {}" },
          { left: "Fonction anonyme", right: "var f = function() {}" },
          { left: "Fonction fléchée", right: "() => {}" },
          { left: "Callback", right: "Fonction passée en argument" },
          { left: "return", right: "Retourne une valeur" },
          { left: "Paramètre", right: "Variable reçue" },
          { left: "Argument", right: "Valeur passée à l'appel" },
          { left: "Hoisting", right: "Remonte les déclarations" },
          { left: "DRY", right: "Don't Repeat Yourself" },
          { left: "Responsabilité unique", right: "Une fonction = une tâche" },
          { left: "Valeur par défaut", right: "function f(x = 5) {}" },
          { left: "Expression de fonction", right: "var f = function() {}" },
          { left: "Fonction hissée", right: "Accessible avant déclaration" },
          { left: "Fonction fléchée", right: "Pas de this propre" }
        ]
      },
      {
        type: "comp",
        completion: [
          { code: "___ direBonjour(nom) {\n  return 'Bonjour ' + nom;\n}", answer: "function", hint: "Mot-clé pour déclarer." },
          { code: "var carre = (x) ___ x * x;", answer: "=>", hint: "Syntaxe fléchée ES6." },
          { code: "function add(a, b) { ___ a + b; }", answer: "return", hint: "Retourner une valeur." },
          { code: "setTimeout(___, 1000);\n// fn est un callback", answer: "fn", hint: "Fonction passée en argument." },
          { code: "function greet(nom = 'Inconnu') {}\ngreet() → nom vaut ___", answer: "Inconnu", hint: "Valeur par défaut." },
          { code: "function test() {}\nconsole.log(test()); // ___", answer: "undefined", hint: "Pas de return = undefined." },
          { code: "function add(a, b = 10) { return a + b; }\nadd(5) retourne ___", answer: "15", hint: "b = 10 par défaut." },
          { code: "var double = x => x * 2;\ndouble(7) retourne ___", answer: "14", hint: "Fléchée concise." },
          { code: "[1,2,3].forEach(function(x) {});\n// function(x) est un ___", answer: "callback", hint: "Passée en argument à forEach." },
          { code: "var f = function() { return 42; };\nf() retourne ___", answer: "42", hint: "Expression de fonction." },
          { code: "function test(a) { return a * 2; }\ntest(6) retourne ___", answer: "12", hint: "6 * 2." },
          { code: "function direBonjour() {\n  return 'Bonjour';\n  console.log('Fin');\n}\n// console.log ne s'exécute pas car ___", answer: "return", hint: "Tout code après return est ignoré." }
        ]
      },
      {
        type: "debug",
        debug: [
          { code: "var carre = (x) => {\n  x * x;\n};", answer: "var carre = (x) => {\n  return x * x;\n};", hint: "Il manque return dans le corps {}." },
          { code: "function add(a, b) {\n  console.log(a + b);\n}\nvar result = add(3, 5);", answer: "function add(a, b) {\n  return a + b;\n}\nvar result = add(3, 5);", hint: "console.log n'est pas un return." },
          { code: "var obj = {\n  nom: 'Ali',\n  dire: () => {\n    console.log(this.nom);\n  }\n};", answer: "var obj = {\n  nom: 'Ali',\n  dire: function() {\n    console.log(this.nom);\n  }\n};", hint: "Les fléchées n'ont pas de this propre." },
          { code: "function calc() {\n  var x = 5;\n}\nconsole.log(x);", answer: "function calc() {\n  var x = 5;\n  console.log(x);\n}", hint: "x est locale à la fonction." },
          { code: "function direBonjour() {\n  return 'Bonjour';\n  console.log('Fin');\n}", answer: "function direBonjour() {\n  console.log('Fin');\n  return 'Bonjour';\n}", hint: "Le code après return est ignoré." }
        ]
      }
    ]
  },

  /* ─── NIVEAU 4 : Objets & Tableaux ─── */
  {
    id: 4, title: "Objets & Tableaux", icon: "fa-cube",
    desc: "Création, manipulation, méthodes et parcours des objets et tableaux.",
    difficulty: "Moyen", time: "12 min", questions: 21, status: "locked",
    sessions: [
      {
        type: "quiz",
        quiz: [
          { q: "Comment créer un objet ?", opts: ["new Object() uniquement", "{ } (littéral)", "object.create()", "Les deux premiers"], ans: 3, hint: "{} et new Object() sont valides." },
          { q: "Comment accéder à la propriété 'nom' ?", opts: ["obj->nom", "obj(nom)", "obj.nom ou obj['nom']", "obj::nom"], ans: 2, hint: "Notation point ou crochets." },
          { q: "Comment supprimer une propriété ?", opts: ["obj.prop = null", "remove obj.prop", "delete obj.prop", "obj.pop('prop')"], ans: 2, hint: "Mot-clé delete." },
          { q: "Index du premier élément d'un tableau ?", opts: ["1", "-1", "0", "null"], ans: 2, hint: "Indexé à partir de 0." },
          { q: "Méthode pour ajouter à la fin ?", opts: ["unshift()", "push()", "append()", "add()"], ans: 1, hint: "push() ajoute à la fin." },
          { q: "Méthode pour supprimer le dernier ?", opts: ["shift()", "pop()", "remove()", "splice()"], ans: 1, hint: "pop() supprime et retourne le dernier." },
          { q: "Méthode pour ajouter au début ?", opts: ["push()", "unshift()", "prepend()", "start()"], ans: 1, hint: "unshift() au début." },
          { q: "Longueur d'un tableau ?", opts: ["arr.size()", "arr.count", "arr.length", "arr.len()"], ans: 2, hint: "Propriété, pas méthode." },
          { q: "Méthode pour inverser ?", opts: ["sort()", "flip()", "reverse()", "invert()"], ans: 2, hint: "reverse() modifie l'original." },
          { q: "Méthode pour supprimer à une position ?", opts: ["pop()", "shift()", "splice()", "remove()"], ans: 2, hint: "splice(index, nombre)." },
          { q: "Différence entre constructeur et classe ?", opts: ["Aucune", "Classe = modèle, constructor = initialise", "Constructeur plus moderne", "Classes inexistantes"], ans: 1, hint: "Classe regroupe, constructor initialise." },
          { q: "Comment parcourir un tableau ?", opts: ["Uniquement for", "for, for...of, forEach()", "Uniquement forEach()", "Uniquement while"], ans: 1, hint: "Plusieurs méthodes." },
          { q: "Que fait forEach() ?", opts: ["Retourne nouveau tableau", "Filtre les éléments", "Exécute une fonction pour chaque", "Trie"], ans: 2, hint: "Passe chaque élément au callback." },
          { q: "À quoi sert this dans un objet ?", opts: ["Référence constructeur", "Référence objet courant", "Référence classe", "Référence prototype"], ans: 1, hint: "this.nom = propriété de l'objet." },
          { q: "Comment créer plusieurs objets similaires ?", opts: ["Copier-coller", "Classe ou constructeur", "Tableau", "Impossible"], ans: 1, hint: "La classe = modèle réutilisable." },
          { q: "Quel mot-clé crée une instance ?", opts: ["create", "instance", "new", "make"], ans: 2, hint: "new Etudiant('Ali', 20)." },
          { q: "Comment copier un tableau sans modifier l'original (syntaxe ES6) ?", opts: ["=[...arr]", "arr.copy()", "arr.clone()", "arr.duplicate()"], ans: 0, hint: "Utilisation de l'opérateur spread." }
        ]
      },
      {
        type: "assoc",
        assoc: [
          { left: "push()", right: "Ajouter à la fin" },
          { left: "pop()", right: "Supprimer le dernier" },
          { left: "unshift()", right: "Ajouter au début" },
          { left: "shift()", right: "Supprimer le premier" },
          { left: "splice()", right: "Supprimer à une position" },
          { left: "sort()", right: "Trier le tableau" },
          { left: "reverse()", right: "Inverser le tableau" },
          { left: "length", right: "Nombre d'éléments" },
          { left: "class", right: "Modèle pour objets" },
          { left: "constructor", right: "Initialise les propriétés" },
          { left: "this", right: "Référence objet courant" },
          { left: "new", right: "Crée une instance" },
          { left: "forEach()", right: "Parcourt chaque élément" },
          { left: "delete", right: "Supprime propriété" },
          { left: "obj['prop']", right: "Accès par crochets" },
          { left: "[...arr]", right: "Copier un tableau (spread)" }
        ]
      },
      {
        type: "comp",
        completion: [
          { code: "var etudiant = { nom: 'Ali', age: 20 };\netudiant.___ retourne 'Ali'", answer: "nom", hint: "Notation point." },
          { code: "var arr = [10, 20, 30];\narr[___] retourne 10", answer: "0", hint: "Premier à l'index 0." },
          { code: "var arr = [1, 2, 3];\narr.push(4);\narr vaut ___", answer: "[1,2,3,4]", hint: "push() à la fin." },
          { code: "var arr = [1, 2, 3];\narr.pop();\narr vaut ___", answer: "[1,2]", hint: "pop() supprime le dernier." },
          { code: "var arr = ['a', 'b', 'c'];\narr.___ retourne 3", answer: "length", hint: "Propriété length." },
          { code: "var obj = { a: 1 };\n___ obj.a;", answer: "delete", hint: "Supprimer propriété." },
          { code: "var arr = [3, 1, 2];\narr.sort();\narr vaut ___", answer: "[1,2,3]", hint: "Tri alphabétique par défaut." },
          { code: "class Etudiant {\n  ___(nom, age) {\n    this.nom = nom;\n  }\n}", answer: "constructor", hint: "Méthode d'initialisation." },
          { code: "var e = new Etudiant('Ali', 20);\ne.___ retourne 'Ali'", answer: "nom", hint: "Accès propriété." },
          { code: "var arr = [1, 2, 3, 4];\narr.splice(1, 2);\narr vaut ___", answer: "[1,4]", hint: "Supprime 2 à partir de l'index 1." },
          { code: "var arr = [3, 1, 2];\narr.reverse();\narr vaut ___", answer: "[2,1,3]", hint: "Inverse l'ordre." },
          { code: "var arr = [10, 20, 30];\narr.forEach(function(x) {\n  console.log(x);\n});\n// Affiche ___", answer: "10, 20, 30", hint: "Parcourt chaque élément." }
        ]
      },
      {
        type: "debug",
        debug: [
          { code: "var arr = [1, 2, 3];\nconsole.log(arr[3]);\n// affiche 3", answer: "var arr = [1, 2, 3];\nconsole.log(arr[2]);\n// affiche 3", hint: "Les index commencent à 0." },
          { code: "const arr = [1, 2, 3];\narr = [4, 5, 6];", answer: "// const empêche la réaffectation\n// Utilisez arr.push(4, 5, 6) à la place", hint: "const ne permet pas de réaffecter le tableau." },
          { code: "var arr = [3, 10, 2];\narr.sort();\n// arr[0] vaut 2", answer: "var arr = [3, 10, 2];\narr.sort((a, b) => a - b);\n// arr[0] vaut 2", hint: "sort() trie en chaînes par défaut." },
          { code: "class Voiture {\n  constructor(marque) {\n    marque = marque;\n  }\n}", answer: "class Voiture {\n  constructor(marque) {\n    this.marque = marque;\n  }\n}", hint: "Il manque this. devant la propriété." },
          { code: "var arr = [1, 2, 3];\narr.forEach(function(x) {\n  if (x === 2) break;\n});", answer: "var arr = [1, 2, 3];\nfor (var i = 0; i < arr.length; i++) {\n  if (arr[i] === 2) break;\n}", hint: "break ne fonctionne pas dans forEach." },
          { code: "var obj = {};\nobj.nom = 'Ali';\nobj = { age: 20 };\nconsole.log(obj.nom);", answer: "var obj = {};\nobj.nom = 'Ali';\nobj.age = 20;\nconsole.log(obj.nom);", hint: "obj = {} remplace tout l'objet." }
        ]
      }
    ]
  },

  /* ─── NIVEAU 5 : DOM en JavaScript ─── */
  {
    id: 5, title: "DOM", icon: "fa-window-restore",
    desc: "Accès, modification, attributs, styles et création d'éléments via le DOM.",
    difficulty: "Difficile", time: "12 min", questions: 16, status: "locked",
    sessions: [
      {
        type: "quiz",
        quiz: [
          { q: "Que signifie DOM ?", opts: ["Document Object Model", "Data Object Module", "Dynamic Object Model", "Document Oriented Management"], ans: 0, hint: "Arbre d'objets de la page HTML." },
          { q: "Sélectionner un élément par id ?", opts: ["querySelector('#id')", "getElementsByClassName()", "getElementById()", "getElement()"], ans: 2, hint: "getElementById('monId')." },
          { q: "Sélectionner UN élément par sélecteur CSS ?", opts: ["querySelectorAll()", "getElementsByTagName()", "querySelector()", "getElementById()"], ans: 2, hint: "querySelector('.maClasse')." },
          { q: "Modifier uniquement le texte ?", opts: ["innerHTML", "textContent", "innerText", "content"], ans: 1, hint: "Sans interpréter le HTML." },
          { q: "Insérer du HTML dans un élément ?", opts: ["textContent", "innerHTML", "htmlContent", "innerContent"], ans: 1, hint: "innerHTML interprète les balises." },
          { q: "Créer un nouvel élément ?", opts: ["document.new()", "document.add()", "document.createElement()", "document.make()"], ans: 2, hint: "createElement('div')." },
          { q: "Ajouter un enfant ?", opts: ["insert()", "addChild()", "appendChild()", "push()"], ans: 2, hint: "parent.appendChild(enfant)." },
          { q: "Écrire backgroundColor en JS ?", opts: ["background-color", "BackgroundColor", "backgroundColor", "background_color"], ans: 2, hint: "camelCase en JS." },
          { q: "Modifier un attribut HTML ?", opts: ["changeAttribute()", "setAttribute()", "modifyAttribute()", "editAttribute()"], ans: 1, hint: "setAttribute('src', 'image.png')." },
          { q: "Lire un attribut HTML ?", opts: ["readAttribute()", "getAttr()", "getAttribute()", "fetchAttribute()"], ans: 2, hint: "getAttribute('href')." },
          { q: "Sélectionner TOUS les éléments d'un sélecteur ?", opts: ["querySelector()", "getElementById()", "querySelectorAll()", "getAll()"], ans: 2, hint: "Retourne une NodeList." },
          { q: "Sélectionner par nom de balise ?", opts: ["getElementsByTagName()", "getTag()", "querySelectorTag()", "selectTag()"], ans: 0, hint: "getElementsByTagName('p')." },
          { q: "Supprimer un élément du DOM ?", opts: ["del el", "el.remove()", "document.remove(el)", "el.delete()"], ans: 1, hint: "el.remove() supprime directement." },
          { q: "Ajouter une classe CSS ?", opts: ["el.class.add()", "el.classList.add('c')", "el.addCLass()", "el.style.class = 'c'"], ans: 1, hint: "classList.add()." },
          { q: "Supprimer un attribut ?", opts: ["deleteAttribute()", "setAttribute(null)", "removeAttribute()", "clearAttribute()"], ans: 2, hint: "removeAttribute('id')." },
          { q: "Différence textContent vs innerHTML ?", opts: ["Aucune", "innerHTML interprète HTML, textContent non", "textContent plus lent", "innerHTML ne marche pas"], ans: 1, hint: "innerHTML interprète, textContent affiche brut." },
          { q: "Que retourne document.querySelectorAll() ?", opts: ["Un tableau (Array)", "Une NodeList", "Un objet unique", "Une chaîne HTML"], ans: 1, hint: "C'est une liste de nœuds, pas un vrai tableau." }
        ]
      },
      {
        type: "assoc",
        assoc: [
          { left: "getElementById", right: "Sélection par id" },
          { left: "querySelector", right: "Sélecteur CSS (1 élément)" },
          { left: "querySelectorAll", right: "Sélecteur CSS (tous)" },
          { left: "textContent", right: "Modifier le texte" },
          { left: "innerHTML", right: "Modifier le contenu HTML" },
          { left: "createElement", right: "Créer un nouvel élément" },
          { left: "appendChild", right: "Ajouter un enfant" },
          { left: "classList", right: "Gérer les classes CSS" },
          { left: "getElementsByClassName", right: "Sélection par classe" },
          { left: "getElementsByTagName", right: "Sélection par balise" },
          { left: "removeAttribute", right: "Supprimer un attribut" },
          { left: "classList.add", right: "Ajouter une classe" },
          { left: "classList.remove", right: "Retirer une classe" },
          { left: "el.remove()", right: "Supprimer du DOM" },
          { left: "style", right: "Modifier CSS inline" }
        ]
      },
      {
        type: "comp",
        completion: [
          { code: "document.___('titre')\n// Sélectionne id='titre'", answer: "getElementById", hint: "Méthode par id, sans #." },
          { code: "document.___('.btn')\n// Sélectionne premier .btn", answer: "querySelector", hint: "Sélecteur CSS." },
          { code: "var p = document.querySelector('p');\np.___ = 'Bonjour!';", answer: "textContent", hint: "Modifier le texte." },
          { code: "el.___('src', 'photo.png');\n// Modifie attribut src", answer: "setAttribute", hint: "Modifier un attribut." },
          { code: "el.style.___ = 'red';\n// CSS : color", answer: "color", hint: "Propriété CSS en JS." },
          { code: "var div = document.___('div');\n// Crée un <div>", answer: "createElement", hint: "Créer un élément." },
          { code: "parent.___(enfant);\n// Insère enfant", answer: "appendChild", hint: "Ajouter au DOM." },
          { code: "var items = document.___('li');\n// Tous les <li>", answer: "querySelectorAll", hint: "Sélection multiple." },
          { code: "el.classList.___('actif');\n// Ajoute classe", answer: "add", hint: "classList.add()." },
          { code: "el.classList.___('actif');\n// Retire classe", answer: "remove", hint: "classList.remove()." },
          { code: "el.___();\n// Supprime du DOM", answer: "remove", hint: "Méthode remove()." },
          { code: "el.___('href');\n// Lit attribut href", answer: "getAttribute", hint: "Lire un attribut." },
          { code: "el.___('class');\n// Supprime attribut class", answer: "removeAttribute", hint: "Supprimer un attribut." }
        ]
      },
      {
        type: "debug",
        debug: [
          { code: "var el = document.getElementById('.monId');", answer: "var el = document.getElementById('monId');", hint: "Pas de point avec getElementById." },
          { code: "var p = document.querySelector('p');\np.style.background-color = 'blue';", answer: "var p = document.querySelector('p');\np.style.backgroundColor = 'blue';", hint: "camelCase en JS : backgroundColor." },
          { code: "var el = document.querySelector('.btn');\nel.textContent = '<b>Cliquez</b>';\n// texte en gras", answer: "var el = document.querySelector('.btn');\nel.innerHTML = '<b>Cliquez</b>';\n// texte en gras", hint: "textContent n'interprète pas le HTML." },
          { code: "var btn = document.createElement('button');\nbtn.textContent = 'OK';\n// Rien n'apparaît", answer: "var btn = document.createElement('button');\nbtn.textContent = 'OK';\ndocument.body.appendChild(btn);", hint: "Créer un élément ne l'ajoute pas au DOM." },
          { code: "el.removeAttribute('class');\n// Objectif : changer la valeur de class", answer: "el.setAttribute('class', 'nouvelle');", hint: "setAttribute modifie, removeAttribute supprime." },
          { code: "el.style.fontSize = 16;", answer: "el.style.fontSize = '16px';", hint: "Les valeurs CSS doivent être des chaînes avec unité." }
        ]
      }
    ]
  },

  /* ─── NIVEAU 6 : Événements, POO, jQuery & AJAX ─── */
  {
    id: 6, title: "Événements, POO, jQuery & AJAX", icon: "fa-bolt",
    desc: "Gestion des événements, programmation orientée objet, jQuery et AJAX.",
    difficulty: "Difficile", time: "15 min", questions: 21, status: "locked",
    sessions: [
      {
        type: "quiz",
        quiz: [
          { q: "Qu'est-ce qu'un événement ?", opts: ["Variable", "Signal déclenché par action utilisateur ou navigateur", "Type de boucle", "Module JS"], ans: 1, hint: "Clic, saisie, chargement..." },
          { q: "Ajouter un gestionnaire d'événement ?", opts: ["el.on('click', fn)", "el.addEvent('click', fn)", "el.addEventListener('click', fn)", "el.listen('click', fn)"], ans: 2, hint: "addEventListener(type, fn)." },
          { q: "Les 3 phases du flux d'événements ?", opts: ["start, middle, end", "capture, cible, bouillonnement", "entrée, traitement, sortie", "avant, pendant, après"], ans: 1, hint: "Capture, cible, bubbling." },
          { q: "Que contient l'objet Event ?", opts: ["Le DOM complet", "Infos sur l'événement (target, type...)", "Classes CSS", "Données serveur"], ans: 1, hint: "event.target, event.type..." },
          { q: "Supprimer un gestionnaire ?", opts: ["el.removeEvent('click')", "el.deleteEventListener()", "el.removeEventListener('click', fn)", "el.offEvent()"], ans: 2, hint: "Même référence de fonction." },
          { q: "Que représente event.target ?", opts: ["Le document", "L'élément ciblé", "Le parent", "La fenêtre"], ans: 1, hint: "L'élément cliqué." },
          { q: "Qu'est-ce que le bouillonnement ?", opts: ["Descente vers cible", "Remontée vers parents", "Événement annulé", "Répétition en boucle"], ans: 1, hint: "Remontée après la cible." },
          { q: "Quel principe POO regroupe données et méthodes ?", opts: ["Héritage", "Polymorphisme", "Encapsulation", "Abstraction"], ans: 2, hint: "Regrouper et protéger." },
          { q: "Mot-clé pour l'héritage ?", opts: ["inherit", "prototype", "extends", "super"], ans: 2, hint: "class Chien extends Animal {}" },
          { q: "Que fait super() ?", opts: ["Méthode statique", "Appelle le constructeur parent", "Crée super objet", "Retourne this"], ans: 1, hint: "super() = constructor parent." },
          { q: "Qu'est-ce que jQuery ?", opts: ["Langage", "Bibliothèque JavaScript", "Framework CSS", "Serveur web"], ans: 1, hint: "Créée par John Resig en 2006." },
          { q: "Objectif principal de jQuery ?", opts: ["Remplacer JS", "Simplifier JS et compatibilité navigateurs", "Créer serveurs", "Gérer BDD"], ans: 1, hint: "Moins de code, plus de choses." },
          { q: "Qu'est-ce qu'AJAX ?", opts: ["Langage", "Framework", "Communication serveur sans rechargement", "Type de BDD"], ans: 2, hint: "Asynchronous JavaScript And XML." },
          { q: "Avantage principal d'AJAX ?", opts: ["Recharge rapide", "Mise à jour partielle sans rechargement", "Gère CSS", "Animations 3D"], ans: 1, hint: "Seule une partie mise à jour." },
          { q: "Qu'est-ce que le polymorphisme ?", opts: ["Même méthode, comportements différents", "Même nom de variable", "Classe sans méthode", "Objet sans propriété"], ans: 0, hint: "Comportements différents selon la classe." },
          { q: "Qu'est-ce que l'abstraction ?", opts: ["Masquer complexité, exposer l'essentiel", "Copier classe", "Supprimer méthodes", "Rendre immuable"], ans: 0, hint: "Utiliser sans connaître le fonctionnement." },
          { q: "Quel principe empêche l'accès direct aux données ?", opts: ["Héritage", "Polymorphisme", "Abstraction", "Encapsulation"], ans: 3, hint: "Champs privés avec #." },
          { q: "Inconvénient de jQuery aujourd'hui ?", opts: ["Trop complexe", "Moins utilisé face au JS moderne", "Incompatible", "Trop lent"], ans: 1, hint: "JS moderne intègre beaucoup de ses fonctionnalités." },
          { q: "Comment annuler le comportement par défaut d'un événement (ex: clic sur un lien) ?", opts: ["event.stop()", "event.preventDefault()", "event.cancel()", "return false"], ans: 1, hint: "Méthode de l'objet event." }
        ]
      },
      {
        type: "assoc",
        assoc: [
          { left: "addEventListener", right: "Ajouter gestionnaire" },
          { left: "removeEventListener", right: "Supprimer gestionnaire" },
          { left: "event.target", right: "Élément ciblé" },
          { left: "Capture", right: "Phase de descente" },
          { left: "Bubbling", right: "Phase de remontée" },
          { left: "Encapsulation", right: "Regrouper données+méthodes" },
          { left: "Héritage", right: "Réutiliser propriétés classe" },
          { left: "extends", right: "Mot-clé héritage" },
          { left: "jQuery", right: "Bibliothèque JS simplificatrice" },
          { left: "AJAX", right: "Serveur sans rechargement" },
          { left: "Polymorphisme", right: "Même méthode, comportements différents" },
          { left: "Abstraction", right: "Masquer complexité" },
          { left: "Champ privé (#)", right: "Accessible uniquement dans la classe" },
          { left: "super()", right: "Appelle constructeur parent" },
          { left: "class", right: "Modèle pour objets" },
          { left: "preventDefault()", right: "Annule le comportement par défaut" }
        ]
      },
      {
        type: "comp",
        completion: [
          { code: "btn.___('click', function() {\n  console.log('cliqué!');\n});", answer: "addEventListener", hint: "Ajouter écouteur." },
          { code: "btn.___('click', fn);\n// Arrête l'écoute", answer: "removeEventListener", hint: "Supprimer écouteur." },
          { code: "document.addEventListener('click', function(e) {\n  console.log(e.___);\n});", answer: "target", hint: "Élément cliqué." },
          { code: "class Animal {}\nclass Chien ___ Animal {}", answer: "extends", hint: "Héritage." },
          { code: "class Chien extends Animal {\n  constructor(nom) {\n    ___();\n    this.nom = nom;\n  }\n}", answer: "super", hint: "Constructeur parent." },
          { code: "// Regrouper données + méthodes = principe d'___", answer: "encapsulation", hint: "Pilier de la POO." },
          { code: "jQuery créé par John Resig en ___", answer: "2006", hint: "Année de création." },
          { code: "AJAX = Asynchronous JavaScript And ___", answer: "XML", hint: "Acronyme complet." },
          { code: "En POO, ___ regroupe données et méthodes", answer: "l'encapsulation", hint: "Pilier POO." },
          { code: "En POO, ___ permet d'hériter d'une autre classe", answer: "l'héritage", hint: "Réutiliser le code." },
          { code: "// AJAX met à jour ___ de la page", answer: "partiellement", hint: "Sans recharger tout." },
          { code: "class Personne {\n  #nom;\n  constructor(n) { this.#nom = n; }\n}\n// #nom est un champ ___", answer: "privé", hint: "Accessible uniquement dans la classe." }
        ]
      },
      {
        type: "debug",
        debug: [
          { code: "class Animal {\n  constructor(nom) { this.nom = nom; }\n}\nclass Chien extends Animal {\n  constructor(nom, race) {\n    this.race = race;\n    super(nom);\n  }\n}", answer: "class Animal {\n  constructor(nom) { this.nom = nom; }\n}\nclass Chien extends Animal {\n  constructor(nom, race) {\n    super(nom);\n    this.race = race;\n  }\n}", hint: "super() doit être AVANT this." },
          { code: "// jQuery est un langage créé pour remplacer JavaScript", answer: "// jQuery est une bibliothèque JavaScript qui simplifie le code", hint: "jQuery est une bibliothèque, pas un langage." },
          { code: "// AJAX recharge toute la page à chaque requête", answer: "// AJAX met à jour une partie de la page sans rechargement", hint: "L'avantage d'AJAX est l'absence de rechargement." },
          { code: "class Personne {\n  #nom;\n  constructor(nom) { this.#nom = nom; }\n}\nvar p = new Personne('Ali');\nconsole.log(p.#nom);", answer: "class Personne {\n  #nom;\n  constructor(nom) { this.#nom = nom; }\n  getNom() { return this.#nom; }\n}\nvar p = new Personne('Ali');\nconsole.log(p.getNom());", hint: "# = champ privé, inaccessible hors de la classe." },
          { code: "class Animal {}\nclass Chat extends Animal {}\nvar c = new Chat();\nc.parler();", answer: "class Animal {\n  parler() { return 'Son'; }\n}\nclass Chat extends Animal {}\nvar c = new Chat();\nc.parler();", hint: "parler() n'existe pas dans Animal." },
          { code: "document.querySelector('form').addEventListener('submit', function(e) {\n  e.stopPropagation();\n});", answer: "document.querySelector('form').addEventListener('submit', function(e) {\n  e.preventDefault();\n});", hint: "preventDefault empêche le rechargement de la page." }
        ]
      }
    ]
  }

];