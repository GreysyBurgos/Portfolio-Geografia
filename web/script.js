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
        const targetId = card.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Efecto de salto
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
const modalActions = document.getElementById('modal-actions'); // Contenedor de botones
const modalImageArea = document.querySelector('.modal-image-area'); // --- NUEVO: Área de la imagen ---

gridCards.forEach(card => {
    card.addEventListener('click', () => {
        // 1. Obtener datos básicos
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const tag = card.getAttribute('data-tag');
        const type = card.getAttribute('data-type');
        const imgSrc = card.getAttribute('data-img'); // --- NUEVO: Obtener ruta de imagen ---

        // 2. Rellenar textos
        if(title) modalTitle.textContent = title;
        if(desc) modalDesc.textContent = desc;

        // 3. Etiqueta de color
        if(tag) {
            modalTag.textContent = tag;
            modalTag.className = 'format-tag'; 
            if(tag === 'WebMap') modalTag.classList.add('tag-webmap');
            else if(tag === 'PDF') modalTag.classList.add('tag-pdf');
            else modalTag.classList.add('tag-img');
        }

        // 4. --- NUEVO: LÓGICA DE IMAGEN VS TEXTO ---
        if (imgSrc) {
            // Si la tarjeta tiene imagen (P3), inyectamos la etiqueta IMG
            // 'object-fit: cover' hace que la imagen rellene el hueco sin deformarse
            modalImageArea.innerHTML = `<img src="${imgSrc}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">`;
        } else {
            // Si NO tiene imagen, reseteamos al texto "Vista Previa"
            // Esto es vital para que las otras tarjetas no se queden con la foto anterior
            modalImageArea.innerHTML = '<span>Vista Previa</span>';
        }

        // 5. GENERACIÓN DE BOTONES (Lógica Dinámica)
        modalActions.innerHTML = ''; // Limpiar botones anteriores

        if (type === 'multi-pdf') {
            // --- CASO ESPECIAL: DOS BOTONES PDF ---
            const link1 = card.getAttribute('data-link1');
            const text1 = card.getAttribute('data-text1');
            const link2 = card.getAttribute('data-link2');
            const text2 = card.getAttribute('data-text2');

            // Crear Botón 1
            if(link1) {
                const btn1 = document.createElement('a');
                btn1.href = link1;
                btn1.textContent = text1 || 'Ver PDF 1';
                btn1.className = 'modal-btn';
                btn1.target = '_blank'; // Abre nueva pestaña
                modalActions.appendChild(btn1);
            }
            // Crear Botón 2
            if(link2) {
                const btn2 = document.createElement('a');
                btn2.href = link2;
                btn2.textContent = text2 || 'Ver PDF 2';
                btn2.className = 'modal-btn';
                btn2.target = '_blank'; // Abre nueva pestaña
                modalActions.appendChild(btn2);
            }

        } else {
            // --- CASO NORMAL: UN SOLO BOTÓN ---
            const btn = document.createElement('a');
            btn.href = '#'; 
            btn.textContent = 'Ver Archivo / Mapa';
            btn.className = 'modal-btn';
            modalActions.appendChild(btn);
        }

        // 6. Mostrar Modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
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