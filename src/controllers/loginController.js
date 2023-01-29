const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
var SECRET = "cacaiuscaibcuiasbciuasbcascxczcmxz"
const mongoose = require('mongoose');
const User = require('../models/User');


exports.paginaLogin = (req, res) => {
    res.render('../front/login.html')
}

exports.logar = async (req, res) => {

    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(404).json({msg: "usuario nao encontrado"})
    }
    
    //check password
    const checkPassword = await bcrypt.compare(req.body.password, user.password)
    if(!checkPassword){
        return res.status(404).json({msg: "senha invalida"})
    }
    
    try{
        
        const secret = SECRET

        const token = jwt.sign({
            id: user._id
        }, secret)
        res.status(200).redirect('/filtros')
        
    }catch(err){
        console.log(err)
    }
}
