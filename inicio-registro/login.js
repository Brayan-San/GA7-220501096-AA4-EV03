document.addEventListener('DOMContentLoaded', function() {
    // Selecciona elementos del DOM
    const container = document.querySelector('.container');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('password-strength');
    const passwordMessage = document.getElementById('password-message');

    // Función para mostrar el formulario de registro
    function showRegister() {
        console.log('Mostrando registro');
        container.classList.add('show-register');
    }

    // Función para mostrar el formulario de inicio de sesión
    function showLogin() {
        console.log('Mostrando login');
        container.classList.remove('show-register');
    }

    // Añade event listener al enlace de registro
    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault(); 
        showRegister();
    });

    // Añade event listener al enlace de inicio de sesión
    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault(); 
        showLogin();
    });

    // Comprueba si se debe mostrar el formulario de registro al cargar la página
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('show') === 'register') {
        showRegister();
    }

    // Función para evaluar la fortaleza de la contraseña
    function checkPasswordStrength(password) {
        let strength = 0;
        let message = [];

        if (password.length < 8) {
            message.push("La contraseña debe tener al menos 8 caracteres.");
        } else {
            strength += 1;
        }

        if (!/[a-z]/.test(password)) {
            message.push("Incluye al menos una letra minúscula.");
        } else {
            strength += 1;
        }

        if (!/[A-Z]/.test(password)) {
            message.push("Incluye al menos una letra mayúscula.");
        } else {
            strength += 1;
        }

        if (!/[0-9]/.test(password)) {
            message.push("Incluye al menos un número.");
        } else {
            strength += 1;
        }

        if (!/[$@#&!]/.test(password)) {
            message.push("Incluye al menos un símbolo ($@#&!$%&)");
        } else {
            strength += 1;
        }

        let strengthClass = 'weak';
        if (strength >= 5) {
            strengthClass = 'strong';
            message = ["Contraseña fuerte!"];
        } else if (strength >= 3) {
            strengthClass = 'medium';
        }

        return { strengthClass, message };
    }

    // Event listener para el campo de contraseña
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const { strengthClass, message } = checkPasswordStrength(password);
            
            passwordStrength.className = 'password-strength ' + strengthClass;
            passwordMessage.innerHTML = message.join('<br>');
        });
    }

    console.log('Script cargado completamente');
});