// tela filtros
getJogos = async () => {
    await fetch("/getJogos", { method: 'GET' })
        .then(response => response.json())
        .then(jazonprovResponse => {
            jazon = jazonprovResponse
            console.log(jazon)
            sessionStorage.setItem('jazon', jazon)
        });
    // console.log(JSON.stringify(jazon))
    addCardGame(jazon)
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
cardGame = (gameimg, gameNome, idSteam) => {
    idSteam = "'" + idSteam + "'"
    return '<div class="col-4 cardjogo mb-4">' +
        '<a onclick="clickjogo(' + idSteam + ')"><img class="imgjogo"' +
        'src="' + gameimg + '"></a>' +
        '<p class="gamename">' + gameNome + '</p>' +
        '</div>'
}
clickjogo = (idSteam) => {
    sessionStorage.setItem('idSteam', idSteam)
    window.location.assign("./jogo")
}

// tela jogo
reqSteam = () => {
    idSteam = sessionStorage.getItem('idSteam')
    postJogoData(idSteam)
    addcardCarousel()
}
postJogoData = async (idSteam) => {
    await fetch("/postJogoData", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'idSteam': idSteam })
    })
        .then(response => response.json())
        .then(jazonprovResponse => {
            jazonJogoData = jazonprovResponse
        });
    // console.log(jazonJogoData[idSteam]['data']['name'])
    document.getElementById('titleJogo').append(jazonJogoData[idSteam]['data']['name'])
    document.getElementById('descriJogo').insertAdjacentHTML("beforeend", jazonJogoData[idSteam]['data']['short_description'])
    document.getElementById('imgJogo').src = jazonJogoData[idSteam]['data']['header_image']
    document.getElementById('videoJogo').src = jazonJogoData[idSteam]['data']['movies'][0]['mp4']['480']

    minimos = jazonJogoData[idSteam]['data']['pc_requirements']['minimum']
    var resultado = minimos.substr(0, 7) + " class='requisitos'" + minimos.substr(2, minimos.length);
    document.getElementById('minimum').insertAdjacentHTML("beforeend", resultado)


    recomendados = jazonJogoData[idSteam]['data']['pc_requirements']['recommended']
    if (recomendados != null) {
        var resultado = recomendados.substr(0, 7) + " class='requisitos'" + recomendados.substr(2, recomendados.length);
        document.getElementById('recommended').insertAdjacentHTML("beforeend", resultado)
    }else{
        document.getElementById('recommended').style.display = "none";
    }

}
addcardCarousel = async () => {
    await fetch("/getJogos", { method: 'GET' })
        .then(response => response.json())
        .then(jazonprovResponse => {
            jazon = jazonprovResponse
            console.log(jazon)
        });
    tamanho = jazon["length"]
    numerosusados = [];
    for (i = 1; i < 7 ; i++) {
        do {
            numero = Math.floor(Math.random() * tamanho);
        } while (numerosusados.indexOf(numero) !== -1);
        numerosusados.push(numero);

        gameimg = jazon[numero]['img'];
        idSteam = jazon[numero]['idSteam'];

        document.getElementById(i).src = gameimg;
        document.getElementById(i).setAttribute("onclick", "clickjogo(" + idSteam + ")");
    }
}

// LOGIN
sendLoginForm = () => {
    email = document.getElementById('floatingInput').value
    password = document.getElementById('floatingPassword').value

    if (email === '') {
        return Swal.fire({
            title: 'Por favor, digite seu e-mail',
            icon: 'warning',
            confirmButtonText: 'Voltar',
        })
    }
    else if (password === '') {
        return Swal.fire({
            icon: 'warning',
            title: 'Por favor, digite sua senha.',
            confirmButtonText: 'Voltar',
        })
    }

    const inputData = {
        "email": email,
        "password": password,
    }
    sendLoginReq(inputData)
}
async function sendLoginReq(data) {
    try {
        await fetch("/loginAuth", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                let resStatus = response.status
                if (resStatus === 404) {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Esse usuário não está cadastrado.',
                        confirmButtonText: 'Voltar',
                    })
                }
                else if (resStatus === 401) {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Senha inválida.',
                        confirmButtonText: 'Voltar',
                    })
                }
                else if (resStatus === 200) {
                    sessionStorage.setItem('Logado', true)
                    return window.location.assign('./filtros.html')
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

// CADASTRO
sendCadastroForm = () => {
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
    sendCadastroReq(inputData)
}
async function sendCadastroReq(data) {
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
                        background: '#111111',
                        icon: 'error',
                        title: 'Esse email já está cadastrado.',
                        confirmButtonText: 'Voltar',
                    })
                }
                else if (resStatus === 200) {
                    sessionStorage.setItem('Logado', true)
                    return Swal.fire({
                        background: '#111111',
                        allowOutsideClick: false,
                        icon: 'success',
                        title: 'Cadastro realizado com sucesso!',
                        confirmButtonText: ':D',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.assign('./filtros')
                        }
                    })
                }
                else {
                    return Swal.fire({
                        background: '#111111',
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
