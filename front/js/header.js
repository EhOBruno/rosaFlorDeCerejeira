if (sessionStorage.getItem('Logado')) {
  
  document.write(`
  <header class="header">
  <div class="header-left">
    <img src="img/logo.svg" alt="logo" onclick="window.location.assign('./filtros')" class="logo">
    <input type="text" class="barra-pesquisa" 
      placeholder="Pesquise aqui...">
  </div>
  <div class="header-right-all-login">
    <a href="">
      <span id="username">Username</span>
    </a>
    <a href="">
      <img src="./img/login.svg" alt="" id="img-user">
    </a>
  </div>
  </header>`)
} else {
  
  document.write(`
  <header class="header">
    <div class="header-left">
        <img src="img/logo.svg" alt="logo" onclick="window.location.assign('./')" class="logo">
        <input type="text" class="barra-pesquisa" 
        placeholder="Pesquise aqui...">
    </div>
    <div class="header-right-all">
        <button class="button-1">Sobre</button> 
        <button class="button-2" onclick="irParaLogin()">Login</button> 
    </div>
  </header>`)

}


