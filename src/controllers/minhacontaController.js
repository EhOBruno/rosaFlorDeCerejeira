const User = require('../models/UserSchema')

exports.paginaConta = ('/minhaconta', (req, res) => {
    res.render('../front/meuperfil.html')
})

exports.editarDados = ('/editarDados', async (req, res) => {
    try {
        console.log("sla", req.body)
        let userUpdated = await User.findOneAndUpdate(
            {
                id: User._id
            },
            {
                name: req.body.nome,
                email: req.body.email,
                processor: req.body.processador,
                gpu: req.body.gpu,
                ram: req.body.ram,
                password: req.body.password
            },
            {
                new: true,
            }
        )
    }
    catch (err) {
        console.log(err)
        res.status(500).send("err", err).send()
    }
})