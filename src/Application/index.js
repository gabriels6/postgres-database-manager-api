const express = require('express');
const cors = require('cors');
const routes = require('../Controller/routes');
const Client = require('../Model/Data/Connection');
const app = express();


Client.connect();

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 3333);