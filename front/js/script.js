function irParaCadastro() {
  window.location.assign("./cadastro")
}

function irParaLogin() {
  window.location.assign("./login")
}


let mybutton = document.getElementById("button-page-up");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0;
}

