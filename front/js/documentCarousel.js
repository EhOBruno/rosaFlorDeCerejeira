fetch("/getJogos", { method: 'GET' })
    .then(response => response.json())
    .then(jazonprovResponse => {
        jazon = jazonprovResponse
        console.log(jazon)
    });
    
    tamanho = jazon["length"]
// document.getElementById("teste2").insertAdjacentHTML("beforeend", '<div id="carousel" class="carousel mb-5 mt-4" style="margin: 0 100px;">>')
for (i = 1; i < 11; i++) {
    numero = Math.floor(Math.random() * tamanho)
    gameimg = jazon[numero]['img']
    idSteam = jazon[numero]['idSteam']
    document.getElementById(carouselAp).insertAdjacentHTML("beforeend", cardCarousel(gameimg, idSteam))
    // document.getElementById(i).src = gameimg
}

cardCarousel = (gameimg, idSteam) => {
    idSteam = "'" + idSteam + "'"
    return '<div class="imgC">' +
        '<a onclick="clickjogo(' + idSteam + ')"><img class="imgjogo"' +
        'src="' + gameimg + '"></a>' +
        '</div>'
}