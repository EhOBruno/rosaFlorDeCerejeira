const mongoose = require('mongoose');
const Jogo = require('../models/JogoSchema');

exports.paginaFiltros = (req, res) => {
    res.render('../front/filtros.html');
};

exports.getJogos = ('/getJogos', (req, res) => {
    // console.log(req.query.filtrogenero)
    // console.log(req.query.valor)
    busca = req.query.valor
    filtro = req.query.filtrogenero
    if(busca!=undefined){
        nomejogo = {nome: { $regex: '^' + req.query.valor, $options: 'i' }}
    }else if(filtro != 'null' && filtro !== {} && filtro !== undefined){
        // console.log('toaqui3')
        nomejogo = JSON.parse(filtro)

    }else if (busca==undefined && filtro == 'null' || {}){
        // console.log('toaqui')
        nomejogo = undefined
    }
    // console.log(req.query.valor)
    try {
        Jogo.find(nomejogo,(error, data) => {
            if (error) {
                console.log(error)
            }
            else {
                // console.log(data)
                res.json(data)
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send("err", err).send()
    }
});