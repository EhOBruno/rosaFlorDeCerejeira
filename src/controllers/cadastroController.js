const path = require('path');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.pageRegister = ('/cadastro', (req, res) => {
    res.render('../front/cadastro.html')
})


exports.register = async (req, res, next) => {

    // check for existing email


    const hashedPass = await bcrypt.hash(req.body.pswd, 10)

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        processador: req.body.processador,
        gpu: req.body.gpu,
        ram: req.body.ram

    })
    var errors = []

    if (req.body.pswd !== req.body.confirmpass) {
        errors.push({ texto: "Senhas não conferem" })
    }
    if (!req.body.name) {
        errors.push({ texto: "Nome de usuario obrigatorio" })
    }
    if (!req.body.pswd) {
        errors.push({ texto: "Senha Obrigatoria" })
    }
    const { email } = req.body.email
    const usuario = await User.findOne({ email });
    if (usuario) {
        errors.push({ texto: "Email ja cadastrado" })
    }
    try {

        if (errors.length > 0) {
            console.log(errors)
            res.status(400).res.json(errors)
        } else {
            user.save()
                .then(user => {
                    res.redirect('/')
                    console.log(user)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    catch (err) {
        console.log(err)
    }

}


