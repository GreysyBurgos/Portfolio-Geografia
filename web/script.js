// --- script.js ACTUALIZADO (MODO "SIN BOTÓN" SOPORTADO) ---

// 1. ANIMACIÓN SCROLL
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('show');
    });
});
document.querySelectorAll('.hidden').forEach(el => observer.observe(el));


// 2. SLIDER
document.querySelectorAll('.slider-card').forEach(card => {
    card.addEventListener('click', () => {
        const targetId = card.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            targetElement.style.transition = "transform 0.3s";
            targetElement.style.transform = 'scale(1.05)';
            setTimeout(() => targetElement.style.transform = 'scale(1)', 500);
        }
    });
});


// 3. GALERÍA 
const gridCards = document.querySelectorAll('.grid-card');
const modalOverlay = document.getElementById('project-modal');
const modalCloseBtn = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTag = document.getElementById('modal-tag');
const modalActions = document.getElementById('modal-actions');
const modalImageArea = document.querySelector('.modal-image-area');

gridCards.forEach(card => {
    card.addEventListener('click', () => {
        // --- 1. LEER DATOS ---
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const tag = card.getAttribute('data-tag');
        const imgSrc = card.getAttribute('data-img');

        // Enlaces
        const link1 = card.getAttribute('data-link1'); 
        const text1 = card.getAttribute('data-text1');
        const link2 = card.getAttribute('data-link2'); 
        const text2 = card.getAttribute('data-text2');
        const singleLink = card.getAttribute('data-link'); 
        const singleText = card.getAttribute('data-text');

        // --- 2. TEXTOS ---
        if(title) modalTitle.textContent = title;
        if(desc) modalDesc.textContent = desc;

        // --- 3. ETIQUETA ---
        if(tag) {
            modalTag.textContent = tag;
            modalTag.className = 'format-tag'; 
            if(tag === 'WebMap' || tag === 'Web') modalTag.classList.add('tag-webmap');
            else if(tag === 'PDF') modalTag.classList.add('tag-pdf');
            else modalTag.classList.add('tag-img');
        }

        // --- 4. IMAGEN ---
        if (imgSrc) {
            modalImageArea.innerHTML = `<img src="${imgSrc}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">`;
        } else {
            modalImageArea.innerHTML = '<span>Vista Previa</span>';
        }

        // --- 5. BOTONES (LÓGICA ACTUALIZADA) ---
        modalActions.innerHTML = ''; 

        if (link2) {
            // CASO A: Dos enlaces (P3, P7)
            if(link1) createBtn(link1, text1 || 'Ver Principal', modalActions);
            createBtn(link2, text2 || 'Ver Secundario', modalActions);

        } else {
            // CASO B: Un enlace o NINGUNO
            const finalLink = link1 || singleLink;
            
            // ¡AQUÍ ESTÁ EL CAMBIO!
            // Solo creamos el botón si realmente hay un enlace
            if (finalLink && finalLink !== '#') {
                const finalText = text1 || singleText || 'Ver Archivo / Mapa';
                createBtn(finalLink, finalText, modalActions);
            }
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });
});

function createBtn(url, text, container) {
    const btn = document.createElement('a');
    btn.href = url;
    btn.textContent = text;
    btn.className = 'modal-btn';
    if(url !== '#') btn.target = '_blank';
    container.appendChild(btn);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { 
    if (e.target === modalOverlay) closeModal(); 
});