// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    // Recupera el carrito del almacenamiento local o crea uno vacío si no existe
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Selecciona todos los botones "Agregar al carrito"
    const btnAddCart = document.querySelectorAll('.btn-add-cart');
    // Selecciona el elemento del carrito en el DOM
    const carritoElement = document.getElementById('carrito');
    // Selecciona el elemento que muestra el contador de productos
    const contadorProductos = document.getElementById('contador-productos');
    // Selecciona el elemento que muestra el total a pagar
    const totalPagarElement = document.getElementById('total-pagar');
    // Selecciona el icono del carrito
    const iconCart = document.querySelector('.icon-cart');

    // Añade un evento de clic a cada botón "Agregar al carrito"
    btnAddCart.forEach(btn => {
        btn.addEventListener('click', agregarProducto);
    });

    // Añade un evento de clic al icono del carrito para mostrar/ocultar el carrito
    iconCart.addEventListener('click', () => {
        carritoElement.classList.toggle('hidden-cart');
    });

    // Función para agregar un producto al carrito
    function agregarProducto(event) {
        // Encuentra el elemento padre más cercano con la clase 'item'
        const item = event.target.closest('.item');
        // Obtiene el título del producto
        const titulo = item.querySelector('h2').textContent;
        
        // Obtiene el precio del producto y lo convierte a número
        const precioTexto = item.querySelector('.price').textContent;
        const precio = parseFloat(precioTexto.replace(/[^\d.]/g, '').replace('.', ''));

        // Busca si el producto ya está en el carrito
        const producto = carrito.find(producto => producto.titulo === titulo);

        // Si el producto ya está en el carrito, incrementa su cantidad
        if (producto) {
            producto.cantidad++;
        } else {
            // Si no, añade el producto al carrito
            carrito.push({ titulo, precio, cantidad: 1 });
        }

        // Actualiza la visualización del carrito
        actualizarCarrito();
        // Guarda el carrito en el almacenamiento local
        guardarCarrito();
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(event) {
        // Obtiene el título del producto a eliminar
        const titulo = event.target.closest('.cart-product').querySelector('.titulo-producto-carrito').textContent;
        // Encuentra el índice del producto en el carrito
        const index = carrito.findIndex(producto => producto.titulo === titulo);

        // Si el producto está en el carrito, lo elimina
        if (index !== -1) {
            carrito.splice(index, 1);
        }

        // Actualiza la visualización del carrito
        actualizarCarrito();
        // Guarda el carrito en el almacenamiento local
        guardarCarrito();
    }

    // Función para actualizar la visualización del carrito
    function actualizarCarrito() {
        // Limpia el contenido actual del carrito
        carritoElement.innerHTML = '';

        let totalPagar = 0;
        let totalProductos = 0;

        // Recorre cada producto en el carrito
        carrito.forEach(producto => {
            // Calcula el total a pagar y el total de productos
            totalPagar += producto.precio * producto.cantidad;
            totalProductos += producto.cantidad;

            // Crea un elemento para cada producto en el carrito
            const productoElement = document.createElement('div');
            productoElement.classList.add('cart-product');
            productoElement.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${producto.cantidad}</span>
                    <p class="titulo-producto-carrito">${producto.titulo}</p>
                    <span class="precio-producto-carrito">$${producto.precio.toLocaleString()}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
            // Añade un evento de clic al icono de cerrar para eliminar el producto
            productoElement.querySelector('.icon-close').addEventListener('click', eliminarProducto);
            // Añade el elemento del producto al carrito
            carritoElement.appendChild(productoElement);
        });

        // Crea y añade el elemento que muestra el total
        const totalElement = document.createElement('div');
        totalElement.classList.add('cart-total');
        totalElement.innerHTML = `
            <h3>Total:</h3>
            <span class="total-pagar">$${totalPagar.toLocaleString()}</span>
        `;
        carritoElement.appendChild(totalElement);

        // Crea y añade el botón de comprar
        const btnComprar = document.createElement('button');
        btnComprar.id = 'btn-comprar';
        btnComprar.textContent = 'Comprar';
        btnComprar.addEventListener('click', comprarProductos);
        carritoElement.appendChild(btnComprar);

        // Actualiza el contador de productos y el total a pagar en la interfaz
        contadorProductos.textContent = totalProductos;
        totalPagarElement.textContent = `$${totalPagar.toLocaleString()}`;
    }

    // Función para guardar el carrito en el almacenamiento local
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para procesar la compra
    function comprarProductos() {
        if (carrito.length === 0) {
            alert('No hay productos en el carrito');
            return;
        }

        alert(`Compra realizada por un total de ${totalPagarElement.textContent}`);

        // Vacía el carrito
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
    }

    // Carga el carrito al iniciar la página
    actualizarCarrito();
});