document.write(`
<header class="header">
    <div class="header-left">
        <img src="img/logo.svg" alt="logo" onclick="window.location.assign('./')" class="logo">
        <div id="barraDeBusca">
          <input autocomplete="off" id="imputBusca" type="text" class="barra-pesquisa" placeholder="Pesquise aqui...">
          <div id="buscaResultados" class="respBusca">
              <div class="mt-2"></div>
          </div>
        </div>
    </div>
    <div class="header-right-all">
        <button class="button-1">Sobre</button> 
        <button class="button-2" onclick="irParaLogin()">Login</button> 
    </div>
  </header>
    `)
