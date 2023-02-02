const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv').config();

mongoose.set("strictQuery", true);

mongoose.connect(`mongodb+srv://necivaldo:0ldXupvJhMa5nTjj@cluster0.qvti9so.mongodb.net/JogosDB`, { useNewUrlParser: true })
    .then(()=>{
        app.emit('pronto')
    })

app.use(express.urlencoded({ extended: true}));
app.use(routes);
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/front'));

app.set('front', path.join(__dirname + 'front'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');




// Ligando servidor a porta 3000
app.on('pronto', ()=>{
    app.listen(3000, ()=>{
        console.log('servidor aberto em localhost:3000')
    });   
})
