(function () {
  'use strict';

  /* ─── RÉCUPÉRER LE PSEUDO DÈS LE DÉBUT ─── */
  function getPseudo() {
    try { 
      return localStorage.getItem('jsquiz_pseudo') || 'Joueur'; 
    }
    catch (e) { 
      return 'Joueur'; 
    }
  }
  let pseudo = getPseudo();

  /* ─── CONSTANTES ─── */
  const LETTERS = ['A', 'B', 'C', 'D'];
  const EX_TYPES = [
    { key: 'quiz',  label: 'Quiz',       icon: 'fa-circle-question', desc: 'Questions à choix multiples.',            color: 'var(--purple-l)', bg: 'rgba(124,58,255,.1)',  bd: 'rgba(124,58,255,.2)'  },
    { key: 'assoc', label: 'Association', icon: 'fa-link',            desc: 'Reliez les concepts à leurs définitions.', color: 'var(--green)',    bg: 'rgba(34,212,142,.08)', bd: 'rgba(34,212,142,.15)' },
    { key: 'comp',  label: 'Complétion',  icon: 'fa-pen-to-square',   desc: 'Complétez les extraits de code.',          color: '#60a5fa',         bg: 'rgba(96,165,250,.08)', bd: 'rgba(96,165,250,.15)' },
    { key: 'debug', label: 'Débogage',    icon: 'fa-bug',             desc: 'Identifiez l\'erreur dans le code.',       color: 'var(--danger)',   bg: 'rgba(255,92,122,.08)', bd: 'rgba(255,92,122,.15)' }
  ];

  /* ─── CHEMINS AUDIO ─── */
  const SFX = {
    correct: 'assets/sounds/correct.mp3',
    perfect: 'assets/sounds/perfect.wav',
    wrong:   'assets/sounds/wrong.wav',
    win:     'assets/sounds/win.wav',
    coin:    'assets/sounds/coin.wav'
  };

  /* ─── IMAGES HIBOU ─── */
  const CHAR_IMAGES = {
    idle:      'assets/images/char_idle.png',
    happy:     'assets/images/char_happy.png',
    sad:       'assets/images/char_wrong.png',
    worried:   'assets/images/char_idle.png',
    celebrate: 'assets/images/char_celebrate.png'
  };

  const OWL_MSGS = {
    idle:    ['Tu peux le faire !', 'Concentre-toi...', 'Allez, courage !', 'Hou hou !', 'Je veille sur toi.'],
    correct: ['Bravo !', 'Excellent !', 'C\'est ça !', 'Parfait !', 'Génial !', 'Bien vu !'],
    wrong:   ['Oups...', 'Pas tout à fait.', 'Essaie encore !', 'Presque !', 'Réfléchis bien.'],
    timeout: ['Le temps !', 'Trop lent !', 'Dépêche-toi !'],
    win:     ['Champion !', 'Incroyable !', 'Fantastique !', 'Tu es le meilleur !', 'Magnifique !'],
    click:   ['Je ne dors pas, je réfléchis !', '*rotation de tête*', 'Hou hou !', 'Clique pendant le jeu pour de l\'aide !'],
    help:    ['Voici un indice...', 'Regarde bien...', 'Je t\'aide...'],
    skip:    ['Tu passes ? D\'accord...', 'Peut-être la prochaine...', 'Pas grave !']
  };

  /* ─── ÉTAT GLOBAL ─── */
  const S = {
    screen: 'levels',
    level: null,
    session: 0,
    qIdx: 0,
    stars: 0,
    streak: 0,
    helped: false,
    answered: false,
    timer: null,
    timeLeft: 0,
    timerEnabled: true,
    assocSel: null,
    assocMatch: [],
    assocRight: [],
    compDone: false,
    completed: {},
    globalStars: 0,
    globalCoins: 0
  };
  /* ─── UTILITAIRES ─── */

  // Raccourci pour document.getElementById
  function $(id) {
      return document.getElementById(id);
  }

  // Sélectionne un élément aléatoire dans un tableau
  function rand(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
  }

  // Mélange les éléments d'un tableau (Algorithme Fisher-Yates)
  function shuffle(inputArray) {
      const a = inputArray.slice();
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const t = a[i];
          a[i] = a[j];
          a[j] = t;
      }
      return a;
  }

  // Récupère un nombre spécifique d'éléments aléatoires sans doublons
  function pickRandom(arr, count) {
      if (arr.length <= count) {
          return shuffle(arr);
      }
      return shuffle(arr).slice(0, count);
  }

  // Système de coloration syntaxique pour les blocs de code
  function highlight(code) {
      var comments = [];
      var strings = [];

      /* 1. Protéger les commentaires pour ne pas colorer l'intérieur */
      code = code.replace(/(\/\/.*)/g, function(m) {
          comments.push(m);
          return '___CMT_' + (comments.length - 1) + '___';
      });

      /* 2. Protéger les chaînes de caractères */
      code = code.replace(/(["'`])(.*?)\1/g, function(m) {
          strings.push(m);
          return '___STR_' + (strings.length - 1) + '___';
      });

      /* 3. Colorer les mots-clés réservés du langage */
      code = code.replace(/\b(const|let|var|function|if|else|return|typeof|console|log|new|class|this|true|false|null|undefined|Number|String|Boolean|BigInt|Symbol|async|await|throw|try|catch|finally|for|while|do|switch|case|break|continue|default|of|in|yield)\b/g, '<span class="ck">$1</span>');

      /* 4. Colorer les nombres */
      code = code.replace(/\b(\d+)\b/g, '<span class="cn">$1</span>');

      /* 5. Restaurer et appliquer le style aux commentaires */
      for (var i = 0; i < comments.length; i++) {
          code = code.replace('___CMT_' + i + '___', '<span class="cc">' + comments[i] + '</span>');
      }

      /* 6. Restaurer et appliquer le style aux chaînes */
      for (var j = 0; j < strings.length; j++) {
          code = code.replace('___STR_' + j + '___', '<span class="cs">' + strings[j] + '</span>');
      }

      return code;
  }

  // Remplace les underscores par un placeholder visuel pour les exercices à trous
  function renderBlank(code) {
      return code.replace('___', '<span class="code-blank-pos" id="compBlankPos">?</span>');
  }

  /* ─── GLOBALS (Gestion du score et de l'économie) ─── */

  // Recalcule le total des étoiles et des pièces depuis la progression sauvegardée
  function recalcGlobals() {
      S.globalStars = 0;
      S.globalCoins = 0;
      for (const key in S.completed) {
          if (S.completed[key] && S.completed[key].done) {
              S.globalStars += S.completed[key].stars || 0;
          }
      }
      try {
          const savedCoins = localStorage.getItem('jsquiz_coins');
          if (savedCoins) {
              S.globalCoins = parseInt(savedCoins, 10) || 0;
          }
      } catch (e) {}
  }

  // Sauvegarde le montant des pièces dans le localStorage
  function saveCoins() {
      try {
          localStorage.setItem('jsquiz_coins', S.globalCoins);
      } catch (e) {}
  }

  /* ─── TOAST (Notifications flottantes) ─── */

  // Affiche une notification temporaire à l'utilisateur
  function toast(msg, type) {
      type = type || 'i';
      const icons = {
          s: 'fa-circle-check',
          e: 'fa-circle-xmark',
          i: 'fa-circle-info',
          w: 'fa-triangle-exclamation'
      };
      
      const container = $('globalToasts');
      if (!container) {
          return;
      }

      const el = document.createElement('div');
      el.className = 'toast ' + type;
      el.innerHTML = '<i class="fa-solid ' + (icons[type] || icons.i) + ' ti"></i><span>' + msg + '</span>';
      
      container.appendChild(el);

      // Animation d'entrée
      requestAnimationFrame(function () {
          requestAnimationFrame(function () {
              el.classList.add('show');
          });
      });

      // Animation de sortie et suppression après 3.2 secondes
      setTimeout(function () {
          el.classList.remove('show');
          setTimeout(function () {
              if (el.parentNode) {
                  el.parentNode.removeChild(el);
              }
          }, 400);
      }, 3200);
  }
  /* ══════════════════════════ MODALES ══════════════════════════ */

  // Ouvre une modale spécifique en cachant les autres contenus
  function openModal(id) {
      var contents = document.querySelectorAll('.m-content');
      for (var i = 0; i < contents.length; i++) {
          contents[i].classList.add('hidden');
      }
      var target = document.getElementById(id);
      if (target) {
          target.classList.remove('hidden');
      }
      $('mOverlay').classList.add('open');
  }

  // Ferme la modale active
  function closeModal() {
      $('mOverlay').classList.remove('open');
  }

  // Fermeture au clic sur l'overlay ou sur un élément avec l'attribut data-close-modal
  $('mOverlay').onclick = function (e) {
      if (e.target === this || e.target.hasAttribute('data-close-modal')) {
          closeModal();
      }
  };

  // Fermeture de la modale avec la touche Échap
  document.onkeydown = function (e) {
      if (e.key === 'Escape') {
          closeModal();
      }
  };

  // Configuration des clics pour les boutons d'aide, de sortie et de confirmation
  $('helpBtn').onclick = function () {
      openModal('modalHelp');
  };

  $('quitFloat').onclick = function () {
      openModal('modalQuit');
  };

  $('modalQuitConfirm').onclick = function () {
      closeModal();
      switchTrack('menu');
      showScreen('levels');
  };

  $('modalLockedGo').onclick = function () {
      closeModal();
      openIntro(LEVELS_DATA[0]);
  };

  /* ─── SON ─── */

  // Joue un effet sonore avec gestion du volume et des erreurs
  function playSfx(name) {
      let s = name;
      // Si l'utilisateur est sur une série (streak) de 3+, on joue le son "perfect"
      if (name === 'correct' && S.streak >= 3) {
          s = 'perfect';
      }
      try {
          const a = new Audio(SFX[s]);
          a.volume = 0.55;
          a.play().catch(function () {});
      } catch (e) {}
  }

  /* ─── CONFETTI ─── */

  // Génère une pluie de confetti colorés à l'écran
  function spawnConfetti(count) {
      const cols = ['#7c3aff', '#22d48e', '#f59e0b', '#ff5c7a', '#60a5fa', '#c4aaff'];
      for (let i = 0; i < count; i++) {
          const el = document.createElement('div');
          el.className = 'confetti';
          el.style.left = (Math.random() * 100) + 'vw';
          el.style.top = (Math.random() * 30 - 10) + 'vh';
          el.style.background = rand(cols);
          el.style.animationDelay = (Math.random() * 0.6) + 's';
          el.style.width = (Math.random() * 8 + 4) + 'px';
          el.style.height = (Math.random() * 8 + 4) + 'px';
          if (Math.random() > 0.5) {
              el.style.borderRadius = '0';
          }
          document.body.appendChild(el);
          // Auto-suppression de l'élément après l'animation
          (function (e) {
              setTimeout(function () {
                  if (e.parentNode) {
                      e.parentNode.removeChild(e);
                  }
              }, 2500);
          })(el);
      }
  }

  /* ─── SCORE FLOTTANT ─── */

  // Affiche un indicateur de score (+/-) qui s'élève et disparaît
  function floatScore(text, pos) {
      const el = document.createElement('div');
      el.className = 'float-score ' + (pos ? 'pos' : 'neg');
      el.textContent = text;
      document.body.appendChild(el);
      setTimeout(function () {
          if (el.parentNode) {
              el.parentNode.removeChild(el);
          }
      }, 1200);
  }

  /* ─── STREAK (Série de bonnes réponses) ─── */

  // Met à jour visuellement le badge de série de succès
  function updateStreak() {
      const el = $('streakBadge');
      if (!el) {
          return;
      }
      if (S.streak >= 3) {
          el.style.display = 'inline-flex';
          el.innerHTML = '<i class="fa-solid fa-fire"></i> x' + S.streak;
          el.style.animation = 'none';
          void el.offsetWidth; // Force le reflow pour relancer l'animation
          el.style.animation = 'streakPop .3s ease';
      } else {
          el.style.display = 'none';
      }
  }

  /* ═══════════════════════════════════════════════════════════
    HIBOU MASCOTTE (Interface et interactions)
    ═══════════════════════════════════════════════════════════ */

  let owlBubbleTimer = null;

  // Initialise l'élément de la mascotte dans le DOM
  function createOwl() {
      const w = document.createElement('div');
      w.className = 'owl-wrap hidden';
      w.id = 'owlWrap';

      const b = document.createElement('div');
      b.className = 'owl-bubble';
      b.id = 'owlBubble';
      w.appendChild(b);

      const img = document.createElement('img');
      img.className = 'owl-img';
      img.id = 'owlImg';
      img.src = 'assets/images/char_idle.png';
      img.alt = 'Personnage';
      w.appendChild(img);

      const lbl = document.createElement('div');
      lbl.className = 'owl-help-label';
      lbl.id = 'owlHelpLabel';
      lbl.innerHTML = '<i class="fa-solid fa-lightbulb"></i> Aide -5 \u2B50';
      w.appendChild(lbl);

      w.onclick = function () {
          owlClick();
      };
      document.body.appendChild(w);
  }

  // Gère l'affichage ou le masquage de la mascotte selon le contexte
  function owlShow(vis) {
      const w = $('owlWrap');
      if (!w) {
          return;
      }
      if (vis) {
          w.classList.remove('hidden');
          setTimeout(function () {
              owlReact('idle');
          }, 400);
          const lbl = $('owlHelpLabel');
          if (lbl) {
              lbl.style.display = 'block';
              lbl.innerHTML = S.stars >= 5
                  ? '<i class="fa-solid fa-lightbulb"></i> Cliquez pour aide <span class="owl-cost">-5 \u2B50</span>'
                  : '<i class="fa-solid fa-ban"></i> Pas assez d\'\u00E9toiles <span class="owl-cost-no">(min. 5)</span>';
          }
      } else {
          w.classList.add('hidden');
          w.classList.remove('happy', 'sad', 'worried', 'celebrate', 'idle');
      }
  }

  // Change l'animation et l'image de la mascotte selon son humeur
  function owlReact(mood) {
      const w = $('owlWrap');
      if (!w) {
          return;
      }
      w.classList.remove('happy', 'sad', 'worried', 'celebrate', 'idle');
      void w.offsetWidth;
      w.classList.add(mood);
      const img = $('owlImg');
      if (img) {
          img.src = CHAR_IMAGES[mood] || 'assets/images/char_idle.png';
      }
  }

  // Affiche une bulle de texte au-dessus de la mascotte
  function owlSay(text) {
      const b = $('owlBubble');
      if (!b) {
          return;
      }
      clearTimeout(owlBubbleTimer);
      b.textContent = text;
      b.classList.add('show');
      owlBubbleTimer = setTimeout(function () {
          b.classList.remove('show');
      }, 2800);
  }

  // Gère le clic sur la mascotte (demande d'aide contre étoiles)
  function owlClick() {
      if (S.screen !== 'ex') {
          owlSay(rand(OWL_MSGS.click));
          return;
      }
      if (S.helped) {
          owlSay('J\'ai d\u00E9j\u00E0 aid\u00E9 !');
          return;
      }
      if (S.stars < 5) {
          owlReact('sad');
          owlSay('Pas assez d\'\u00E9toiles ! Il te faut 5 \u2B50.');
          return;
      }

      // Détermination du type de session et des données actuelles
      const sType = S.level.sessions[S.session].type;
      const sData = S.level.sessions[S.session];
      let hint = 'R\u00E9fl\u00E9chis bien...';

      // Récupération de l'indice (hint) spécifique selon le type d'exercice
      if (sType === 'quiz') {
          const q = sData._questions[S.qIdx];
          if (q && q.hint) {
              hint = q.hint;
          }
      }
      if (sType === 'debug') {
          const q = sData._questions[S.qIdx];
          if (q && q.hint) {
              hint = q.hint;
          }
      }
      if (sType === 'comp') {
          const q = sData._questions[S.qIdx];
          if (q) {
              hint = q.hint || 'Compl\u00E8te le code.';
          }
      }
      if (sType === 'assoc') {
          hint = 'Associe les paires correctement.';
      }

      // Mise à jour de l'état suite à l'utilisation de l'aide
      S.helped = true;
      S.stars -= 5;
      S.streak = 0;
      updateStreak();
      refreshHeaderStars();

      /* --- Traitement automatique de la réponse selon le type --- */
      if (sType === 'quiz') {
          clearInterval(S.timer);
          S.answered = true;
          const opts = $('quizBody').querySelectorAll('.qcm-option');
          for (let i = 0; i < opts.length; i++) {
              opts[i].classList.add('disabled');
              if (i === sData._questions[S.qIdx].ans) {
                  opts[i].classList.add('correct');
              }
          }
          setTimeout(function () {
              S.qIdx++;
              if (S.qIdx < sData._questions.length) {
                  renderQuiz();
              } else {
                  showResult();
              }
          }, 2200);
      } else if (sType === 'debug') {
          clearInterval(S.timer);
          S.answered = true;
          const opts = $('debugBody').querySelectorAll('.qcm-option');
          for (let i = 0; i < opts.length; i++) {
              opts[i].classList.add('disabled');
              if (i === sData._questions[S.qIdx].ans) {
                  opts[i].classList.add('correct');
              }
          }
          setTimeout(function () {
              S.qIdx++;
              if (S.qIdx < sData._questions.length) {
                  renderDebug();
              } else {
                  showResult();
              }
          }, 2200);
      } else if (sType === 'comp') {
          S.compDone = true;
          const q = sData._questions[S.qIdx];
          const inp = $('compInp');
          inp.value = q.answer;
          inp.classList.add('correct');
          inp.disabled = true;
          $('compVal').disabled = true;
          $('compFb').className = 'comp-feedback ok';
          $('compFb').innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + q.answer;
          setTimeout(function () {
              S.qIdx++;
              if (S.qIdx < sData._questions.length) {
                  renderComp();
              } else {
                  showResult();
              }
          }, 2200);
      } else if (sType === 'assoc') {
          // L'association n'autorise pas d'aide directe
          owlSay('Pas d\'aide pour l\'association !');
          S.helped = false;
          S.stars += 5;
          refreshHeaderStars();
          return;
      }

      // Réaction visuelle et sonore finale
      playSfx('wrong');
      owlReact('sad');
      owlSay(hint);
      toast('Aide du hibou utilis\u00E9e. -5 \u2B50', 'w');
  }

  /* ══════════════════════════
    NAVIGATION (Gestion des écrans)
    ══════════════════════════ */
  function showScreen(name) {
      var isEx = (name === 'quiz' || name === 'assoc' || name === 'comp' || name === 'debug');
      S.screen = isEx ? 'ex' : name;
      
      // Reset du timer et nettoyage de la barre de progression
      clearInterval(S.timer);
      var oldBar = document.getElementById('timerBarWrap');
      if (oldBar) {
          oldBar.remove();
      }

      // Activation de l'écran cible
      var screens = document.querySelectorAll('.screen');
      for (var i = 0; i < screens.length; i++) {
          screens[i].classList.remove('active');
      }
      var el = $('screen-' + name);
      if (el) {
          el.classList.add('active');
      }

      // Gestion de la navigation principale
      var nav = $('mainNav');
      if (name === 'levels') {
          nav.classList.remove('hidden');
          renderLevels();
          updateStats();
      } else {
          nav.classList.add('hidden');
      }

      // Gestion des pistes audio selon l'écran
      var newTrack = null;
      if (name === 'levels') {
          newTrack = 'menu';
      } else if (isEx) {
          newTrack = 'play';
      }
      
      if (newTrack && newTrack !== currentTrack) {
          switchTrack(newTrack);
      } else if (name === 'result' && currentTrack) {
          stopAllMusic();
          currentTrack = null;
      }

      // Affichage/Masquage de la mascotte et du bouton quitter
      owlShow(isEx);
      var qf = $('quitFloat');
      if (qf) {
          if (isEx) {
              qf.classList.remove('hidden');
          } else {
              qf.classList.add('hidden');
          }
      }
  }

  /* ─── STATS (Mise à jour de l'interface utilisateur) ─── */
  function updateStats() {
      recalcGlobals();
      const sc = $('starCount');
      if (sc) {
          sc.textContent = S.globalStars;
      }
      const cc = $('coinCount');
      if (cc) {
          cc.textContent = S.globalCoins;
      }
      let done = 0;
      for (const k in S.completed) {
          if (S.completed[k] && S.completed[k].done) {
              done++;
          }
      }
      const ld = $('levelsDone');
      if (ld) {
          ld.textContent = done + ' / ' + LEVELS_DATA.length;
      }
      const pn = $('playerName');
      if (pn) {
          pn.textContent = pseudo;
      }
  }

  /* ─── HEADER / CONTEXT (Construction du HUD) ─── */
  function makeHeader(hasTimer) {
      const timerHtml = (hasTimer && S.timerEnabled) ? '<span class="ex-timer" id="exTimer">15s</span>' : '';
      const streakHtml = '<span class="streak-badge" id="streakBadge" style="display:none"><i class="fa-solid fa-fire"></i> x1</span>';
      const starsHtml = '<span class="ex-pseudo">' + pseudo + '</span>' + streakHtml + '<span class="ex-stars"><i class="fa-solid fa-star"></i> <span id="exStars">' + S.stars + '</span></span>';
      return '<span class="ex-logo"><span class="js">JS</span>Quiz</span><div class="ex-right">' + starsHtml + timerHtml + '</div>';
  }

  function makeContext() {
      const exType = EX_TYPES[S.session];
      const sessionData = S.level.sessions[S.session];
      let total, current;
      
      // Calcul de la progression selon le type de session
      if (exType.key === 'assoc') {
          total = sessionData._questions.length;
          current = S.assocMatch.length;
      } else {
          total = sessionData._questions.length;
          current = S.qIdx;
      }
      
      const percentProgress = Math.round(current / total * 100);
      const questionLabel = exType.key === 'assoc' ? 'Paire' : 'Question';
      
      return '<div class="ex-level-label">Niveau ' + S.level.id + ' : ' + S.level.title + ' — Session ' + (S.session + 1) + '</div>' +
          '<div class="ex-progress-row"><span class="ex-progress-label">' + exType.label + ' — ' + questionLabel + ' ' + (exType.key === 'assoc' ? current : current + 1) + ' / ' + total + '</span><span class="ex-progress-pct">' + percentProgress + '%</span></div>' +
          '<div class="ex-progress-bar-wrap"><div class="ex-progress-bar-fill" style="width:' + percentProgress + '%"></div></div>' +
          '<h2 class="ex-question-label" id="questionLabel"></h2>';
  }

  /* --- SKIP (Passer une question) --- */
  function skipHTML() {
      const ok = S.stars >= 5;
      return '<button class="skip-btn' + (ok ? '' : ' skip-disabled') + '" id="skipBtn"' + (ok ? '' : ' disabled') + '>' +
          '<i class="fa-solid fa-forward-step"></i> Passer' +
          '<span class="skip-cost">-5 \u2B50</span>' +
          (ok ? '' : '<span class="skip-no">Insuffisant</span>') +
      '</button>';
  }

  function bindSkip(nextFn) {
      setTimeout(function () {
          const btn = $('skipBtn');
          if (btn) {
              btn.onclick = function () {
                  S.stars -= 5;
                  S.streak = 0;
                  updateStreak();
                  floatScore('-5', false);
                  playSfx('wrong');
                  owlReact('sad');
                  owlSay(rand(OWL_MSGS.skip));
                  nextFn();
              };
          }
      }, 60);
  }

  /* ─── TIMER (Gestion du temps) ─── */

  // Démarre un compte à rebours avec barre de progression visuelle
  function startTimer(sec, onEnd) {
      S.timeLeft = sec;
      const el = document.getElementById('exTimer');
      if (!el) {
          return;
      }
      clearInterval(S.timer);

      // Création de la barre de progression si elle n'existe pas
      if (!document.getElementById('timerBarWrap')) {
          const bar = document.createElement('div');
          bar.id = 'timerBarWrap';
          bar.innerHTML = '<div id="timerBarFill"></div>';
          const scr = document.querySelector('.screen.active');
          if (scr) {
              scr.insertAdjacentElement('afterbegin', bar);
          }
      }

      const fill = document.getElementById('timerBarFill');
      const total = sec;

      // Fonction de mise à jour à chaque seconde
      function tick() {
          el.textContent = S.timeLeft + 's';
          el.classList.toggle('danger', S.timeLeft <= 5);
          if (fill) {
              fill.style.width = (S.timeLeft / total * 100) + '%';
              fill.style.background = S.timeLeft <= 5
                  ? 'linear-gradient(90deg,#ff5c7a,#ff8c7a)'
                  : 'linear-gradient(90deg,var(--purple),var(--purple-l))';
          }
          if (S.timeLeft <= 0) {
              clearInterval(S.timer);
              onEnd();
          }
      }

      tick();
      S.timer = setInterval(function () {
          S.timeLeft--;
          tick();
      }, 1000);
  }

  // Déclenche le timer uniquement si l'option est activée
  function maybeTimer(sec, onEnd) {
      if (S.timerEnabled) {
          startTimer(sec, onEnd);
      }
  }

  // Actualise l'affichage des étoiles dans le header
  function refreshHeaderStars() {
      const el = document.getElementById('exStars');
      if (el) {
          el.textContent = S.stars;
      }
  }

  /* ══════════════════════════
    GRILLE DE NIVEAUX
    ══════════════════════════ */

  // Génère dynamiquement les cartes de niveaux sur l'écran principal
  function renderLevels() {
      var g = $('levelsGrid');
      var html = '';

      for (var i = 0; i < LEVELS_DATA.length; i++) {
          var lv = LEVELS_DATA[i];
          var st = lv.status;
          var info = S.completed[lv.id] || {};
          var isDone = info.done;
          var earned = info.types || [];
          var hasProg = earned.length > 0;
          var starsHTML = '';
          var pi = '';
          var li = '';
          var ms = '';
          var cardState = '';

          // Construction de la rangée d'étoiles gagnées
          if (isDone || hasProg || st === 'playable') {
              for (var s = 0; s < 4; s++) {
                  starsHTML += s < earned.length
                      ? '<i class="fa-solid fa-star"></i>'
                      : '<i class="fa-regular fa-star"></i>';
              }
              starsHTML = '<div class="lc-star-row">' + starsHTML + '</div>';
          }

          // Détermination de l'état visuel de la carte (Jouable, Verrouillé, Bientôt)
          if (isDone) {
              pi = '<div class="lc-play-icon"><i class="fa-solid fa-redo" style="margin-left:1px;font-size:.75rem"></i></div>';
              cardState = 'playable';
          } else if (st === 'playable' || hasProg) {
              pi = '<div class="lc-play-icon"><i class="fa-solid fa-play" style="margin-left:2px"></i></div>';
              cardState = 'playable';
          } else if (st === 'locked') {
              li = '<div class="lc-lock-icon"><i class="fa-solid fa-lock"></i></div>';
              ms = 'style="opacity:.5"';
              cardState = 'locked';
          } else {
              starsHTML = '<span class="lc-badge bientot"><i class="fa-solid fa-clock" style="font-size:.55rem"></i> Bient\u00F4t</span>';
              ms = 'style="opacity:.5"';
              cardState = 'soon';
          }

          // Assemblage du HTML de la carte
          html += '<div class="level-card ' + cardState + '" data-lid="' + lv.id + '">' +
              '<div class="lc-top"><span class="lc-number">Niveau ' + lv.id + '</span>' + starsHTML + '</div>' +
              '<h3 class="lc-title">' + lv.title + '</h3><p class="lc-subtitle">' + lv.desc + '</p>' +
              pi + li + '</div>';
      }

      g.innerHTML = html;

      // Attribution des événements de clic sur chaque carte
      var cards = g.querySelectorAll('.level-card');
      for (var j = 0; j < cards.length; j++) {
          (function (card) {
              card.onclick = function () {
                  var lid = +card.getAttribute('data-lid');
                  var lv2 = null;
                  for (var k = 0; k < LEVELS_DATA.length; k++) {
                      if (LEVELS_DATA[k].id === lid) {
                          lv2 = LEVELS_DATA[k];
                          break;
                      }
                  }
                  if (!lv2) return;
                  var inf = S.completed[lv2.id] || {};
                  
                  if (lv2.status === 'playable' || inf.done || (inf.types && inf.types.length > 0)) {
                      openIntro(lv2);
                  } else if (lv2.status === 'locked') {
                      openModal('modalLocked');
                  } else {
                      toast('Bient\u00F4t disponible.', 'w');
                  }
              };
          })(cards[j]);
      }
  }

  /* ══════════════════════════
    INTRO NIVEAU
    ══════════════════════════ */

  // Configure l'écran d'introduction d'un niveau avant de commencer
  function openIntro(lv) {
      S.level = lv;
      S.session = 0;
      S.stars = 0;
      S.timerEnabled = true;
      S.streak = 0;

      $('introTitle').innerHTML = 'Niveau ' + lv.id + ' : <em>' + lv.title + '</em>';
      $('introDesc').textContent = lv.desc;
      $('timerToggle').checked = true;

      showScreen('intro');

      // Assignation des boutons de navigation de l'intro
      $('btnStartEx').onclick = function () {
          startExercise();
      };
      $('introBack').onclick = function () {
          showScreen('levels');
      };
      $('timerToggle').onchange = function () {
          S.timerEnabled = this.checked;
      };
  }

  /* ══════════════════════════
    PRÉPARER LES QUESTIONS
    ══════════════════════════ */

  // Sélectionne aléatoirement 5 questions parmi la banque de données du niveau
  function prepareSession() {
      const raw = S.level.sessions[S.session];
      const type = raw.type;
      if (type === 'quiz') {
          raw._questions = pickRandom(raw.quiz, 5);
      } else if (type === 'assoc') {
          raw._questions = pickRandom(raw.assoc, 5);
      } else if (type === 'comp') {
          raw._questions = pickRandom(raw.completion, 5);
      } else if (type === 'debug') {
          raw._questions = pickRandom(raw.debug, 5);
      }
  }

  /* ══════════════════════════
    START EXERCISE
    ══════════════════════════ */

  // Initialise l'état global et lance le premier type d'exercice
  function startExercise() {
      S.qIdx = 0;
      S.answered = false;
      S.compDone = false;
      S.assocSel = null;
      S.assocMatch = [];
      S.assocRight = [];
      S.helped = false;
      
      prepareSession();
      
      const type = S.level.sessions[S.session].type;
      if (type === 'quiz') {
          renderQuiz();
      } else if (type === 'assoc') {
          renderAssoc();
      } else if (type === 'comp') {
          renderComp();
      } else {
          renderDebug();
      }
  }

  /* ══════════════════════════
    QUIZ (QCM)
    ══════════════════════════ */

  // Affiche et gère la logique des questions à choix multiples
  function renderQuiz() {
      const data = S.level.sessions[S.session]._questions;
      const q = data[S.qIdx];
      
      $('quizHeader').innerHTML = makeHeader(true);
      $('quizContext').innerHTML = makeContext();
      document.getElementById('questionLabel').textContent = q.q;

      let h = '';
      for (let i = 0; i < q.opts.length; i++) {
          h += '<div class="qcm-option" data-i="' + i + '"><span class="letter">' + LETTERS[i] + '</span><span class="opt-text">' + q.opts[i] + '</span></div>';
      }
      
      $('quizBody').innerHTML = '<div class="qcm-options">' + h + '</div>' + skipHTML();
      
      showScreen('quiz');
      S.answered = false;
      S.helped = false;
      
      owlReact('idle');
      owlSay(rand(OWL_MSGS.idle));
      updateStreak();

      // Lancement du timer s'il est activé
      maybeTimer(15, function () {
          S.answered = true;
          playSfx('wrong');
          owlReact('worried');
          owlSay(rand(OWL_MSGS.timeout));
          quizAns(-1);
      });

      // Gestion du clic sur les options de réponse
      const opts = $('quizBody').querySelectorAll('.qcm-option');
      for (let j = 0; j < opts.length; j++) {
          (function (o) {
              o.onclick = function () {
                  if (S.answered) return;
                  S.answered = true;
                  clearInterval(S.timer);
                  quizAns(+o.getAttribute('data-i'));
              };
          })(opts[j]);
      }

      // Configuration du bouton passer (skip)
      bindSkip(function () {
          clearInterval(S.timer);
          S.answered = true;
          const so = $('quizBody').querySelectorAll('.qcm-option');
          for (let i = 0; i < so.length; i++) {
              so[i].classList.add('disabled');
              if (i === data[S.qIdx].ans) {
                  so[i].classList.add('correct');
              }
          }
          setTimeout(function () {
              S.qIdx++;
              if (S.qIdx < data.length) {
                  renderQuiz();
              } else {
                  showResult();
              }
          }, 1500);
      });
  }

  /* ─── QUIZ ANS (Traitement de la réponse au Quiz) ─── */

  // Gère les scores, les effets et la transition après une réponse au quiz
  function quizAns(sel) {
      const data = S.level.sessions[S.session]._questions;
      const q = data[S.qIdx];
      const opts = $('quizBody').querySelectorAll('.qcm-option');

      // Désactive les options et affiche visuellement la bonne/mauvaise réponse
      for (let i = 0; i < opts.length; i++) {
          opts[i].classList.add('disabled');
          if (i === q.ans) {
              opts[i].classList.add('correct');
          }
          if (i === sel && sel !== q.ans) {
              opts[i].classList.add('wrong');
          }
      }

      // Si la réponse est correcte
      if (sel === q.ans) {
          const bonus = S.streak >= 3 ? S.streak * 2 : 0;
          const pts = 20 + bonus;
          S.stars += pts;
          S.streak++;
          S.globalCoins += 1 + Math.floor(S.streak / 2);
          saveCoins();
          playSfx('correct');
          owlReact('happy');
          owlSay(rand(OWL_MSGS.correct));
          floatScore('+' + pts, true);
          if (S.streak >= 2) {
              floatScore('+1 pi\u00E8ce', true);
          }
      } else {
          // En cas d'erreur
          S.streak = 0;
          playSfx('wrong');
          owlReact('sad');
          owlSay(rand(OWL_MSGS.wrong));
      }

      updateStreak();
      refreshHeaderStars();

      // Passage à la question suivante après un court délai
      setTimeout(function () {
          S.qIdx++;
          if (S.qIdx < data.length) {
              renderQuiz();
          } else {
              showResult();
          }
      }, 1400);
  }

  /* ══════════════════════════
    ASSOCIATION (Relier les paires)
    ══════════════════════════ */

  // Affiche et gère la logique de l'exercice d'association
  function renderAssoc() {
      const data = S.level.sessions[S.session]._questions;

      // Initialisation des données au premier chargement
      if (S.qIdx === 0) {
          S.assocSel = null;
          S.assocMatch = [];
          S.assocRight = shuffle(data.map(function (item) {
              return item.right;
          }));
      }

      $('assocHeader').innerHTML = makeHeader(false);
      $('assocContext').innerHTML = makeContext();

      let lH = '', rH = '';

      // Génération de la colonne de gauche (Concepts)
      for (let i = 0; i < data.length; i++) {
          const m = S.assocMatch.indexOf(i) !== -1;
          lH += '<div class="assoc-item' + (m ? ' matched' : '') + (S.assocSel === i ? ' selected' : '') + '" data-side="l" data-i="' + i + '"' + (m ? ' style="pointer-events:none"' : '') + '>' + data[i].left + '</div>';
      }

      // Génération de la colonne de droite (Définitions)
      for (let j = 0; j < S.assocRight.length; j++) {
          const v = S.assocRight[j];
          let ml = -1;
          for (let k = 0; k < S.assocMatch.length; k++) {
              if (data[S.assocMatch[k]].right === v) {
                  ml = k;
                  break;
              }
          }
          const mr = ml !== -1;
          rH += '<div class="assoc-item' + (mr ? ' matched' : '') + '" data-side="r" data-i="' + j + '" data-v="' + v + '"' + (mr ? ' style="pointer-events:none"' : '') + '>' + v + '</div>';
      }

      $('assocBody').innerHTML = '<div class="assoc-container"><div><div class="assoc-col-title">Concepts</div><div class="assoc-col" id="aL">' + lH + '</div></div><div><div class="assoc-col-title">D\u00E9finitions</div><div class="assoc-col" id="aR">' + rH + '</div></div></div><div class="assoc-hint"><i class="fa-solid fa-feather-pointed"></i> Cliquez \u00E0 gauche, puis associez \u00E0 droite.</div>' + skipHTML();
      
      showScreen('assoc');
      owlReact('idle');
      owlSay('Relie les paires !');
      updateStreak();

      // Gestion des événements de clic pour les éléments de la grille
      const items = $('assocBody').querySelectorAll('.assoc-item');
      for (let n = 0; n < items.length; n++) {
          (function (item) {
              item.onclick = function () {
                  const side = item.getAttribute('data-side');
                  if (item.classList.contains('matched')) return;

                  if (side === 'l') {
                      // Sélection à gauche
                      const ls = $('assocBody').querySelectorAll('#aL .assoc-item');
                      for (let a = 0; a < ls.length; a++) {
                          ls[a].classList.remove('selected');
                      }
                      S.assocSel = +item.getAttribute('data-i');
                      item.classList.add('selected');
                  } else {
                      // Sélection à droite (Tentative de correspondance)
                      if (S.assocSel === null) {
                          toast("S\u00E9lectionnez d'abord un concept.", 'w');
                          return;
                      }
                      const cv = item.getAttribute('data-v');
                      const correct = data[S.assocSel].right;
                      const le = $('assocBody').querySelector('#aL .assoc-item[data-i="' + S.assocSel + '"]');

                      if (cv === correct) {
                          // Bonne paire
                          S.assocMatch.push(S.assocSel);
                          S.stars += 20;
                          S.streak++;
                          S.globalCoins += 1 + Math.floor(S.streak / 2);
                          saveCoins();
                          if (S.streak >= 2) {
                              floatScore('+1 pi\u00E8ce', true);
                          }
                          floatScore('+20', true);
                          le.classList.remove('selected');
                          le.classList.add('matched');
                          le.style.pointerEvents = 'none';
                          item.classList.add('matched');
                          item.style.pointerEvents = 'none';
                          S.assocSel = null;
                          updateStreak();
                          refreshHeaderStars();
                          $('assocContext').innerHTML = makeContext();
                          playSfx('correct');
                          owlReact('happy');
                          owlSay(rand(OWL_MSGS.correct));
                          if (S.assocMatch.length === data.length) {
                              setTimeout(function () {
                                  showResult();
                              }, 800);
                          }
                      } else {
                          // Mauvaise paire
                          S.streak = 0;
                          playSfx('wrong');
                          owlReact('sad');
                          owlSay(rand(OWL_MSGS.wrong));
                          updateStreak();
                          le.classList.add('wrong-flash');
                          item.classList.add('wrong-flash');
                          setTimeout(function () {
                              le.classList.remove('wrong-flash', 'selected');
                              item.classList.remove('wrong-flash');
                              S.assocSel = null;
                          }, 500);
                      }
                  }
              };
          })(items[n]);
      }
      bindSkip(function () {
          showResult();
      });
  }

  /* ══════════════════════════
    COMPLÉTION (Compléter le code)
    ══════════════════════════ */

  // Affiche et gère la logique de l'exercice où il faut remplir un vide dans le code
  function renderComp() {
      const data = S.level.sessions[S.session]._questions;
      const q = data[S.qIdx];

      $('compHeader').innerHTML = makeHeader(false);
      $('compContext').innerHTML = makeContext();
      document.getElementById('questionLabel').textContent = q.hint;

      $('compBody').innerHTML =
          '<div class="code-block" id="compCodeBlock">' + renderBlank(highlight(q.code)).replace(/\n/g, '<br>') + '</div>' +
          '<div class="comp-input-row" style="justify-content:center"><button class="comp-validate" id="compVal"> Valider</button></div>' +
          '<div class="comp-feedback" id="compFb"></div>' + skipHTML();
      
      showScreen('comp');
      S.compDone = false;
      S.helped = false;
      owlReact('idle');
      owlSay('Compl\u00E8te le code !');
      updateStreak();

      // Remplacement du marqueur par un véritable input après rendu du HTML
      setTimeout(function () {
          var blankSpan = document.getElementById('compBlankPos');
          if (!blankSpan) return;
          var inp = document.createElement('input');
          inp.type = 'text';
          inp.id = 'compInp';
          inp.className = 'code-blank-input';
          inp.placeholder = '...';
          inp.autocomplete = 'off';
          inp.spellcheck = false;
          blankSpan.parentNode.replaceChild(inp, blankSpan);
          inp.focus();
      }, 50);

      var btn = $('compVal');

      // Fonction interne pour valider la saisie de l'utilisateur
      function submit() {
          var inp = $('compInp');
          if (!inp || S.compDone) return;
          var val = inp.value.trim().toLowerCase();
          if (!val) {
              toast('Entrez une r\u00E9ponse.', 'w');
              inp.focus();
              return;
          }
          S.compDone = true;
          btn.disabled = true;

          if (val === q.answer.toLowerCase()) {
              // Bonne réponse
              S.stars += 20;
              S.streak++;
              S.globalCoins += 1 + Math.floor(S.streak / 2);
              saveCoins();
              floatScore('+20', true);
              if (S.streak >= 2) {
                  floatScore('+1 pi\u00E8ce', true);
              }
              playSfx('correct');
              owlReact('happy');
              owlSay(rand(OWL_MSGS.correct));
              inp.classList.add('correct');
              $('compFb').className = 'comp-feedback ok';
              $('compFb').innerHTML = '<i class="fa-solid fa-circle-check"></i> Correct !';
          } else {
              // Mauvaise réponse
              S.streak = 0;
              playSfx('wrong');
              owlReact('sad');
              owlSay(rand(OWL_MSGS.wrong));
              inp.classList.add('wrong');
              $('compFb').className = 'comp-feedback nok';
              $('compFb').innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Incorrect. R\u00E9ponse : <strong>' + q.answer + '</strong>';
          }
          updateStreak();
          refreshHeaderStars();
          inp.disabled = true;
          setTimeout(function () {
              S.qIdx++;
              if (S.qIdx < data.length) {
                  renderComp();
              } else {
                  showResult();
              }
          }, 1800);
      }

      btn.onclick = submit;

      // Permet de valider avec la touche Entrée
      setTimeout(function () {
          var inp2 = $('compInp');
          if (inp2) {
              inp2.onkeydown = function (e) {
                  if (e.key === 'Enter') {
                      submit();
                  }
              };
          }
      }, 80);
      // Liaison de la fonction "Passer" (Skip) pour l'exercice de complétion
      bindSkip(function () {
          S.compDone = true;
          var inp = $('compInp');
          if (inp) {
              inp.value = q.answer;
              inp.classList.add('correct');
              inp.disabled = true;
          }
          btn.disabled = true;
          $('compFb').className = 'comp-feedback ok';
          $('compFb').innerHTML = '<i class="fa-solid fa-circle-check"></i> R\u00E9ponse : ' + q.answer;
          setTimeout(function () {
              S.qIdx++;
              if (S.qIdx < data.length) {
                  renderComp();
              } else {
                  showResult();
              }
          }, 1800);
      });
  }

  /* ══════════════════════════
    DÉBOGAGE (Debug Mode)
    ══════════════════════════ */

  // Affiche un éditeur de code pour corriger des erreurs de syntaxe ou de logique
  function renderDebug() {
      const data = S.level.sessions[S.session]._questions;
      const q = data[S.qIdx];
      
      $('debugHeader').innerHTML = makeHeader(false);
      $('debugContext').innerHTML = makeContext();
      document.getElementById('questionLabel').textContent = 'Corrigez le code ci-dessous';

      // Rendu de l'éditeur personnalisé avec surcouche de coloration
      $('debugBody').innerHTML =
          '<div class="code-block" style="margin-bottom:1rem;font-size:.78rem;color:var(--muted)"><i class="fa-solid fa-circle-info" style="margin-right:.4rem"></i> ' + q.hint + '</div>' +
          '<div class="debug-editor-wrap" id="debugEditorWrap">' +
          '<pre class="debug-highlight" id="debugHighlight"></pre>' +
          '<textarea class="debug-editor" id="debugEditor" spellcheck="false" autocomplete="off">' + q.code + '</textarea>' +
          '</div>' +
          '<div class="comp-input-row" style="margin-top:1rem;max-width:560px;justify-content:center">' +
          '<button class="comp-validate" id="debugVal" style="width:auto;padding:.8rem 2rem">Vérifier </button>' +
          '</div>' +
          '<div class="comp-feedback" id="debugFb"></div>' + skipHTML();

      showScreen('debug');
      S.answered = false;
      S.helped = false;
      owlReact('idle');
      owlSay('Corrige le code !');
      updateStreak();

      const editor = $('debugEditor');
      const hl = $('debugHighlight');
      const wrap = $('debugEditorWrap');
      const btn = $('debugVal');

      // Synchronise le texte brut du textarea avec le rendu HTML coloré
      function syncHighlight() {
          hl.innerHTML = highlight(editor.value).replace(/\n/g, '<br>');
      }

      /* Initialisation de l'éditeur */
      syncHighlight();
      setTimeout(function () {
          editor.focus();
      }, 120);

      /* Événements de l'éditeur */
      editor.oninput = syncHighlight;

      // Aligne le défilement du calque de texte et du calque de coloration
      editor.onscroll = function () {
          hl.scrollTop = editor.scrollTop;
          hl.scrollLeft = editor.scrollLeft;
      };

      // Logique de validation du code corrigé
      function submit() {
          if (S.answered) return;
          const userCode = editor.value;
          if (!userCode.trim()) {
              toast('Écrivez du code.', 'w');
              editor.focus();
              return;
          }

          // Comparaison stricte (sans espaces et en minuscule) pour plus de souplesse
          const cleanUser = userCode.replace(/\s+/g, '').toLowerCase();
          const cleanAnswer = q.answer.replace(/\s+/g, '').toLowerCase();

          S.answered = true;
          btn.disabled = true;
          editor.readOnly = true;

          if (cleanUser === cleanAnswer) {
              // Succès du débogage
              S.stars += 20;
              S.streak++;
              S.globalCoins += 1 + Math.floor(S.streak / 2);
              saveCoins();
              floatScore('+20', true);
              if (S.streak >= 2) {
                  floatScore('+1 pi\u00E8ce', true);
              }
              playSfx('correct');
              owlReact('happy');
              owlSay(rand(OWL_MSGS.correct));
              wrap.classList.add('correct');
              $('debugFb').className = 'comp-feedback ok';
              $('debugFb').innerHTML = '<i class="fa-solid fa-circle-check"></i> Correct ! Code corrigé avec succès.';
          } else {
              // Échec du débogage
              S.streak = 0;
              playSfx('wrong');
              owlReact('sad');
              owlSay(rand(OWL_MSGS.wrong));
              wrap.classList.add('wrong');
              $('debugFb').className = 'comp-feedback nok';
              $('debugFb').innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Incorrect. La correction attendue :<br><pre class="debug-answer-preview">' + q.answer + '</pre>';
          }
          updateStreak();
          refreshHeaderStars();
          setTimeout(function () {
              S.qIdx++;
              if (S.qIdx < data.length) {
                  renderDebug();
              } else {
                  showResult();
              }
          }, 2500);
      }

      btn.onclick = submit;
      
      // Raccourci Ctrl+Entrée pour valider
      editor.onkeydown = function (e) {
          if (e.key === 'Enter' && e.ctrlKey) {
              submit();
          }
      };

      // Fonction passer pour le débogage
      bindSkip(function () {
          S.answered = true;
          editor.value = q.answer;
          syncHighlight();
          wrap.classList.add('correct');
          editor.readOnly = true;
          btn.disabled = true;
          $('debugFb').className = 'comp-feedback ok';
          $('debugFb').innerHTML = '<i class="fa-solid fa-circle-check"></i> Code corrigé : ' + q.answer;
          setTimeout(function () {
              S.qIdx++;
              if (S.qIdx < data.length) {
                  renderDebug();
              } else {
                  showResult();
              }
          }, 1800);
      });
  }

  /* ══════════════════════════
    RÉSULTAT (Fin de session)
    ══════════════════════════ */

  // Calcule et affiche le bilan final de la session actuelle
  function showResult() {
      clearInterval(S.timer);
      const sType = S.level.sessions[S.session].type;
      const sData = S.level.sessions[S.session];
      const typeData = sData._questions;
      
      // Calcul du pourcentage de réussite
      const maxStars = typeData.length * 20;
      const pct = Math.max(0, Math.round(S.stars / maxStars * 100));
      const perfect = pct >= 100;

      // Bonus pour session parfaite
      if (perfect) {
          S.stars += 30;
          floatScore('Perfect! +30', true);
          toast('Session parfaite ! Bonus +30 \u00E9toiles !', 's');
      }

      // Détermination du nombre d'étoiles gagnées (0 à 3)
      const earned = pct >= 80 ? 3 : pct >= 60 ? 2 : pct >= 40 ? 1 : 0;
      if (perfect) {
          S.globalCoins += 30;
          saveCoins();
      }

      // Effets sonores et réactions de la mascotte selon le résultat
      if (earned >= 2) {
          playSfx('win');
          owlReact('celebrate');
          owlSay(rand(OWL_MSGS.win));
          spawnConfetti(50);
      } else if (earned === 0) {
          playSfx('wrong');
          owlReact('sad');
      } else {
          playSfx('correct');
          owlReact('happy');
      }

      // Sélection de l'image et détermination des paramètres de fin de session
      const imgSrc = earned >= 2 ? 'assets/images/char_celebrate.png' : earned >= 1 ? 'assets/images/char_happy.png' : 'assets/images/char_wrong.png';
      const isLast = S.session >= S.level.sessions.length - 1;
      
      // Libellés et messages selon le type d'exercice et le score
      const labels = {
          quiz: 'Quiz termin\u00E9',
          assoc: 'Association termin\u00E9e',
          comp: 'Compl\u00E9tion termin\u00E9e',
          debug: 'D\u00E9bogage termin\u00E9'
      };
      
      const msgs = [
          'R\u00E9visez et r\u00E9essayez !',
          'Pas mal, continuez !',
          'Bon travail !',
          'Excellent !' + (perfect ? ' Session parfaite !' : '')
      ];

      /* --- Sauvegarde de la progression --- */
      if (earned >= 1 && sType) {
          const prev = S.completed[S.level.id] || {
              done: false,
              stars: 0,
              types: []
          };
          if (!prev.types) {
              prev.types = [];
          }
          if (prev.types.indexOf(sType) === -1) {
              prev.types.push(sType);
          }
          prev.stars = Math.max(prev.stars || 0, S.stars);
          // Si les 4 types d'exercices sont réussis, le niveau est marqué comme "fait"
          if (prev.types.length >= 4) {
              prev.done = true;
          }
          S.completed[S.level.id] = prev;
          try {
              localStorage.setItem('jsquiz_completed', JSON.stringify(S.completed));
          } catch (e) {}
      }

      /* --- Mise à jour de l'interface de résultat --- */
      $('resultHeader').innerHTML = makeHeader(false);
      setTimeout(function () {
          refreshHeaderStars();
      }, 60);

      $('resultIcon').querySelector('img').src = imgSrc;
      $('resultLabel').textContent = labels[sType];
      $('resultScore').innerHTML = S.stars + ' <span>\u2B50</span>';
      $('resultMsg').textContent = msgs[earned];

      // Génération visuelle des 3 étoiles du bilan
      var starsH = '';
      for (var i = 0; i < 3; i++) {
          starsH += '<i class="fa-solid fa-star result-star' + (i < earned ? ' earned' : '') + '" style="transition-delay:' + (i * .15) + 's"></i>';
      }
      $('resultStars').innerHTML = starsH;

      // Affiche le bouton "Réessayer" uniquement en cas d'échec
      $('retryBtn').classList.toggle('hidden', earned > 0);
      $('resultQuitBtn').classList.toggle('hidden', earned > 0);

      // Adapte le texte du bouton principal (Suivant ou Terminer)
      if (isLast) {
          $('resBtn').innerHTML = 'Terminer le niveau';
      } else {
          $('resBtn').innerHTML = 'Session ' + (S.session + 2);
      }

      showScreen('result');

      /* --- Gestion des actions du bilan --- */
      
      // Recommencer la session actuelle
      $('retryBtn').onclick = function () {
          S.qIdx = 0;
          S.stars = 0;
          S.streak = 0;
          S.answered = false;
          S.compDone = false;
          S.assocSel = null;
          S.assocMatch = [];
          S.assocRight = [];
          S.helped = false;
          const t = S.level.sessions[S.session].type;
          if (t === 'quiz') renderQuiz();
          else if (t === 'assoc') renderAssoc();
          else if (t === 'comp') renderComp();
          else renderDebug();
      };

      // Quitter vers la sélection des niveaux
      $('resultQuitBtn').onclick = function () {
          showScreen('levels');
      };

      // Passer à la session suivante ou finaliser le niveau
      $('resBtn').onclick = function () {
          if (isLast) {
              const prev = S.completed[S.level.id] || {};
              S.completed[S.level.id] = {
                  done: true,
                  stars: Math.max(prev.stars || 0, S.stars)
              };
              recalcGlobals();
              saveCoins();
              // Déverrouillage automatique du niveau suivant
              for (let n = 0; n < LEVELS_DATA.length; n++) {
                  if (LEVELS_DATA[n].id === S.level.id + 1 && LEVELS_DATA[n].status === 'locked') {
                      LEVELS_DATA[n].status = 'playable';
                  }
              }
              try {
                  localStorage.setItem('jsquiz_completed', JSON.stringify(S.completed));
                  localStorage.setItem('jsquiz_levels', JSON.stringify(LEVELS_DATA.map(function (l) {
                      return { id: l.id, status: l.status };
                  })));
              } catch (e) {}
              toast('Niveau ' + S.level.id + ' termin\u00E9 !', 's');
              showScreen('levels');
          } else {
              S.session++;
              startExercise();
          }
      };
  }

  /* ══════════════════════════
    MUSIQUE (Gestion de l'ambiance sonore)
    ══════════════════════════ */

  const audioTracks = {
      menu: $('bgMenu'),
      play: $('bgPlay'),
      win: $('bgWin')
  };

  let currentTrack = null;
  let isMusicOn = true;

  // Coupe toutes les pistes en cours
  function stopAllMusic() {
      for (const k in audioTracks) {
          if (audioTracks[k]) {
              try {
                  audioTracks[k].pause();
                  audioTracks[k].currentTime = 0;
              } catch (e) {}
          }
      }
  }

  // Alterne entre les pistes audio (Menu, Jeu, Victoire)
  function switchTrack(name) {
      if (currentTrack === name) return;
      stopAllMusic();
      currentTrack = name;
      if (isMusicOn && audioTracks[name]) {
          setTimeout(function () {
              if (currentTrack !== name) return;
              try {
                  audioTracks[name].volume = 0.1;
                  audioTracks[name].play().catch(function () {});
              } catch (e) {}
          }, 300);
      }
  }

  // Met à jour l'icône du bouton musique
  function updateMusicIcon() {
      const btn = $('musicBtn');
      if (!btn) return;
      const ico = btn.querySelector('i');
      if (!ico) return;
      if (isMusicOn) {
          ico.className = 'fa-solid fa-volume-high';
          btn.classList.add('music-on');
          btn.style.borderColor = '';
      } else {
          ico.className = 'fa-solid fa-volume-xmark';
          btn.classList.remove('music-on');
          btn.style.borderColor = 'rgba(255,92,122,.3)';
      }
  }

  // Relance la musique actuelle si autorisée
  function startMusic() {
      updateMusicIcon();
      if (isMusicOn && currentTrack && audioTracks[currentTrack]) {
          audioTracks[currentTrack].volume = 0.1;
          audioTracks[currentTrack].play().catch(function () {});
      }
  }

  // Toggle ON/OFF de la musique via bouton
  $('musicBtn').onclick = function () {
      isMusicOn = !isMusicOn;
      if (isMusicOn) {
          startMusic();
          toast('Musique activ\u00E9e', 'i');
      } else {
          stopAllMusic();
          updateMusicIcon();
          toast('Musique d\u00E9sactiv\u00E9e', 'i');
      }
  };

  /* --- RESET (Réinitialisation totale) --- */
  $('resetBtn').onclick = function () {
      openModal('modalReset');
  };

  $('modalResetConfirm').onclick = function () {
      try {
          localStorage.removeItem('jsquiz_pseudo');
          localStorage.removeItem('jsquiz_completed');
          localStorage.removeItem('jsquiz_levels');
          localStorage.removeItem('jsquiz_coins');
      } catch (e) {}
      stopAllMusic();
      closeModal();
      window.location.href = 'index.html';
  };

  /* ══════════════════════════
    NAVIGATION LANDING ↔ JEU
    ══════════════════════════ */

  // Affiche la page de jeu et masque l'intro
  function showGame() {
      var ps = $('pseudoSection');
      if (ps) {
          ps.style.visibility = 'hidden';
          ps.style.pointerEvents = 'none';
      }
      $('gamePage').style.display = 'flex';
      updateStats();
  }

  // Retourne à la page d'accueil (landing)
  function showLanding() {
      $('gamePage').style.display = 'none';
      var ps = $('pseudoSection');
      if (ps) {
          ps.style.visibility = 'visible';
          ps.style.pointerEvents = 'all';
      }
      window.scrollTo(0, 0);
  }

  /* ─── BOUTON COMMENCER ─── */
  $('btnStartLanding').onclick = function () {
      const inp = $('pseudoInput');
      const val = inp.value.trim();
      // Validation du pseudo
      if (!val) {
          toast('Veuillez entrer un pseudo.', 'e');
          inp.focus();
          inp.style.animation = 'none';
          void inp.offsetHeight;
          inp.style.animation = 'shake .5s ease';
          return;
      }
      if (val.length < 2) {
          toast('Le pseudo doit avoir au moins 2 caract\u00E8res.', 'e');
          inp.focus();
          return;
      }
      try {
          localStorage.setItem('jsquiz_pseudo', val);
      } catch (e) {}
      pseudo = val;
      toast('Bienvenue ' + val + ' !', 's');
      showGame();
  };

  // Filtrage des caractères spéciaux pour le pseudo
  $('pseudoInput').addEventListener('input', function () {
      this.value = this.value.replace(/[^a-zA-Z0-9_\-àâäéèêëïîôùûüÿçÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ\s]/g, '');
  });

  /* ─── INTERSECTION OBSERVER (Animations au scroll) ─── */
  const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
          if (entry.isIntersecting) {
              setTimeout(function () {
                  entry.target.classList.add('in');
              }, parseInt(entry.target.dataset.d) || 0);
              sectionObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.step, .about-card').forEach(function (el) {
      sectionObserver.observe(el);
  });

  /* ══════════════════════════
    CHARGEMENT PROGRESSION
    ══════════════════════════ */
  function loadProgress() {
      try {
          const sc = localStorage.getItem('jsquiz_completed');
          if (sc) {
              S.completed = JSON.parse(sc);
          }
          const sl = localStorage.getItem('jsquiz_levels');
          if (sl) {
              const map = JSON.parse(sl);
              for (let i = 0; i < map.length; i++) {
                  for (let j = 0; j < LEVELS_DATA.length; j++) {
                      if (LEVELS_DATA[j].id === map[i].id) {
                          LEVELS_DATA[j].status = map[i].status;
                          break;
                      }
                  }
              }
          }
      } catch (e) {}
  }

  /* ══════════════════════════
      INIT (Initialisation au chargement)
      ══════════════════════════ */

  // Charge la progression sauvegardée
  loadProgress();

  // Recalcule les statistiques globales (étoiles, pièces)
  recalcGlobals();

  // Affiche l'écran d'accueil par défaut
  showLanding();

  // Récupère et affiche le pseudo s'il existe en mémoire
  const saved = getPseudo();
  if (saved && saved !== 'Joueur') {
      $('pseudoInput').value = saved;
  }

  // Crée l'élément HTML de la mascotte
  createOwl();

  // Configure le bouton quitter flottant
  $('quitFloat').onclick = function () {
      openModal('modalQuit');
  };

  // Prépare la grille des niveaux et les compteurs
  renderLevels();
  updateStats();

  // Lance la musique d'ambiance après le délai du splash screen
  setTimeout(function() {
      switchTrack('menu');
      startMusic();
  }, 5500);

  /* ── Thème (Mode Clair / Sombre) ── */

  // Alterne le thème visuel et sauvegarde le choix
  function toggleTheme() {
      var c = document.documentElement.getAttribute('data-theme') || 'dark';
      var n = c === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', n);
      localStorage.setItem('jsquiz-theme', n);
  }

  // Écouteurs pour le changement de thème sur les différents écrans
  document.getElementById('themeTogglePseudo').addEventListener('click', toggleTheme);
  document.getElementById('themeToggleGame').addEventListener('click', toggleTheme);

  /* ── Splash Screen → Section Pseudo ── */
  (function() {
      var splash = document.getElementById('splash');
      var splashSec = document.getElementById('splashSection');
      var pseudoSec = document.getElementById('pseudoSection');
      
      if (!splash || !splashSec || !pseudoSec) {
          return;
      }

      document.body.classList.add('splash-active');

      // Petit effet sonore de transition
      try {
          var w = new Audio('assets/sounds/whoosh.mp3');
          w.volume = 0.6;
          w.play().catch(function(){});
      } catch(e) {}

      // Fonction pour terminer l'animation de démarrage
      function endSplash() {
          splash.classList.add('hide');
          document.body.classList.remove('splash-active');
          setTimeout(function() {
              splashSec.style.display = 'none';
              pseudoSec.classList.add('visible');
          }, 400);
      }

      // Fin automatique après 5.2s ou au clic
      setTimeout(endSplash, 5200);
      splash.onclick = endSplash;
  })();

  /* ── Pseudo : Validation par touche Entrée ── */
  (function() {
      var input = document.getElementById('pseudoInput');
      var btn = document.getElementById('btnStartLanding');
      
      if (!input || !btn) {
          return;
      }
      
      input.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
              btn.click();
          }
      });
  })();

  /* ── Starfield (Effet de fond étoilé animé) ── */
  (function(){
      var c = document.getElementById('starfield');
      if (!c) {
          return;
      }
      var x = c.getContext('2d');
      var stars = [];

      // Adapte la couleur des étoiles selon le thème actif
      function getColor() {
          return document.documentElement.getAttribute('data-theme') === 'light'
              ? '124,58,255' : '200,210,255';
      }

      // Recalcule la grille d'étoiles au redimensionnement
      function resize() {
          c.width = innerWidth;
          c.height = innerHeight;
          stars = [];
          var n = Math.floor(c.width * c.height / 4500);
          for (var i = 0; i < n; i++) {
              stars.push({
                  x: Math.random() * c.width,
                  y: Math.random() * c.height,
                  r: Math.random() * 1.5 + .3,
                  a: Math.random() * .8 + .2,
                  p: Math.random() * 6.28,
                  s: Math.random() * .005 + .002
              });
          }
      }

      // Anime le scintillement et dessine les étoiles
      function draw(t) {
          var tm = t * .001;
          var col = getColor();
          x.clearRect(0, 0, c.width, c.height);
          
          for (var i = 0; i < stars.length; i++) {
              var s = stars[i];
              var tw = Math.sin(tm * s.s * 200 + s.p) * .4 + .6;
              var a = Math.max(0, Math.min(1, s.a * tw));
              
              x.beginPath();
              x.arc(s.x, s.y, Math.max(.1, s.r), 0, 6.28);
              x.fillStyle = 'rgba(' + col + ',' + a + ')';
              x.fill();
          }

          // Effet rare d'étoile filante
          if (Math.random() < .003) {
              var sx = Math.random() * c.width;
              var sy = Math.random() * c.height * .5;
              var len = Math.random() * 90 + 40;
              var sg = x.createLinearGradient(sx, sy, sx + len, sy + len * .4);
              
              sg.addColorStop(0, 'rgba(' + col + ',0.85)');
              sg.addColorStop(1, 'rgba(' + col + ',0)');
              
              x.strokeStyle = sg;
              x.lineWidth = 1.5;
              x.beginPath();
              x.moveTo(sx, sy);
              x.lineTo(sx + len, sy + len * .4);
              x.stroke();
          }
          requestAnimationFrame(draw);
      }

      addEventListener('resize', resize, {passive:true});
      resize();
      requestAnimationFrame(draw);
  })();

})();