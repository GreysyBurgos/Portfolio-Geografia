document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('p9');
  if (!card) return;

  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTag = document.getElementById('modal-tag');
  const modalActions = document.getElementById('modal-actions');
  const modalImageArea = document.querySelector('.modal-image-area');

  card.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();

    modalTitle.textContent = card.getAttribute('data-title') || 'Índices SAVI/EVI';
    modalDesc.textContent = card.getAttribute('data-desc') || 'Cargar EVI de ChasiBurgos.';

    // Etiqueta
    const tag = card.getAttribute('data-tag') || 'WebMap';
    modalTag.textContent = tag;
    modalTag.className = 'format-tag';
    if (tag === 'WebMap') modalTag.classList.add('tag-webmap');
    else if (tag === 'PDF') modalTag.classList.add('tag-pdf');
    else modalTag.classList.add('tag-img');

    // Preview placeholder
    modalImageArea.innerHTML = '<span>Vista Previa Índices</span>';

    // Botones: abrir la página que carga el EVI y la página que carga el SAVI
    modalActions.innerHTML = '';
    const btnEVI = document.createElement('a');
    btnEVI.href = 'Prac9/EVI_ChasiBurgos.html';
    btnEVI.textContent = 'Ver Mapa EVI ';
    btnEVI.className = 'modal-btn';
    btnEVI.target = '_blank';
    modalActions.appendChild(btnEVI);

    const btnSAVI = document.createElement('a');
    btnSAVI.href = 'Prac9/SAVI_ChasiBurgos.html';
    btnSAVI.textContent = 'Ver Mapa SAVI ';
    btnSAVI.className = 'modal-btn';
    btnSAVI.target = '_blank';
    modalActions.appendChild(btnSAVI);

    // Mostrar modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }, true);
});
