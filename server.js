const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('dotenv').config();

require('./src/models/index');


app.get('/', (req, res) => {

    res.send(`Welcome to Transmilenio's MERN project`);
});


app.use(cors());

// Parse request of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


// Routes
app.use('/api/zonas', require('./src/routes/zone.routes'));
app.use('/api/estaciones', require('./src/routes/station.routes'));
app.use('/api/rutas', require('./src/routes/route.routes'));


const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {

    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});