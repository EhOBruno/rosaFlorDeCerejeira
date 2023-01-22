const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const sobreController = require('./src/controllers/sobreController');
const cadastroController = require('./src/controllers/cadastroController');
const loginController = require('./src/controllers/loginController');

//Rotas Pagina Inicial
route.get('/', homeController.paginaInicial);
//route.post('/', homeController.trataPost);




//Rota Sobre
route.get('/sobre', sobreController.paginaSobre);


//Rota Cadastro
route.get('/cadastro', cadastroController.pageRegister)
route.post('/cadastro', cadastroController.register)

//Rota Login

route.get('/login', loginController.paginaLogin)

module.exports = route;