const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const JogoSchema = new Schema({
    idSteam: {
        type: String,
    },
    img: {
        type: String,
    },
    genero: {
        type: Array,
    },
    nome: {
        type: String,
    }
});


module.exports = Jogo = mongoose.model('Jogo', JogoSchema, 'Jogos');