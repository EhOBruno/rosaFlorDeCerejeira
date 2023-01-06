const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const sobreController = require('./src/controllers/sobreController');

//Rotas Pagina Inicial
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);




//Rota Sobre
route.get('/sobre', sobreController.paginaSobre);



module.exports = route;