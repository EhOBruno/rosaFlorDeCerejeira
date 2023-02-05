const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')

exports.paginaConta = ('/minhaconta', (req, res) => {
    res.render('../front/meuperfil.html')
})

exports.editarDados = ('/editarDados', async (req, res) => {
    try {

        const hashedPass = await bcrypt.hash(req.body.password, 10)

        let userUpdated = await User.findByIdAndUpdate(
            req.body.id,
            {
                name: req.body.nome,
                email: req.body.email,
                processador: req.body.processador,
                gpu: req.body.gpu,
                ram: req.body.ram,
                password: hashedPass
            }
        )
        res.status(202).send()
    }
    catch (err) {
        console.log(err)
        res.status(500).send("err", err)
    }
})