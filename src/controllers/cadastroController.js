const path = require('path');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.pageRegister = ('/cadastro', (req, res) => {
    res.render('../front/cadastro.html')
})


exports.register = ('/lixo', async (req, res) => {
    try {
        // check for existing email
        console.log("body", req.body)
        let user = await User.findOne({ email: req.body.email });
        console.log(user)
        if (user) {
            return res.status(401).send("Given email already exist!")
        }
        else if (req.body.pswd !== req.body.confirmpass) {
            res.status(400).sen("Senhas não conferem")
        }

        const hashedPass = await bcrypt.hash(req.body.pswd, 10)


        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            processador: req.body.processador,
            gpu: req.body.gpu,
            ram: req.body.ram

        })
        user.save()
            .then(user => {
                console.log(user)
            })
            .catch(error => {
                console.log(error)
            })
        res.status(200).send("Usuario cadastrado")
    }
    catch (err) {
        res.status(500).json("porra")
    }
})

