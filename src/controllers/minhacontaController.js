const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')

exports.paginaConta = ('/minhaconta', (req, res) => {
    res.render('../front/meuperfil.html')
})

exports.editarDados = ('/editarDados', async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.body.id })

        var userPass = req.body.password

        if(req.body.password !== user.password){
            console.log(userPass)
            userPass = await bcrypt.hash(req.body.password, 10) 
            console.log(userPass)
        }     

        let userUpdated = await User.findByIdAndUpdate(
            req.body.id,
            {
                name: req.body.nome,
                email: req.body.email,
                processador: req.body.processador,
                gpu: req.body.gpu,
                ram: req.body.ram,
                password: userPass,
                performanceCpu: req.body.performanceCpu,
                performanceGpu: req.body.performanceGpu
            }
        )
        res.status(202).send()
    }
    catch (err) {
        console.log(err)
        res.status(500).send("err", err)
    }
})