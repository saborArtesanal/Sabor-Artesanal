// --- Autenticación simple para el panel de administración ---
function setupAdminAuth() {
    const loginForm = document.getElementById('admin-login-form');
    const adminPanel = document.getElementById('admin-panel');
    if (!loginForm || !adminPanel) return;
    loginForm.onsubmit = function (e) {
        e.preventDefault();
        const pass = document.getElementById('admin-password').value;
        if (pass === 'reposteria2025') {
            adminPanel.style.display = '';
            loginForm.style.display = 'none';
        } else {
            alert('Contraseña incorrecta');
        }
    };
}

// --- Configuración inicial de productos (si no hay en localStorage) ---
const defaultProducts = [];

function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : defaultProducts;
}

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// --- Renderizado de cards de productos ---
function renderProducts() {
    const products = getProducts();
    const container = document.getElementById('products-container');
    if (!container) return;
    container.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Imagen o carrusel de imágenes
        let images = [];
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            images = product.images;
        } else if (product.image) {
            images = [product.image];
        }
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

        // Botón eliminar
        const btn = document.createElement('button');
        btn.className = 'delete-btn';
        btn.setAttribute('data-id', product.id);
        btn.textContent = 'Eliminar';
        card.appendChild(btn);

        // Contenedor para el formulario de contraseña de eliminación
        const deleteForm = document.createElement('form');
        deleteForm.className = 'delete-confirm-form';
        deleteForm.style.display = 'none';
        deleteForm.innerHTML = `
          <input type="password" placeholder="Contraseña de administrador" class="delete-pass" required style="margin-top:0.5rem; padding:0.4rem; border-radius:6px; border:1px solid #80400044; background:#fff6ed; color:#804000;" />
          <button type="submit" style="margin-left:0.5rem; background:#804000; color:#fff6ed; border:none; border-radius:7px; padding:0.4rem 1rem; font-weight:bold;">Confirmar</button>
        `;
        card.appendChild(deleteForm);

        container.appendChild(card);
    });
}

// --- Panel de administración: agregar producto ---
function setupAdminPanel() {
    const form = document.getElementById('add-product-form');
    if (!form) return;
    // Solo permitir subir imagen local

    // Crear input file oculto
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';
    imageInput.multiple = true;
    imageInput.required = true;
    imageInput.id = 'custom-image-input';
    imageInput.style.display = 'none';
    form.insertBefore(imageInput, form.querySelector('button[type="submit"]'));

    // Botón personalizado
    const fileLabel = document.createElement('label');
    fileLabel.className = 'custom-file-label';
    fileLabel.setAttribute('for', 'custom-image-input');
    fileLabel.textContent = 'Elegir imagen';
    form.insertBefore(fileLabel, form.querySelector('button[type="submit"]'));

    // Mostrar nombre del archivo
    const fileNameSpan = document.createElement('span');
    fileNameSpan.className = 'file-name';
    form.insertBefore(fileNameSpan, form.querySelector('button[type="submit"]'));

    let uploadedImagesBase64 = [];

    imageInput.onchange = function (e) {
        const files = Array.from(e.target.files);
        uploadedImagesBase64 = [];
        if (files.length > 0) {
            fileNameSpan.textContent = files.map(f => f.name).join(', ');
            let loaded = 0;
            files.forEach((file, idx) => {
                const reader = new FileReader();
                reader.onload = function (evt) {
                    uploadedImagesBase64[idx] = evt.target.result;
                    loaded++;
                };
                reader.readAsDataURL(file);
            });
        } else {
            fileNameSpan.textContent = '';
            uploadedImagesBase64 = [];
        }
    };

    form.onsubmit = function (e) {
        e.preventDefault();
        const name = form.name.value.trim();
        const description = form.description.value.trim();
        const price = parseFloat(form.price.value);
        const images = uploadedImagesBase64.filter(Boolean);
        if (!name || !description || isNaN(price)) return;
        const products = getProducts();
        const newProduct = {
            id: Date.now(),
            name,
            description,
            price
        };
        if (images.length > 0) {
            newProduct.images = images;
        }
        products.push(newProduct);
        saveProducts(products);
        renderProducts();
        form.reset();
        uploadedImagesBase64 = [];
        fileNameSpan.textContent = '';
    };
}

// --- Eliminar producto ---
function setupDeleteButtons() {
    const container = document.getElementById('products-container');
    container.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            e.preventDefault();
            // Mostrar el formulario de contraseña debajo de la card
            const card = e.target.closest('.product-card');
            const form = card.querySelector('.delete-confirm-form');
            if (form.style.display === 'none') {
                form.style.display = 'flex';
                form.querySelector('.delete-pass').focus();
            } else {
                form.style.display = 'none';
            }
        }
    });

    // Manejar el submit del formulario de contraseña
    container.addEventListener('submit', function (e) {
        if (e.target.classList.contains('delete-confirm-form')) {
            e.preventDefault();
            const form = e.target;
            const pass = form.querySelector('.delete-pass').value;
            const card = form.closest('.product-card');
            const id = Number(card.querySelector('.delete-btn').getAttribute('data-id'));
            if (pass === 'reposteria2025') {
                let products = getProducts();
                products = products.filter(p => p.id !== id);
                saveProducts(products);
                renderProducts();
            } else {
                alert('Contraseña incorrecta. No se eliminó el producto.');
                form.querySelector('.delete-pass').value = '';
                form.querySelector('.delete-pass').focus();
            }
        }
    });
}

// --- Inicialización ---
window.onload = function () {
    if (!localStorage.getItem('products')) {
        saveProducts(defaultProducts);
    }
    renderProducts();
    setupAdminAuth();
    setupAdminPanel();
    setupDeleteButtons();
};
//ggg