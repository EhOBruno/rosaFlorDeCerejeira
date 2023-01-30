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

    let nome = document.getElementById('imputName').name
    let email = document.getElementById('imputEmail').name
    let password = document.getElementById('imputPassword').name
    let passwordConf = document.getElementById('imputPasswordConf').name
    let processador = document.getElementById('imputProcessador').name
    let gpu = document.getElementById('imputGpu').name
    let ram = document.getElementById('imputRam').name
    const data = {
        "name": nome,
        "email": email,
        "pswd": password,
        "passwordConf": passwordConf,
        "gpu": gpu,
        "ram": ram
    }
    req(data)
    
}

async function req(data){
    console.log("que", data)
    await fetch("/cadastro", {method:'POST', body: data})
    .then(response => response.json())
    .then(jazonprovResponse => {
       console.log(jazonprovResponse);
       alert(jazonprovResponse)
   }); 

   alert('foi')
}
