getJogos = async () => {
    await fetch("/getJogos", { method: 'GET' })
        .then(response => response.json())
        .then(jazonprovResponse => {
            jazon = jazonprovResponse
            console.log(jazon)
        });
    // console.log(JSON.stringify(jazon))
    addCardGame(jazon)
}

addCardGame = (jazon) => {
    tamanho = jazon["length"]
    gameimg = jazon['0']['img']
    gameNome = jazon['0']['nome']
    card = cardGame(gameimg, gameNome)
    document.getElementById("gamestable").insertAdjacentHTML("beforeend", card)
    document.getElementById("gamestable").insertAdjacentHTML("beforeend", card)
    document.getElementById("gamestable").insertAdjacentHTML("beforeend", card)
    document.getElementById("gamestable").insertAdjacentHTML("beforeend", card)
    document.getElementById("gamestable").insertAdjacentHTML("beforeend", card)
    document.getElementById("gamestable").insertAdjacentHTML("beforeend", card)
    
}

cardGame = (gameimg, gameNome) => {
    return '<div class="col-4 cardjogo mb-4">' +
        '<a href="./jogo.html"><img class="imgjogo"' +
        'src="' + gameimg + '"></a>' +
        '<p class="gamename">' + gameNome + '</p>' +
        '</div>'
}

sendForm = () => {
    nome = document.getElementById('imputName').value
    email = document.getElementById('imputEmail').value
    password = document.getElementById('imputPassword').value
    passwordConf = document.getElementById('imputPasswordConf').value
    processador = document.getElementById('imputProcessador').value
    gpu = document.getElementById('imputGpu').value
    ram = document.getElementById('imputRam').value

    if (nome === '') {
        return Swal.fire({
            title: 'Por favor, digite seu nome',
            icon: 'warning',
            confirmButtonText: 'Voltar',
        })
    }
    else if (email === '') {
        return Swal.fire({
            title: 'Por favor, digite seu e-mail',
            icon: 'warning',
            confirmButtonText: 'Voltar',
        })
    }
    else if (password === '') {
        return Swal.fire({
            icon: 'warning',
            title: 'Por favor, digite uma senha.',
            confirmButtonText: 'Voltar',
        })
    }
    else if (password !== passwordConf) {
        return Swal.fire({
            icon: 'warning',
            title: 'As senhas não conferem.',
            confirmButtonText: 'Voltar',
        })
    }

    const inputData = {
        "name": nome,
        "email": email,
        "pswd": password,
        "passwordConf": passwordConf,
        "gpu": gpu,
        "ram": ram,
        "processador": processador
    }
    sendReq(inputData)
}

async function sendReq(data) {
    try {
        await fetch("/cadastro", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                let resStatus = response.status
                if (resStatus === 401) {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Esse email já está cadastrado.',
                        confirmButtonText: 'Voltar',
                    })
                }
                else if (resStatus === 200) {
                    return Swal.fire({
                        icon: 'success',
                        title: 'Cadastro realizado com sucesso!',
                        confirmButtonText: ':D',
                    })
                }
                else {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Ocorreu um erro no sistema D:',
                        text: 'Por favor, tente novamente mais tarde.',
                        confirmButtonText: 'Ok',
                    })
                }
            })
    } catch (err) {
        console.log(err)
    }
}
