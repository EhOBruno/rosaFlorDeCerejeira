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
  document.getElementById("pass-input").style.setProperty('background-color', 'white', 'important')
  document.getElementById("confirmpass-input").style.setProperty('background-color', 'white', 'important')
  document.getElementById("pass-div").style.display = 'block'
  document.getElementById("confirmpass-div").style.display = 'block'
  document.getElementById("minhaconta-botao").style.setProperty('background-color', '#2D2D2D', 'important')
  document.getElementById("minhaconta-botao").style.setProperty('color', 'white', 'important')
  document.getElementById("configuracoes-botao").style.setProperty('background-color', 'white', 'important')
  document.getElementById("configuracoes-botao").style.setProperty('color', '#E83678', 'important')
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
  document.getElementById("minhaconta-botao").style.setProperty('background-color', 'white', 'important')
  document.getElementById("minhaconta-botao").style.setProperty('color', '#E83678', 'important')
  document.getElementById("configuracoes-botao").style.setProperty('background-color', '#2D2D2D', 'important')
  document.getElementById("configuracoes-botao").style.setProperty('color', 'white', 'important')
  document.getElementById("botao-salvar").style.display = 'none'
}

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

