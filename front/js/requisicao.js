// tela filtros

getJogos = async () => {

    checkAutoBox()
    filtro = sessionStorage.getItem('filtrogenero')
    await fetch("/getJogos?filtrogenero=" + filtro, { method: 'GET' })
        .then(response => response.json())
        .then(jazonprovResponse => {
            jazon = jazonprovResponse
            console.log(jazon)
            sessionStorage.setItem('jazon', jazon)
            sessionStorage.removeItem('filtrogenero')
            sessionStorage.removeItem('checkId')
        });
    // console.log(JSON.stringify(jazon))
    if (jazon.length != 0) {
        addCardGame(jazon)
    } else {
        return swal.fire({
            color: '#FFFFFF',
            background: '#111111',
            confirmButtonColor: '#d7336e',
            icon: 'warning',
            title: 'Nenhum jogo encontrado',
            confirmButtonText: 'Voltar',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload()
            }
        })

    }

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
        cpu = jazon[i]['cpuMin']
        gpu = jazon[i]['gpuMin']
        ram = jazon[i]['ramMin']


        card = cardGame(gameimg, gameNome, idSteam, cpu, gpu, ram)
        document.getElementById("gamestable").insertAdjacentHTML("beforeend", card)
    }
}
cardGame = (gameimg, gameNome, idSteam, cpu, gpu, ram) => {
    idSteam = "'" + idSteam + "'"
    return '<div class="col-4 cardjogo mb-4">' +
        '<a onclick="clickjogo(' + idSteam + ',' + cpu + ',' + gpu + ',' + ram + ')"><img class="imgjogo"' +
        'src="' + gameimg + '"></a>' +
        '<p class="gamename">' + gameNome + '</p>' +
        '</div>'
}
clickjogo = (idSteam, cpu, gpu, ram) => {
    sessionStorage.setItem('idSteam', idSteam)
    sessionStorage.setItem('cpuMin', cpu)
    sessionStorage.setItem('gpuMin', gpu)
    sessionStorage.setItem('ramMin', ram)
    window.location.assign("./jogo")
}
clickFiltrar = () => {

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // console.log(checkboxes)
    var generosSelecionados = [];
    var checkId = [];

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {

            generosSelecionados.push({ genero: checkboxes[i].id });
            checkId.push({ id: checkboxes[i].id });
        }
    }

    var filtrogenero = {};

    if (generosSelecionados.length >= 2) {
        filtrogenero = { $and: generosSelecionados };
    } else if (generosSelecionados.length === 1) {
        filtrogenero = generosSelecionados[0];
    }
    console.log(filtrogenero)
    sessionStorage.setItem('filtrogenero', JSON.stringify(filtrogenero))
    sessionStorage.setItem('checkId', JSON.stringify(checkId))
    location.reload()

}
checkAutoBox = () => {
    $(document).ready(function () {
        checkIdArray = JSON.parse(sessionStorage.getItem("checkId"))
        if (checkIdArray != null) {
            if (checkIdArray.length != 0) {
                for (i = 0; i < checkIdArray.length; i++) {
                    document.getElementById(checkIdArray[i]["id"]).checked = true;
                }
            }
        }
    });
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
    } else {
        document.getElementById('recommended').style.display = "none";
    }

    if (sessionStorage.getItem('Logado')) {
        document.getElementById("spanProcessador").append(sessionStorage.getItem('processador'))
        document.getElementById("spanGpu").append(sessionStorage.getItem('gpu'))
        document.getElementById("spanRam").append(sessionStorage.getItem('ram')+" GB de RAM")

        cpuMin = parseInt(sessionStorage.getItem('cpuMin'))
        gpuMin = parseInt(sessionStorage.getItem('gpuMin'))
        ramMin = parseInt(sessionStorage.getItem('ramMin'))
        performanceGpu = parseInt(sessionStorage.getItem('performanceGpu'))
        performanceCpu = parseInt(sessionStorage.getItem('performanceCpu'))
        ram = parseInt(sessionStorage.getItem('ram'))
        if (performanceGpu >= gpuMin) {
            if (performanceCpu >= cpuMin) {
                if (ram >= ramMin) {
                    console.log("4")
                    document.getElementById('SeuPcTanka').style.display="block"

                }else{
                    console.log("3")
                    document.getElementById('SeuPcNTanka').style.display="block"
                }
            }else{
                console.log("2")
                document.getElementById('SeuPcNTanka').style.display="block"
            }
        }else{
            console.log("1")
            document.getElementById('SeuPcNTanka').style.display="block"
        }
    }

}
addcardCarousel = async () => {
    await fetch("/getJogos", { method: 'GET' })
        .then(response => response.json())
        .then(jazonprovResponse => {
            jazon = jazonprovResponse
            // console.log(jazon)
        });
    tamanho = jazon["length"]
    numerosusados = [];
    for (i = 1; i < 7; i++) {
        do {
            numero = Math.floor(Math.random() * tamanho);
        } while (numerosusados.indexOf(numero) !== -1);
        numerosusados.push(numero);

        gameimg = jazon[numero]['img'];
        idSteam = jazon[numero]['idSteam'];
        cpu = jazon[i]['cpuMin']
        gpu = jazon[i]['gpuMin']
        ram = jazon[i]['ramMin']

        document.getElementById(i).src = gameimg;
        document.getElementById(i).setAttribute("onclick", 'clickjogo(' + idSteam + ',' + cpu + ',' + gpu + ',' + ram + ')');
    }
}

// LOGIN
sendLoginForm = () => {
    email = document.getElementById('floatingInput').value
    password = document.getElementById('floatingPassword').value

    if (email === '') {
        return swal.fire({
            color: '#FFFFFF',
            background: '#111111',
            confirmButtonColor: '#d7336e',
            title: 'Por favor, digite seu e-mail',
            icon: 'warning',
            confirmButtonText: 'Voltar',
        })
    }
    else if (password === '') {
        return swal.fire({
            color: '#FFFFFF',
            background: '#111111',
            confirmButtonColor: '#d7336e',
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
                    return swal.fire({
                        color: '#FFFFFF',
                        background: '#111111',
                        confirmButtonColor: '#d7336e',
                        icon: 'error',
                        title: 'Esse usuário não está cadastrado.',
                        confirmButtonText: 'Voltar',
                    })
                }
                else if (resStatus === 401) {
                    return swal.fire({
                        color: '#FFFFFF',
                        background: '#111111',
                        confirmButtonColor: '#d7336e',
                        icon: 'error',
                        title: 'Senha inválida.',
                        confirmButtonText: 'Voltar',
                    })
                }
                else if (resStatus === 200) {
                    return response
                }
                else {
                    return swal.fire({
                        color: '#FFFFFF',
                        background: '#111111',
                        confirmButtonColor: '#d7336e',
                        icon: 'error',
                        title: 'Ocorreu um erro no sistema D:',
                        text: 'Por favor, tente novamente mais tarde.',
                        confirmButtonText: 'Ok',
                    })
                }
            })
            .then(response => response.json())
            .then(response => {

                sessionStorage.setItem('id', response._id)
                sessionStorage.setItem('nome', response.name)
                sessionStorage.setItem('email', response.email)
                sessionStorage.setItem('processador', response.processador)
                sessionStorage.setItem('gpu', response.gpu)
                sessionStorage.setItem('ram', response.ram)
                sessionStorage.setItem('senha', response.password)
                sessionStorage.setItem('Logado', true)
                sessionStorage.setItem("performanceGpu", response.performanceGpu)
                sessionStorage.setItem("performanceCpu", response.performanceCpu)
                window.location.href = '/filtros'
            })
    }
    catch (err) {
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
    if (processador != "Nenhum") {
        performanceCpu = sessionStorage.getItem('performanceCpu')
    } else {
        performanceCpu = '0'
        console.log('opa')
    }
    if (gpu != "Nenhuma") {
        performanceGpu = sessionStorage.getItem('performanceGpu')
    } else {
        console.log('opa')
        performanceGpu = '0'
    }
    if (ram != "Nenhuma") {
        ram = document.getElementById('imputRam').value
    } else {
        console.log('opa')
        ram = '0'
    }


    if (nome === '') {
        return swal.fire({
            color: '#FFFFFF',
            background: '#111111',
            confirmButtonColor: '#d7336e',
            title: 'Por favor, digite seu nome',
            icon: 'warning',
            confirmButtonText: 'Voltar',
        })
    }
    else if (email === '') {
        return swal.fire({
            color: '#FFFFFF',
            background: '#111111',
            confirmButtonColor: '#d7336e',
            title: 'Por favor, digite seu e-mail',
            icon: 'warning',
            confirmButtonText: 'Voltar',
        })
    }
    else if (!email.includes('@')) {
        return swal.fire({
            color: '#FFFFFF',
            background: '#111111',
            confirmButtonColor: '#d7336e',
            title: 'Por favor, utilize um email válido.',
            icon: 'warning',
            confirmButtonText: 'Voltar',
        })
    }
    else if (password === '') {
        return swal.fire({
            color: '#FFFFFF',
            background: '#111111',
            confirmButtonColor: '#d7336e',
            icon: 'warning',
            title: 'Por favor, digite uma senha.',
            confirmButtonText: 'Voltar',
        })
    }
    else if (password !== passwordConf) {
        return swal.fire({
            color: '#FFFFFF',
            background: '#111111',
            confirmButtonColor: '#d7336e',
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
        "processador": processador,
        "performanceCpu": performanceCpu,
        "performanceGpu": performanceGpu
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
                    return swal.fire({

                        color: '#FFFFFF',
                        background: '#111111',
                        confirmButtonColor: '#d7336e',
                        background: '#111111',
                        icon: 'error',
                        title: 'Esse email já está cadastrado.',
                        confirmButtonText: 'Voltar',
                    })
                }
                else if (resStatus === 200) {
                    return swal.fire({

                        color: '#FFFFFF',
                        background: '#111111',
                        confirmButtonColor: '#d7336e',
                        background: '#111111',
                        allowOutsideClick: false,
                        icon: 'success',
                        title: 'Cadastro realizado com sucesso!',
                        confirmButtonText: ':D',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.assign('./login')
                        }
                    })
                }
                else {
                    return swal.fire({

                        color: '#FFFFFF',
                        background: '#111111',
                        confirmButtonColor: '#d7336e',
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

//barra de pesquisa
var vezes = 0;

$(document).ready(function () {
    const imputBusca = document.getElementById("imputBusca");
    const buscaResultados = document.getElementById("buscaResultados");
    let isDiv1Clicked = false;

    imputBusca.addEventListener("input", function () {
        buscaResultados.style.display = 'block';
        getJogosBusca(imputBusca.value, buscaResultados);
    });

    buscaResultados.addEventListener("click", function () {
        isDiv1Clicked = true;
    });

    document.addEventListener("mousedown", function (event) {
        if (!isDiv1Clicked && event.target !== imputBusca && event.target !== buscaResultados && event.target.parentNode.parentNode !== buscaResultados && event.target.parentNode !== buscaResultados) {
            imputBusca.value = "";
            buscaResultados.style.display = 'none';
            vezes = 0;
            qtdDivs = buscaResultados.children.length;
            if (qtdDivs !== 0) {
                for (i = 0; i < qtdDivs; i++) {
                    buscaResultados.removeChild(document.getElementById("respBusca"));
                }
            }
        }
        isDiv1Clicked = false;
    });
});
getJogosBusca = (valorBusca, buscaResultados) => {
    if (valorBusca !== "") {
        fetch("/getJogos?valor=" + valorBusca, { method: 'GET' })
            .then(response => response.json())
            .then(jazonprovResponse => {
                jazon = jazonprovResponse;
                qtdDivs = buscaResultados.children.length;

                if (vezes !== 0 && qtdDivs !== 0) {
                    for (i = 0; i < qtdDivs; i++) {
                        buscaResultados.removeChild(document.getElementById("respBusca"));
                    }
                }
                vezes++;
                if (jazon !== undefined) {
                    cardJogoBusca(jazon, buscaResultados);
                }
            });
    } else {
        qtdDivs = buscaResultados.children.length;
        if (vezes !== 0 && qtdDivs !== 0) {
            for (i = 0; i < qtdDivs; i++) {
                buscaResultados.removeChild(document.getElementById("respBusca"));
            }
        }
        buscaResultados.insertAdjacentHTML("beforeend", '<div id="respBusca" class="respJogo"><div>Nenhum resultado</div></div>');
    }
};
cardJogoBusca = (jazon, buscaResultados) => {
    tamanho = jazon["length"]
    if (tamanho != 0) {
        for (i = 0; i < tamanho; i++) {
            cpu = jazon[i]['cpuMin']
            gpu = jazon[i]['gpuMin']
            ram = jazon[i]['ramMin']
            buscaResultados.insertAdjacentHTML("beforeend", '<div id="respBusca" onclick="clickjogo(' + jazon[i]['idSteam'] + ',' + cpu + ',' + gpu + ',' + ram + ')" class="respJogo"><div>' + jazon[i]['nome'] + '</div></div>')
        }
    } else {
        buscaResultados.insertAdjacentHTML("beforeend", '<div id="respBusca" class="respJogo"><div>Nenhum resultado</div></div>')
    }
}

//EDITAR DADOS DA CONTA
sendEditarDadosForm = () => {
    nome = document.getElementById('name-input').value
    email = document.getElementById('email-input').value
    processador = document.getElementById('processor-input').value
    gpu = document.getElementById('driver-input').value
    ram = document.getElementById('ram-input').value
    password = document.getElementById('pass-input').value
    passwordConf = document.getElementById('confirmpass-input').value
    if (processador != "Nenhum") {
        performanceCpu = sessionStorage.getItem('performanceCpuProv')
    } else {
        performanceCpu = '0'
        console.log('opa')
    }
    if (gpu != "Nenhuma") {
        performanceGpu = sessionStorage.getItem('performanceGpuProv')
    } else {
        console.log('opa')
        performanceGpu = '0'
    }
    if (ram != "Nenhuma") {
        ram = document.getElementById('ram-input').value
    } else {
        console.log('opa')
        ram = '0'
    }


    if (nome === '') {
        return swal.fire({

            color: '#FFFFFF',
            background: '#111111',
            confirmButtonColor: '#d7336e',
            title: 'Por favor, insira um nome válido.',
            icon: 'warning',
            confirmButtonText: 'Voltar',
        })
    }
    else if (email === '' || !email.includes('@')) {
        return swal.fire({

            color: '#FFFFFF',
            background: '#111111',
            confirmButtonColor: '#d7336e',
            title: 'Por favor, insira um email válido.',
            icon: 'warning',
            confirmButtonText: 'Voltar',
        })
    }
    else if (password === '') {
        return swal.fire({

            color: '#FFFFFF',
            background: '#111111',
            confirmButtonColor: '#d7336e',
            icon: 'warning',
            title: 'Por favor, digite sua nova senha.',
            confirmButtonText: 'Voltar',
        })
    }
    else if (password !== passwordConf) {
        return swal.fire({
            color: '#FFFFFF',
            background: '#111111',
            confirmButtonColor: '#d7336e',
            icon: 'warning',
            title: 'As senhas não conferem.',
            confirmButtonText: 'Voltar',
        })
    }

    const inputData = {
        'id': sessionStorage.getItem('id'),
        'nome': nome,
        'email': email,
        'password': password,
        'passwordConf': passwordConf,
        'gpu': gpu,
        'ram': ram,
        'processador': processador,
        "performanceCpu": performanceCpu,
        "performanceGpu": performanceGpu
    }
    sendEditarReq(inputData)
}
async function sendEditarReq(data) {
    await fetch("/editarDados", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            let resStatus = response.status
            if (resStatus === 202) {
                return swal.fire({
                    color: '#FFFFFF',
                    background: '#111111',
                    confirmButtonColor: '#d7336e',
                    icon: 'success',
                    title: 'Dados atualizados com sucesso.',
                    text: 'Por favor, faça login novamente.',
                    confirmButtonText: 'Voltar',
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        sessionStorage.clear()
                        window.location.assign('./login')
                    }
                })
            }
            else {
                return swal.fire({
                    color: '#FFFFFF',
                    background: '#111111',
                    confirmButtonColor: '#d7336e',
                    icon: 'error',
                    title: 'Ocorreu um erro no sistema D:',
                    text: 'Por favor, tente novamente mais tarde.',
                    confirmButtonText: 'Ok',
                })
            }
        })
}