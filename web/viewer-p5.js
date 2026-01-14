// ...existing code...
(function () {
    const FULLMAP_URL = 'fullmap-p5.html';

    function ensureButton(modal, text) {
        const actions = modal.querySelector('#modal-actions') || modal.querySelector('.modal-actions');
        if (!actions) return null;
        let btn = actions.querySelector('.modal-btn');
        if (!btn) {
            btn = document.createElement('a');
            btn.className = 'modal-btn';
            btn.textContent = text || 'Ver Mapa';
            btn.style.display = 'inline-block';
            btn.style.padding = '10px 16px';
            btn.style.borderRadius = '999px';
            btn.style.background = '#0a66ff';
            btn.style.color = '#fff';
            btn.style.textDecoration = 'none';
            btn.style.fontWeight = '600';
            btn.style.marginTop = '8px';
            actions.appendChild(btn);
        } else {
            if (text) btn.textContent = text;
        }
        return btn;
    }

    function onP5Click() {
        const modal = document.getElementById('project-modal');
        if (!modal) return;

        // Esperar a que tu script principal rellene el modal (si aplica) y luego ajustar el botón
        setTimeout(() => {
            const source = document.getElementById('p5');
            const text = source ? (source.getAttribute('data-text1') || 'Ver Mapa Severidad') : 'Ver Mapa';
            const btn = ensureButton(modal, text);
            if (!btn) return;
            btn.href = FULLMAP_URL;
            btn.target = '_blank';
            btn.rel = 'noopener';
        }, 140);
    }

    function init() {
        const triggers = document.querySelectorAll('[data-target="p5"], #p5');
        if (!triggers || triggers.length === 0) return;
        triggers.forEach(t => t.addEventListener('click', onP5Click, { passive: true }));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();