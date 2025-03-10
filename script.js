let primeiroUsuarioInput = document.querySelector('#first-username');
let segundoUsuarioInput = document.querySelector('#second-username');

let resultado = document.querySelector('#show-results');
let mostrar = false;

let button = document.querySelector('#reiniciar');

verificador();


function abrirFecharResultado(){

    mostrar = !mostrar;

    if (mostrar){
        resultado.style.display = 'block';
        reiniciar.innerHTML = 'Fechar resultado'

    } else {
        resultado.style.display = 'none'
        reiniciar.innerHTML = 'Abrir resultado'
    }
}



async function mostrarResultado(){
    let primeiroUsuario = primeiroUsuarioInput.value
    let segundoUsuario = segundoUsuarioInput.value

    if (verificador()){
        mostrar = !mostrar;
        console.log(mostrar)

        button.style.display = 'block';
        resultado.style.display = 'block'
        

        try{
            let usuario1 = await buscarPerfil(`${primeiroUsuario}`);
            let usuario2 = await buscarPerfil(`${segundoUsuario}`);

            renderizarHTML(usuario1, usuario2);
    
    
            if (!usuario1 && !usuario2) {
                mostrarComparacoes.style.display = 'none'
            } 
            
        } catch (erro) {
            console.log('Deu erro', erro)
        }
    } else {
        alert('tem coisa errada');
        button.style.display = 'none';
        resultado.style.display = 'none';
    }
    
}

function renderizarHTML(firstUsername, secondUsername){
    // Renderizar os nomes de usuário
    let primeiroNome = document.querySelector('#nome-primeiro-usuario')
    let segundoNome = document.querySelector('#nome-segundo-usuario')
    primeiroNome.innerHTML = `${firstUsername.name}`
    segundoNome.innerHTML = `${secondUsername.name}`

    // Renderizando as fotos de perfis
    let primeiraFoto = document.querySelector('#photo-first-user');
    let segundaFoto = document.querySelector('#photo-second-user');
    primeiraFoto.setAttribute("src", firstUsername.avatar_url);
    segundaFoto.setAttribute("src", secondUsername.avatar_url);

    // Renderizando as informações de usuário
    let infoPrimeiroUsuario = document.querySelector('#infomations-first-user');
    let infoPrimeiroLink = `https://github-readme-stats.vercel.app/api?username=${firstUsername.login}&show_icons=true&theme=chartreuse-dark&locale=pt-br`;
    infoPrimeiroUsuario.setAttribute('src', infoPrimeiroLink);
    let infoSegundoUsuario = document.querySelector('#informations-second-user');
    let infoSegundoLink = `https://github-readme-stats.vercel.app/api?username=${secondUsername.login}&show_icons=true&theme=midnight-purple&locale=pt-br`;
    infoSegundoUsuario.setAttribute('src', infoSegundoLink);

    // Renderizando as linguagens mais usadas
    let linguagensPrimeiroUsuario = document.querySelector('#languages-first-user');
    let linklinguagensPrimeiroUsuario = `https://github-readme-stats.vercel.app/api/top-langs/?username=${firstUsername.login}&size_weight=0.5&count_weight=0.5&theme=chartreuse-dark&&locale=pt-br&langs_count=7`;
    linguagensPrimeiroUsuario.setAttribute('src', linklinguagensPrimeiroUsuario);

    let linguagensSegundoUsuario = document.querySelector('#languages-second-user');
    let linklinguagensSegundoUsuario = `https://github-readme-stats.vercel.app/api/top-langs/?username=${secondUsername.login}&size_weight=0.5&count_weight=0.5&theme=midnight-purple&locale=pt-br&langs_count=7`;
    linguagensSegundoUsuario.setAttribute('src', linklinguagensSegundoUsuario);
    
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

function verificador(){
    button.style.display = 'none';
    resultado.style.display = 'none';
    if (primeiroUsuarioInput.value == "" || segundoUsuarioInput.value == ""){
        return false
    } else {
        return true
    }
}


