const express = require('express');
const app = express();
const routes = require('./routes')

app.use(express.urlencoded({ extended: true}));
app.use(routes);

// Ligando servidor a porta 3000
app.listen(3000, ()=>{
    console.log('servidor aberto em localhost:3000')
})