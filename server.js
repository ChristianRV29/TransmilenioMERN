const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('dotenv').config();


const db = require('./src/models');

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {

    console.log('Connected to the database!');
    }).catch(err => {

    console.log('Cannot connect to the database!', err);
    process.exit();
});

app.get('/', (req, res) => {

    res.send(`Welcome to Transmilenio's MERN project`);
});


app.use(cors());

// Parse request of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

require('./src/routes/zone.routes')(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT,() => {

    console.log(`Server run in port ${PORT}`);
});