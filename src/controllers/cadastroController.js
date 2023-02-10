const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');

exports.pageRegister = ('/cadastro', (req, res) => {
    res.render('../front/cadastro.html')
})

exports.register = ('/cadastro', async (req, res) => {
    try {
        let userAlreadyExists = await User.findOne({ email: req.body.email });

        if (userAlreadyExists) {
            return res.status(401).send()
        }

        const hashedPass = await bcrypt.hash(req.body.pswd, 10)

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            processador: req.body.processador,
            gpu: req.body.gpu,
            ram: req.body.ram,
            performanceGpu: req.body.performanceGpu,
            performanceCpu: req.body.performanceCpu
        })

        user.save()
            .then(user => {
                console.log(user)
            })
            .catch(error => {
                console.log(error)
            })
            
        res.status(200).send()
    }
    catch (err) {
        console.log(err)
        res.status(500).send("err", err).send()
    }
})

