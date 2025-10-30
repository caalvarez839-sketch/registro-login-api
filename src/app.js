// Importa dependencias
const express = require('express');
const app = express();

app.use(express.json());

// Usuarios de ejemplo
const usuarios = [
  { usuario: 'carlos', password: '1234' }
];

// Ruta de registro
app.post('/registro', (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({ mensaje: 'Debe ingresar usuario y contraseña.' });
  }
  if (usuarios.find(u => u.usuario === usuario)) {
    return res.status(409).json({ mensaje: 'El usuario ya existe.' });
  }
  usuarios.push({ usuario, password });
  res.status(201).json({ mensaje: 'Usuario registrado exitosamente.' });
});

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  const user = usuarios.find(u => u.usuario === usuario && u.password === password);
  if (user) {
    res.status(200).json({ mensaje: 'Autenticación satisfactoria.' });
  } else {
    res.status(401).json({ mensaje: 'Error en la autenticación.' });
  }
});

// Inicializa el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
