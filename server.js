const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const middlewares = require('./controller/middlewares');
const routes = require('./routes/routes');

app.use(middlewares.checkApikey);

//Pour pouvoir recevoir et traiter du JSON sur les points d’entrée
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`Le serveur est opérationnel sur le port ${port}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

app.use('/api', routes);

//Demarer le serveur et ecouter sur le port 8000
app.listen(port, () => {
    console.log(`Le serveur est opérationnel sur le port ${port}`);
});

