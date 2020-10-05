const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('dotenv').config();

app.get('/', (req, res) => {

    res.send(`Welcome to Transmilenio's MERN project`);
});


app.use(cors());

// Parse request of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


const PORT = process.env.PORT || 3001;

app.listen(PORT,() => {

    console.log(`Server run in port ${PORT}`);
});