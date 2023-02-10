if (sessionStorage.getItem('Logado')) {
  document.write(`
  <header class="header">
  <div class="header-left">
    <img src="img/logo.svg" alt="logo" onclick="window.location.assign('./filtros')" class="logo">
    <input autocomplete="off" id="imputBusca" type="text" class="barra-pesquisa" 
      placeholder="Pesquise aqui...">
      <div id="buscaResultados" class="respBusca-login"></div>
  </div>
  <div class="header-right-all-login">
    <a href="./minhaconta">
      <span id="username">`+sessionStorage.getItem('nome')+`</span>
    </a>
    <a href="./minhaconta">
      <img src="./img/login.svg" alt="" id="img-user">
    </a>
  </div>
  </header>`)
} else {
  
  document.write(`
  <header class="header">
    <div class="header-left">
        <img src="img/logo.svg" alt="logo" onclick="window.location.assign('./')" class="logo">
        <input autocomplete="off" id="imputBusca" type="text" class="barra-pesquisa" 
        placeholder="Pesquise aqui...">
        <div id="buscaResultados" class="respBusca"></div>
    </div>
    <div class="header-right-all">
        <button class="button-1">Sobre</button> 
        <button class="button-2" onclick="irParaLogin()">Login</button> 
    </div>
  </header>`)

}


