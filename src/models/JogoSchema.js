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
    nome: {
        type: String,
    }
});

module.exports = jogo = mongoose.model('Jogo', jogoSchema);