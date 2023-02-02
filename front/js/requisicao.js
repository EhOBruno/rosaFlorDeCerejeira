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

postJogoData = async (idSteam) => {
    await fetch("/postJogoData", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'idSteam': idSteam})
    })
        .then(response => response.json())
        .then(jazonprovResponse => {
            jazonJogoData = jazonprovResponse
        });
        // console.log(jazonJogoData[idSteam]['data']['name'])
        document.getElementById('titleJogo').append(jazonJogoData[idSteam]['data']['name'])
        document.getElementById('descriJogo').append(jazonJogoData[idSteam]['data']['short_description'])

    }


addCardGame = (jazon) => {
    tamanho = jazon["length"]

    // for(let key in jazon){
    //     for()
    // }
    for (i = 0; i < tamanho; i++) {
        gameimg = jazon[i]['img']
        gameNome = jazon[i]['nome']
        idSteam = jazon[i]['idSteam']

        card = cardGame(gameimg, gameNome, idSteam)
        document.getElementById("gamestable").insertAdjacentHTML("beforeend", card)
    }
}

clickjogo = (idSteam) => {
    sessionStorage.setItem('idSteam', idSteam)
    window.location.assign("./jogo")
}

reqSteam = () => {
    idSteam = sessionStorage.getItem('idSteam')
    postJogoData(idSteam)
}


cardGame = (gameimg, gameNome, idSteam) => {
    idSteam = "'" + idSteam + "'"
    return '<div class="col-4 cardjogo mb-4">' +
        '<a onclick="clickjogo(' + idSteam + ')"><img class="imgjogo"' +
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
