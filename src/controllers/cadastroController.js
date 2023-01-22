const path = require('path');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.pageRegister = ('/cadastro', (req, res) => {
    res.render('../front/cadastro.html')
})


exports.register = async (req, res, next) => {

    const hashedPass = await bcrypt.hash(req.body.pswd, 10)


    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        processador: req.body.processador

    })
    user.save()
        .then(user => {
            res.redirect('/')
            console.log(user)
        })
        .catch(error => {
            console.log(error)
        })
}
    

