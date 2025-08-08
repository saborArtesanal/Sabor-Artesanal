// --- Array de productos: el dueño edita aquí ---
// Cada producto puede tener varias imágenes (rutas relativas a la carpeta 'img/')
const products = [
    // Ejemplo:
    {
        name: "Pan",
        description: "variedad de pan",
        price: 20.00,
        images: ["img/01.jpg", "img/02.webp"]
    },
    {
        name: "Pan",
        description: "variedad de pan",
        price: 20.00,
        images: ["img/01.jpg", "img/02.webp"]
    },
];

// --- Renderizado de cards de productos ---
function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    container.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Imagen o carrusel de imágenes
        let images = Array.isArray(product.images) ? product.images : [];
        if (images.length > 0) {
            let current = 0;
            const imgWrap = document.createElement('div');
            imgWrap.className = 'product-img-carousel';
            imgWrap.style.position = 'relative';
            imgWrap.style.width = '100%';
            imgWrap.style.height = '200px';
            imgWrap.style.overflow = 'hidden';
            const img = document.createElement('img');
            img.src = images[0];
            img.alt = product.name;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '1em';
            img.style.cursor = 'pointer';
            img.onerror = function () { this.style.display = 'none'; };
            imgWrap.appendChild(img);
            // Flechas si hay más de una imagen
            if (images.length > 1) {
                const leftBtn = document.createElement('button');
                leftBtn.innerHTML = '&#8592;';
                leftBtn.style.position = 'absolute';
                leftBtn.style.left = '10px';
                leftBtn.style.top = '50%';
                leftBtn.style.transform = 'translateY(-50%)';
                leftBtn.style.background = 'rgba(255,255,255,0.7)';
                leftBtn.style.border = 'none';
                leftBtn.style.borderRadius = '50%';
                leftBtn.style.width = '2em';
                leftBtn.style.height = '2em';
                leftBtn.style.cursor = 'pointer';
                leftBtn.style.fontSize = '1.3em';
                leftBtn.onclick = function (e) {
                    e.stopPropagation();
                    current = (current - 1 + images.length) % images.length;
                    img.src = images[current];
                };
                imgWrap.appendChild(leftBtn);
                const rightBtn = document.createElement('button');
                rightBtn.innerHTML = '&#8594;';
                rightBtn.style.position = 'absolute';
                rightBtn.style.right = '10px';
                rightBtn.style.top = '50%';
                rightBtn.style.transform = 'translateY(-50%)';
                rightBtn.style.background = 'rgba(255,255,255,0.7)';
                rightBtn.style.border = 'none';
                rightBtn.style.borderRadius = '50%';
                rightBtn.style.width = '2em';
                rightBtn.style.height = '2em';
                rightBtn.style.cursor = 'pointer';
                rightBtn.style.fontSize = '1.3em';
                rightBtn.onclick = function (e) {
                    e.stopPropagation();
                    current = (current + 1) % images.length;
                    img.src = images[current];
                };
                imgWrap.appendChild(rightBtn);
            }
            // Modal para ver imagen grande y navegar
            imgWrap.addEventListener('click', function () {
                let modalIndex = current;
                const modalBg = document.createElement('div');
                modalBg.style.position = 'fixed';
                modalBg.style.top = 0;
                modalBg.style.left = 0;
                modalBg.style.width = '100vw';
                modalBg.style.height = '100vh';
                modalBg.style.background = 'rgba(0,0,0,0.7)';
                modalBg.style.display = 'flex';
                modalBg.style.alignItems = 'center';
                modalBg.style.justifyContent = 'center';
                modalBg.style.zIndex = 9999;
                const modalImg = document.createElement('img');
                modalImg.src = images[modalIndex];
                modalImg.style.maxWidth = '90vw';
                modalImg.style.maxHeight = '90vh';
                modalImg.style.borderRadius = '1em';
                modalImg.style.boxShadow = '0 8px 32px #0008';
                modalBg.appendChild(modalImg);
                if (images.length > 1) {
                    const leftBtn = document.createElement('button');
                    leftBtn.innerHTML = '&#8592;';
                    leftBtn.style.position = 'absolute';
                    leftBtn.style.left = '2vw';
                    leftBtn.style.top = '50%';
                    leftBtn.style.transform = 'translateY(-50%)';
                    leftBtn.style.background = 'rgba(255,255,255,0.7)';
                    leftBtn.style.border = 'none';
                    leftBtn.style.borderRadius = '50%';
                    leftBtn.style.width = '2.5em';
                    leftBtn.style.height = '2.5em';
                    leftBtn.style.cursor = 'pointer';
                    leftBtn.style.fontSize = '1.7em';
                    leftBtn.onclick = function (e) {
                        e.stopPropagation();
                        modalIndex = (modalIndex - 1 + images.length) % images.length;
                        modalImg.src = images[modalIndex];
                    };
                    modalBg.appendChild(leftBtn);
                    const rightBtn = document.createElement('button');
                    rightBtn.innerHTML = '&#8594;';
                    rightBtn.style.position = 'absolute';
                    rightBtn.style.right = '2vw';
                    rightBtn.style.top = '50%';
                    rightBtn.style.transform = 'translateY(-50%)';
                    rightBtn.style.background = 'rgba(255,255,255,0.7)';
                    rightBtn.style.border = 'none';
                    rightBtn.style.borderRadius = '50%';
                    rightBtn.style.width = '2.5em';
                    rightBtn.style.height = '2.5em';
                    rightBtn.style.cursor = 'pointer';
                    rightBtn.style.fontSize = '1.7em';
                    rightBtn.onclick = function (e) {
                        e.stopPropagation();
                        modalIndex = (modalIndex + 1) % images.length;
                        modalImg.src = images[modalIndex];
                    };
                    modalBg.appendChild(rightBtn);
                }
                modalBg.addEventListener('click', function () {
                    document.body.removeChild(modalBg);
                });
                document.body.appendChild(modalBg);
            });
            card.appendChild(imgWrap);
        }

        // Título
        const h3 = document.createElement('h3');
        h3.textContent = product.name;
        card.appendChild(h3);

        // Descripción
        const p = document.createElement('p');
        p.textContent = product.description;
        card.appendChild(p);

        // Precio
        const price = document.createElement('span');
        price.className = 'price';
        price.textContent = `$${product.price.toFixed(2)}`;
        card.appendChild(price);

        container.appendChild(card);
    });
}

// --- Ya no hay panel de administración ni formulario de agregar producto ---

// --- Ya no hay eliminación de productos desde la interfaz ---

// --- Inicialización ---
window.onload = function () {
    renderProducts();
};