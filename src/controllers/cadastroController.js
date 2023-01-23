const path = require('path');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.pageRegister = ('/cadastro', (req, res) => {
    res.render('../front/cadastro.html')
})


exports.register = async (req, res, next) => {

    try {
        // check for existing email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(401).send("Given email already exist!")
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
                res.redirect('/')
                console.log(user)
            })
            .catch(error => {
                console.log(error)
            })
        if(req.body.pswd !== req.body.confirmpass){
            res.status(400).json({message:"Senhas não conferem"})
        }else {res.status(200).json({message:"Usuario cadastrado"})}
    }
        catch(err){
            res.status(500).json(err)
        }       
}

