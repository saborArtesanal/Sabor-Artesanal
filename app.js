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

        // Imagen solo si existe
        if (product.image) {
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.onerror = function () {
                this.style.display = 'none';
            };
            card.appendChild(img);
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

    let uploadedImageBase64 = '';

    imageInput.onchange = function (e) {
        const file = e.target.files[0];
        if (file) {
            fileNameSpan.textContent = file.name;
            const reader = new FileReader();
            reader.onload = function (evt) {
                uploadedImageBase64 = evt.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            fileNameSpan.textContent = '';
            uploadedImageBase64 = '';
        }
    };

    form.onsubmit = function (e) {
        e.preventDefault();
        const name = form.name.value.trim();
        const description = form.description.value.trim();
        const price = parseFloat(form.price.value);
        const image = uploadedImageBase64;
        if (!name || !description || isNaN(price) || !image) return;
        const products = getProducts();
        const newProduct = {
            id: Date.now(),
            name,
            description,
            price,
            image
        };
        products.push(newProduct);
        saveProducts(products);
        renderProducts();
        form.reset();
        uploadedImageBase64 = '';
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