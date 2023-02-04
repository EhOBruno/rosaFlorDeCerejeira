const mongoose = require('mongoose');
const Jogo = require('../models/JogoSchema');

exports.paginaFiltros = (req, res) => {
    res.render('../front/filtros.html');
};

exports.getJogos = ('/getJogos', (req, res) => {
    if(req.query.valor!=undefined){
        nomejogo = {nome: { $regex: '^' + req.query.valor, $options: 'i' }}
    }else{
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