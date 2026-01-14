// ...existing code...
/*
  viewer-p4.js
  - SOLO manipula la tarjeta p4 (selector [data-target="p4"], #p4)
  - No modifica otras fichas ni el HTML existente
  - Al click, asegura que el botón del modal abra fullmap-p4.html
*/
(function () {
    const FULLMAP_URL = 'Prac4/fullmap-p4.html';

    function ensureButton(modal, text) {
        const actions = modal.querySelector('#modal-actions') || modal.querySelector('.modal-actions');
        if (!actions) return null;

        // buscar botón existente con clase modal-btn (posible creación por script.js)
        let btn = actions.querySelector('.modal-btn');
        if (!btn) {
            // si no existe, crear un botón acorde (no rompe la lógica existente)
            btn = document.createElement('a');
            btn.className = 'modal-btn';
            btn.textContent = text || 'Ver Mapa';
            // estilos mínimos no invasivos
            btn.style.display = 'inline-block';
            btn.style.padding = '10px 16px';
            btn.style.borderRadius = '999px';
            btn.style.background = '#0a66ff';
            btn.style.color = '#fff';
            btn.style.textDecoration = 'none';
            btn.style.fontWeight = '600';
            btn.style.marginTop = '8px';
            actions.appendChild(btn);
        }
        return btn;
    }

    function onP4Click(e) {
        // evitar interferir con otros handlers
        // but allow propagation so modal open logic (existing) still runs
        const modal = document.getElementById('project-modal');
        if (!modal) return;

        // esperar a que otro script rellene el modal (si aplica)
        setTimeout(() => {
            const source = document.getElementById('p4');
            const text = source ? (source.getAttribute('data-text1') || 'Ver Mapa') : 'Ver Mapa';

            const btn = ensureButton(modal, text);
            if (!btn) return;

            btn.href = FULLMAP_URL;
            btn.target = '_blank';
            btn.rel = 'noopener';

            // si el script principal pone varios botones, preferimos el botón principal (.modal-btn)
            // no cambiamos título/descr/imagen para no interferir con script.js
        }, 140);
    }

    function init() {
        // solo targets p4 (tanto tarjeta de galería como tarjeta slider que apunte a p4)
        const triggers = document.querySelectorAll('[data-target="p4"], #p4');
        if (!triggers || triggers.length === 0) return;
        triggers.forEach(t => t.addEventListener('click', onP4Click, { passive: true }));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();