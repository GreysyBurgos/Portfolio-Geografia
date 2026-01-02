// --- script.js ---

// 1. ANIMACIÓN SCROLL (APARICIÓN)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => observer.observe(el));


// 2. LÓGICA DEL SLIDER (Clic -> Bajar a la Galería)
const sliderCards = document.querySelectorAll('.slider-card');

sliderCards.forEach(card => {
    card.addEventListener('click', () => {
        // Obtenemos el ID del objetivo (ej: "p1") que está en el HTML
        const targetId = card.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Hacemos scroll suave hacia la tarjeta de la galería
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // EFECTO EXTRA: Hacemos que la tarjeta de la galería "salte" un poco
            // para que el usuario sepa que es esa.
            targetElement.style.transition = "transform 0.3s";
            targetElement.style.transform = 'scale(1.05)';
            setTimeout(() => {
                targetElement.style.transform = 'scale(1)';
            }, 500);
        }
    });
});


// 3. LÓGICA DE LA GALERÍA (Clic -> Abrir Pop-Up / Modal)
const gridCards = document.querySelectorAll('.grid-card');
const modalOverlay = document.getElementById('project-modal');
const modalCloseBtn = document.querySelector('.modal-close');

// Elementos dentro del modal
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTag = document.getElementById('modal-tag');

gridCards.forEach(card => {
    card.addEventListener('click', () => {
        // Obtener datos
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const tag = card.getAttribute('data-tag');

        // Rellenar modal
        if(title) modalTitle.textContent = title;
        if(desc) modalDesc.textContent = desc;
        if(tag) {
            modalTag.textContent = tag;
            // Resetear clases para el color
            modalTag.className = 'format-tag'; 
            if(tag === 'WebMap') modalTag.classList.add('tag-webmap');
            else if(tag === 'PDF') modalTag.classList.add('tag-pdf');
            else modalTag.classList.add('tag-img');
        }

        // Mostrar
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquear scroll página
    });
});

// Funciones para cerrar modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});