const mongoose = require('mongoose');
const JogoSchema = require('../models/jogos');



exports.paginaFiltros = (req, res) => {
    res.render('../front/filtros.html');
};

exports.getGames = (req, res) => {
    const UsersData = JogoSchema
    console.log(UsersData.find((error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log(data)
            res.json(data)
        }
    }))
};