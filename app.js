// Productos: edita aquí para agregar más
const products = [
    {
        name: "Batidos",
        description: "de café o banano con leche.",
        price: 40.00,
        images: ["img/Batidos.png"]
    },
    {
        name: "Capuchino",
        description: "Delicioso capuchino con leche espumosa.",
        price: 35.00,
        images: ["img/capuchino.png"]
    },
    {
        name: "Pizza artesanal.",
        description: "Deliciosa pizza artesanal con ingredientes frescos.",
        price: 30.00,
        images: ["img/pizza artesanal.png"]
    },
    {
        name: "Trensas Dulces.",
        description: "Deliciosas trensas de pan dulce.",
        price: 25.00,
        images: ["img/trensas.png"]
    },
    {
        name: "Grisinis con ajonjolí",
        description: "Deliciosos grisinis con un toque de ajonjolí tostado.",
        price: 25.00,
        images: ["img/grisinis.png"]
    },
    {
        name: "Biscocho de piña.",
        description: "Delicioso biscocho de piña.",
        price: 30.00,
        images: ["img/Biscocho de piña.png"]
    },
    {
        name: "Pasteles personalizados",
        description: "sabor de chocolate, vainilla, tres leches, 900 la libra",
        price: 900.00,
        images: ["img/Pasteles.png", "img/Pasteles2.png",
            "img/Pasteles3.png", "img/Pasteles4.png",
            "img/Pasteles5.png", "img/Pasteles6.png",
            "img/Pasteles7.png", "img/Pasteles8.png"]
    },
    {
        name: "Pasteles de Boda.",
        description: "Pasteles de boda personalizados, 900 la libra",
        price: 900.00,
        images: ["img/Pasteles de Boda.png"]
    },
    // Agrega más productos aquí
];

function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    container.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.width = '300px'; // ancho fijo para la carta
        card.style.boxSizing = 'border-box';
        let images = Array.isArray(product.images) ? product.images : [];
        if (images.length > 0) {
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
            img.onerror = function () {
                this.onerror = null;
                this.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
            };
            img.onclick = function () {
                const modal = document.getElementById('img-modal');
                const modalImg = document.getElementById('img-modal-img');
                if (modal && modalImg) {
                    let current = 0;
                    modalImg.src = images[current];
                    modal.style.display = 'flex';
                    // Elimina flechas previas
                    let arrows = document.getElementById('img-modal-arrows');
                    if (arrows) arrows.remove();
                    if (images.length > 1) {
                        arrows = document.createElement('div');
                        arrows.id = 'img-modal-arrows';
                        arrows.style.display = 'flex';
                        arrows.style.justifyContent = 'center';
                        arrows.style.alignItems = 'center';
                        arrows.style.gap = '2.5em';
                        arrows.style.width = '100%';
                        arrows.style.position = 'absolute';
                        arrows.style.left = '0';
                        arrows.style.bottom = '14vh'; // subidas un poco
                        arrows.style.zIndex = '10002';
                        // Flecha izquierda
                        let leftBtn = document.createElement('button');
                        leftBtn.innerHTML = '<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="28" r="24" fill="rgba(40,30,20,0.8)"/><path d="M32 18L22 28L32 38" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                        leftBtn.style.background = 'none';
                        leftBtn.style.border = 'none';
                        leftBtn.style.borderRadius = '50%';
                        leftBtn.style.width = '56px';
                        leftBtn.style.height = '56px';
                        leftBtn.style.cursor = 'pointer';
                        leftBtn.style.display = 'flex';
                        leftBtn.style.alignItems = 'center';
                        leftBtn.style.justifyContent = 'center';
                        leftBtn.style.boxShadow = '0 4px 16px #0008';
                        leftBtn.onclick = function (e) {
                            e.stopPropagation();
                            current = (current - 1 + images.length) % images.length;
                            modalImg.src = images[current];
                        };
                        // Flecha derecha
                        let rightBtn = document.createElement('button');
                        rightBtn.innerHTML = '<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="28" r="24" fill="rgba(40,30,20,0.8)"/><path d="M24 18L34 28L24 38" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                        rightBtn.style.background = 'none';
                        rightBtn.style.border = 'none';
                        rightBtn.style.borderRadius = '50%';
                        rightBtn.style.width = '56px';
                        rightBtn.style.height = '56px';
                        rightBtn.style.cursor = 'pointer';
                        rightBtn.style.display = 'flex';
                        rightBtn.style.alignItems = 'center';
                        rightBtn.style.justifyContent = 'center';
                        rightBtn.style.boxShadow = '0 4px 16px #0008';
                        rightBtn.onclick = function (e) {
                            e.stopPropagation();
                            current = (current + 1) % images.length;
                            modalImg.src = images[current];
                        };
                        arrows.appendChild(leftBtn);
                        arrows.appendChild(rightBtn);
                        // Agrega el contenedor de flechas después de la imagen
                        modalImg.insertAdjacentElement('afterend', arrows);
                    }
                }
            };
            imgWrap.appendChild(img);
            // Ya no se agregan flechas aquí
            card.appendChild(imgWrap);
        }
        // Título
        const h3 = document.createElement('h3');
        h3.textContent = product.name;
        card.appendChild(h3);
        // Descripción
        const p = document.createElement('p');
        p.textContent = product.description;
        p.style.display = 'block';
        p.style.width = '100%';
        p.style.wordBreak = 'break-word';
        p.style.marginTop = '0.5em';
        card.appendChild(p);
        // Precio
        const price = document.createElement('span');
        price.className = 'price';
        price.textContent = `C$${product.price.toFixed(2)}`;
        card.appendChild(price);
        container.appendChild(card);
    });
}
window.onload = function () {
    renderProducts();
    // Modal para imagen grande
    if (!document.getElementById('img-modal')) {
        const modal = document.createElement('div');
        modal.id = 'img-modal';
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.7)';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '9999';
        modal.style.cursor = 'pointer';
        modal.innerHTML = '<span id="img-modal-close" style="position:absolute;top:30px;right:40px;font-size:2.2em;color:#fff;cursor:pointer;font-family:sans-serif;z-index:10001">&times;</span><img id="img-modal-img" style="max-width:90vw;max-height:80vh;border-radius:18px;box-shadow:0 4px 32px #0008;display:block;margin:auto;">';
        document.body.appendChild(modal);
        modal.onclick = function (e) {
            if (e.target === modal || e.target.id === 'img-modal-close') {
                modal.style.display = 'none';
                // Elimina flechas al cerrar
                let arrows = document.getElementById('img-modal-arrows');
                if (arrows) arrows.remove();
            }
        };
    }
    // Abrir logo en modal
    const logo = document.getElementById('main-logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.onclick = function () {
            const modal = document.getElementById('img-modal');
            const modalImg = document.getElementById('img-modal-img');
            if (modal && modalImg) {
                modalImg.src = logo.src;
                modal.style.display = 'flex';
            }
        };
    }
};
