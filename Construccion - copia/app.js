const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Prueba_transport',
  password: '1234',
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos PostgreSQL');
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err);
  });

app.get('/', (req, res) => {
  res.render('index', { title: 'SleepShift Transports Reports' });
});

app.get('/conductores', (req, res) => {
  client.query('SELECT * FROM conductor', (err, result) => {
    if (err) {
      console.error('Error al consultar conductores:', err);
      res.status(500).send('Error al consultar conductores');
    } else {
      res.render('conductores', { conductores: result.rows });
    }
  });
});
app.post('/agregar-conductor', (req, res) => {
  const { nombre, dni, horasSueno } = req.body;

  // Realiza una consulta SQL para insertar el nuevo conductor en la base de datos
  const insertQuery = 'INSERT INTO conductor (nombre, dni, horas_de_sueno) VALUES ($1, $2, $3)';
  const values = [nombre, dni, horasSueno];

  client.query(insertQuery, values, (err, result) => {
      if (err) {
          console.error('Error al agregar el conductor:', err);
          res.status(500).send('Error al agregar el conductor');
      } else {
          res.status(200).send('Conductor agregado con éxito');
      }
  });
});
app.post('/eliminar-conductor', (req, res) => {
  const dniEliminar = req.body.dni;

  if (dniEliminar) {
    const deleteQuery = 'DELETE FROM conductor WHERE dni = $1';
    const values = [dniEliminar];

    client.query(deleteQuery, values, (err, result) => {
      if (err) {
        console.error('Error al eliminar el conductor:', err);
        res.status(500).send('Error al eliminar el conductor');
      } else {
        res.status(200).send('Conductor eliminado con éxito');
      }
    });
  } else {
    res.status(400).send('DNI del conductor no proporcionado en la solicitud.');
  }
});

app.post('/actualizar-conductor', (req, res) => {
  const dniActualizar = req.body.dni;
  const nombreNuevo = req.body.nombre;
  const dniNuevo = req.body.dniNuevo;
  const horasSuenoNuevo = req.body.horasSuenoNuevo;

  // Realiza la actualización en la base de datos
  const updateQuery = 'UPDATE conductor SET nombre = $1, dni = $2, horas_de_sueno = $3 WHERE dni = $4';
  const values = [nombreNuevo, dniNuevo, horasSuenoNuevo, dniActualizar];

  client.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el conductor:', err);
      res.status(500).send('Error al actualizar el conductor');
    } else {
      res.status(200).send('Conductor actualizado con éxito');
    }
  });
});

// Agrega una nueva ruta para "Viajes"
app.get('/viajes', (req, res) => {
  // Realiza una consulta SQL para obtener los datos de la tabla "viajes"
  client.query('SELECT * FROM viajes', (err, result) => {
      if (err) {
          console.error('Error al consultar los viajes:', err);
          res.status(500).send('Error al consultar los viajes');
      } else {
          // Renderiza una vista que muestre los datos de los viajes
          res.render('viajes', { viajes: result.rows });
      }
  });
});

app.post('/agregar-viaje', (req, res) => {
  const { lugarOrigen, lugarDestino, idViaje, minutosViaje } = req.body;

  if (!lugarOrigen || !lugarDestino || !idViaje || !minutosViaje) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  // Realiza una consulta SQL para insertar el nuevo viaje en la base de datos
  const insertQuery = 'INSERT INTO viajes (lugar_origen, lugar_destino, id_viaje, minutos_totales) VALUES ($1, $2, $3, $4)';
  const values = [lugarOrigen, lugarDestino, idViaje, minutosViaje];

  client.query(insertQuery, values, (err, result) => {
      if (err) {
          console.error('Error al agregar el viaje:', err);
          res.status(500).json({ error: 'Error al agregar el viaje' });
      } else {
          res.status(201).json({ message: 'Viaje agregado con éxito' });
      }
  });
});

app.post('/quitar-viaje', (req, res) => {
  const idViaje = req.body.idViaje;

  if (idViaje) {
      const deleteQuery = 'DELETE FROM viajes WHERE id_viaje = $1';
      const values = [idViaje];

      client.query(deleteQuery, values, (err, result) => {
          if (err) {
              console.error('Error al eliminar el viaje:', err);
              res.status(500).send('Error al eliminar el viaje');
          } else {
              res.status(200).send('Viaje eliminado con éxito');
          }
      });
  } else {
      res.status(400).send('ID de viaje no proporcionado en la solicitud.');
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

