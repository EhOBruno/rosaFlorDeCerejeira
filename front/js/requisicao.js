getJogos = async () => {
    await fetch("/filtros", { method: 'POST' })
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

    const data = {
        "name": nome,
        "email": email,
        "pswd": password,
        "passwordConf": passwordConf,
        "gpu": gpu,
        "ram": ram,
        "processador": processador
    }
    console.log("maldita data", data)
    req(data)
}

async function req(data) {
    console.log("que", data)
    try {
        await fetch("/cadastro", {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(jazonprovResponse => {
                console.log(jazonprovResponse);     
            });
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            )
    }catch(err){
        console.log(err)
    }
}
