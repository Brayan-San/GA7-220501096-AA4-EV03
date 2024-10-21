// Importa los módulos o de node.js
const express = require('express');
const path = require('path');

// Crea una instancia de la aplicación express.
const app = express();

// Define el puerto
const port = process.env.PORT || 1122;

// Sirve para mostar archivos estáticos 
app.use(express.static(path.join(__dirname, 'font-end-proyecto')));

app.use(express.static(path.join(__dirname, 'inicio-registro')));


app.get('/ver-login', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');  
    res.sendFile(path.join(__dirname, 'inicio-registro', 'login.html'));
});

app.get('/ver-login-css', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');  
    res.sendFile(path.join(__dirname, 'inicio-registro', 'login.css'));
});

// Ruta para mostrar el contenido plano
app.get('/ver-index', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');  
    res.sendFile(path.join(__dirname, 'font-end-proyecto', 'index.html'));
});
// Ruta para mostrar el contenido plano
app.get('/ver-css', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');  
    res.sendFile(path.join(__dirname, 'font-end-proyecto', 'styles.css'));
});
// Ruta para mostrar el contenido plano 
app.get('/ver-indexjs', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');  
    res.sendFile(path.join(__dirname, 'font-end-proyecto', 'indexjs.js'));
});
// Inicia el servidor
app.listen(port, () => {
    console.log(`El servidor se ejecuta en el puerto ${port}`);
});

//comando para ejecutar el puerto que quiero (set port=5550 && node servidor.js) - servidor por defecto (node servidor.js)