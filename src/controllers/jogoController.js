exports.paginaJogo = (req, res) => {
    res.render('../front/jogo.html');
};

exports.postJogoData = ('/postJogoData', (req, res) => {
    // console.log('aoba', req.body['idSteam'])
     fetch("https://store.steampowered.com/api/appdetails/?appids=" + req.body['idSteam']+"&l=brazilian", { method: 'GET' })
        .then(response => response.json())
        .then(jazonprovResponse => {
            jazonGameData = jazonprovResponse
            // console.log(jazonGameData)
            res.json(jazonGameData)
        });
});