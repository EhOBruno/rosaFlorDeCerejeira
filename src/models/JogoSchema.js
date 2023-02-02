const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jogoSchema = new Schema({
    idSteam: {
        type: String,
    },
    img: {
        type: String,
    },
    genero: {
        type: Array,
    },
    lancamento: {
        type: String,
    },
    nome: {
        type: String,
    }
});

module.exports = mongoose.model('Jogo', jogoSchema, "Jogos");