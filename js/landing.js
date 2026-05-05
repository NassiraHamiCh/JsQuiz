// Fonction auto-exécutée pour appliquer le thème dès le chargement de la page
(function(){

    var t = localStorage.getItem('jsquiz-theme');
    
    if (t) document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.setAttribute('data-theme', 'light');
})();

// Fonction pour basculer entre le mode clair et le mode sombre
function toggleTheme() {
    var c = document.documentElement.getAttribute('data-theme') || 'light';
    var n = c === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', n);
    localStorage.setItem('jsquiz-theme', n);
}

(function(){
    /* --- Starfield (Arrière-plan étoilé) --- */
    var c = document.getElementById('starfield');
    if (!c) return;
    var x = c.getContext('2d'), stars = [];

    // Ajuste la taille du canvas et génère les étoiles selon la surface
    function resize(){
        c.width = innerWidth; c.height = innerHeight; 
        stars = [];
        var n = Math.floor(c.width * c.height / 6000);
        for (var i = 0; i < n; i++) stars.push({
            x: Math.random()*c.width, 
            y: Math.random()*c.height,
            r: Math.random()*1.2+.2, 
            a: Math.random()*.2+.05,
            p: Math.random()*6.28, 
            s: Math.random()*.003+.001
        });
    }

    // Dessine et anime l'effet de scintillement des étoiles
    function draw(t){
        var tm = t*.001;
        x.clearRect(0, 0, c.width, c.height);
        for (var i = 0; i < stars.length; i++){
            var s = stars[i], 
                tw = Math.sin(tm*s.s*200+s.p)*.4+.6,
                a = Math.max(0, Math.min(1, s.a*tw));
            x.beginPath(); 
            x.arc(s.x, s.y, Math.max(.1, s.r), 0, 6.28);
            x.fillStyle = 'rgba(124,58,255,'+a+')'; 
            x.fill();
        }
        requestAnimationFrame(draw);
    }
    addEventListener('resize', resize, {passive:true});
    resize(); 
    requestAnimationFrame(draw);

    /* --- Intersection Observer (Apparition au scroll) --- */
    var targets = document.querySelectorAll('.step, .about-card');
    if (targets.length) {
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) {
                    // Ajoute la classe 'in' avec un délai optionnel quand l'élément devient visible
                    var d = parseInt(e.target.getAttribute('data-d')) || 0;
                    setTimeout(function() { 
                            e.target.classList.add('in'); 
                        }, d);
                    obs.unobserve(e.target); // Stop l'observation après l'animation
                }
            });
        }, {threshold: .15});
        targets.forEach(function(el) { obs.observe(el); });
    }

    /* --- Animations d'entrée (Fade In au chargement) --- */
    var af = document.querySelectorAll('.anim-fade');
    af.forEach(function(el) {
        var d = parseInt(el.getAttribute('data-anim')) || 0;

        el.style.opacity = '0'; el.style.transform = 'translateY(24px)';

        setTimeout(function() {
            el.style.transition = 'opacity .7s ease, transform .7s ease';
            el.style.opacity = '1'; el.style.transform = 'translateY(0)';
        }, 200 + d);
    });

    /* --- Nav scroll (Changement de style de la barre de navigation) --- */
    var nav = document.getElementById('landingNav');
    if (nav) addEventListener('scroll', function() {
        nav.classList.toggle('scrolled', scrollY > 60);
    }, {passive:true});
})();
