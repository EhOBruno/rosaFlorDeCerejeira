getJogos = async () => {
 await fetch("/filtros", {method:'POST'})
 .then(response => response.text())
 .then(jazonprovResponse => {
    console.log(jazonprovResponse);
    alert(jazonprovResponse)
}); 
}

getJogos()

