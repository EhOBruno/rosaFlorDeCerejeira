function irParaCadastro() {
  window.location.assign("./cadastro")
}

function irParaLogin() {
  window.location.assign("./login")
}

function irParaConfig() {
  document.getElementById("name-input").disabled = false
  document.getElementById("email-input").disabled = false
  document.getElementById("processor-input").disabled = false
  document.getElementById("driver-input").disabled = false
  document.getElementById("ram-input").disabled = false
  document.getElementById("pass-input").disabled = false
  document.getElementById("confirmpass-input").disabled = false

  document.getElementById("name-input").style.setProperty('background-color', 'white', 'important')
  document.getElementById("email-input").style.setProperty('background-color', 'white', 'important')
  document.getElementById("processor-input").style.setProperty('background-color', 'white', 'important')
  document.getElementById("driver-input").style.setProperty('background-color', 'white', 'important')
  document.getElementById("ram-input").style.setProperty('background-color', 'white', 'important')
  // document.getElementById("pass-input").style.setProperty('background-color', 'white', 'important')
  // document.getElementById("confirmpass-input").style.setProperty('background-color', 'white', 'important')

  // document.getElementById("pass-div").style.display = 'block'
  // document.getElementById("confirmpass-div").style.display = 'block'
  document.getElementById("email-div").style.display = 'block'
  

  document.getElementById("configuracoes-botao").classList.add('ativo')
  document.getElementById("minhaconta-botao").classList.remove('ativo')
  document.getElementById("sair-botao").classList.remove('ativo')

  document.getElementById("botao-salvar").style.display = 'block'
}

function irParaConta() {
  document.getElementById("name-input").disabled = true
  document.getElementById("email-input").disabled = true
  document.getElementById("processor-input").disabled = true
  document.getElementById("driver-input").disabled = true
  document.getElementById("ram-input").disabled = true
  document.getElementById("pass-input").disabled = true
  document.getElementById("confirmpass-input").disabled = true

  document.getElementById("name-input").style.setProperty('background-color', '#f8d7da', 'important')
  document.getElementById("email-input").style.setProperty('background-color', '#f8d7da', 'important')
  document.getElementById("processor-input").style.setProperty('background-color', '#f8d7da', 'important')
  document.getElementById("driver-input").style.setProperty('background-color', '#f8d7da', 'important')
  document.getElementById("ram-input").style.setProperty('background-color', '#f8d7da', 'important')
  document.getElementById("pass-input").style.setProperty('background-color', '#f8d7da', 'important')
  document.getElementById("confirmpass-input").style.setProperty('background-color', '#f8d7da', 'important')

  document.getElementById("pass-div").style.display = 'none'
  document.getElementById("confirmpass-div").style.display = 'none'
  document.getElementById("email-div").style.display = 'none'

  document.getElementById("minhaconta-botao").classList.add('ativo')
  document.getElementById("configuracoes-botao").classList.remove('ativo')
  document.getElementById("sair-botao").classList.remove('ativo')
  
  document.getElementById("botao-salvar").style.display = 'none'
}

function irParaTrocarSenha() {
  document.getElementById("pass-div").style.display = 'block'
  document.getElementById("confirmpass-div").style.display = 'block'
  
}

function logout() {
  document.getElementById("sair-botao").classList.add('ativo')
  document.getElementById("configuracoes-botao").classList.remove('ativo')
  document.getElementById("minhaconta-botao").classList.remove('ativo')

  sessionStorage.clear()
  window.location.href = '/filtros'
}

function setInputValues() {
  document.getElementById("name-input").value = sessionStorage.getItem('nome')
  document.getElementById("email-input").value = sessionStorage.getItem('email')
  document.getElementById("processor-input").value = sessionStorage.getItem('processador')
  document.getElementById("driver-input").value = sessionStorage.getItem('gpu')
  document.getElementById("ram-input").value = sessionStorage.getItem('ram')
}
setInputValues()

let mybutton = document.getElementById("button-page-up");

// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

