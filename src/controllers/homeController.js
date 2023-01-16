exports.paginaInicial = (req, res) => {
    res.send(`
    <form action="/" method="POST">
    Nome: <input type="text" name="qlqrcoisa"><br>
    <button>enviar</button>
    </form>
    `);
};


exports.trataPost = (req, res) => {
    res.send('Tratamento de post');
};