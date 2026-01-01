// --- script.js ---

// 1. ANIMACIÓN DE APARICIÓN AL HACER SCROLL
// Usamos IntersectionObserver para detectar cuando un elemento entra en pantalla
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

// Seleccionamos todos los elementos con la clase 'hidden' para observarlos
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => observer.observe(el));

// 2. FUTURA LÓGICA PARA LEAFLET
// Aquí añadiremos el código para cargar los mapas JSON o GeoJSON
console.log("Portafolio TIG cargado correctamente.");