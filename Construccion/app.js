const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Establece EJS como motor de plantillas
app.use(express.static('public'));

// Define una ruta que renderiza la vista index.ejs con la variable "title"
app.get('/', (req, res) => {
  res.render('index', { title: 'SleepShift Transports Reports' });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
