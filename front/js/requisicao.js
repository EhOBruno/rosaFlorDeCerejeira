



getJogos = async () => {
 await fetch("/filtros", {method:'POST'})
 .then(response => response.text())
 .then(jazonprovResponse => {
    console.log(jazonprovResponse);
    alert(jazonprovResponse)
}); 
}

// getJogos()

teste = () => {

    nome = document.getElementById('imputName').value
    email = document.getElementById('imputEmail').value
    password = document.getElementById('imputPassword').value
    passwordConf = document.getElementById('imputPasswordConf').value
    processador = document.getElementById('imputProcessador').value
    gpu = document.getElementById('imputGpu').value
    ram = document.getElementById('imputRam').value
    data = {
        "name": nome,
        "email": email,
        "pswd": password,
        "passwordConf": passwordConf,
        "gpu": gpu,
        "ram": ram
    }
    req(data)
    
}

req = async (data) => {
    console.log(data)
    alert()
    await fetch("/cadastro", {method:'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
    .then(response => response.json())
    .then(jazonprovResponse => {
       console.log(jazonprovResponse);
       alert(jazonprovResponse)
   }); 
   alert('foi')
}
