const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const filtrosController = require('./src/controllers/filtrosController');
const jogoController = require('./src/controllers/jogoController');
const sobreController = require('./src/controllers/sobreController');
const cadastroController = require('./src/controllers/cadastroController');
const loginController = require('./src/controllers/loginController');
const minhacontaController = require('./src/controllers/minhacontaController');

const bodyParser = require('body-parser');
route.use(bodyParser.json());

//Rotas Pagina Inicial
route.get('/', homeController.paginaInicial);
//route.post('/', homeController.trataPost);

//Rota Sobre
route.get('/sobre', sobreController.paginaSobre);

//Rota Cadastro
route.get('/cadastro', cadastroController.pageRegister);
route.post('/cadastro', cadastroController.register);

//Rota Login
route.get('/login', loginController.paginaLogin)
route.post('/loginAuth', loginController.loginAuth)

//Rota jogo
route.get('/jogo', jogoController.paginaJogo)
route.post('/postJogoData', jogoController.postJogoData)

//Rota filtros
route.get('/filtros', filtrosController.paginaFiltros)
route.get('/getJogos', filtrosController.getJogos)

//Rota conta
route.get('/minhaconta', minhacontaController.paginaConta)
route.put('/editarDados', minhacontaController.editarDados)

module.exports = route;