// Conexão dos elementos com o DOM

let primeiroUsuarioInput = document.querySelector("#primeiro-usuario");

let segundoUsuarioInput = document.querySelector('#segundo-usuario');

let btnSubmit = document.querySelector('#btnSubmit');

let formulario = document.querySelector('#form-search-profile');


let resultado = document.querySelector('#resultado-da-busca');


async function mostrarResultado(){
    let primeiroUsuario = primeiroUsuarioInput.value
    let segundoUsuario = segundoUsuarioInput.value

    try{
        let usuario1 = await buscarPerfil(`${primeiroUsuario}`);
        let usuario2 = await buscarPerfil(`${segundoUsuario}`);

    resultado.innerHTML = `<p> ${usuario1.login} e ${usuario2.name} </p>`;
    } catch (erro) {
        console.log('Deu erro', erro)
    }
}

async function buscarPerfil(usuarioNome) {
    try {
        const resposta = await fetch(`https://api.github.com/users/${usuarioNome}`);
        const usuarioInfo = await resposta.json();
        return usuarioInfo;
    } catch (erro) {
        console.log(`Deu erro ${erro}`)
    }
}





