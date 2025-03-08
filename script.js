let primeiroUsuarioInput = document.querySelector('#first-username');
let segundoUsuarioInput = document.querySelector('#second-username');

let resultado = document.querySelector('#resultado-da-busca');

async function mostrarResultado(){
    let primeiroUsuario = primeiroUsuarioInput.value
    let segundoUsuario = segundoUsuarioInput.value

    try{
        let usuario1 = await buscarPerfil(`${primeiroUsuario}`);
        let usuario2 = await buscarPerfil(`${segundoUsuario}`);

        console.log(usuario1, usuario2)
        resultado.innerHTML = `<p> ${usuario1.login} e ${usuario2.name} </p>`;

        let primeiraFoto = document.querySelector('#photo-first-user');
        let segundaFoto = document.querySelector('#photo-second-user');
        primeiraFoto.setAttribute("src", usuario1.avatar_url);
        segundaFoto.setAttribute("src", usuario2.avatar_url);

        let primeiroNome = document.querySelector('#nome-primeiro-usuario')
        let segundoNome = document.querySelector('#nome-segundo-usuario')
        primeiroNome.innerHTML = `${usuario1.name}`
        segundoNome.innerHTML = `${usuario2.name}`

        let infoPrimeiroUsuario = document.querySelector('#infomations-first-user');
        let infoPrimeiroLink = `https://github-readme-stats.vercel.app/api?username=${usuario1.login}&show_icons=true&theme=chartreuse-dark&locale=pt-br`;
        infoPrimeiroUsuario.setAttribute('src', infoPrimeiroLink);

        let infoSegundoUsuario = document.querySelector('#informations-second-user');
        let infoSegundoLink = `https://github-readme-stats.vercel.app/api?username=geovanecss&show_icons=true&theme=midnight-purple&locale=pt-br`;
        infoSegundoUsuario.setAttribute('src', infoSegundoLink);

        let linguagensPrimeiroUsuario = document.querySelector('#languages-first-user');
        let linklinguagensPrimeiroUsuario = `https://github-readme-stats.vercel.app/api/top-langs/?username=${usuario1.login}&size_weight=0.5&count_weight=0.5&theme=chartreuse-dark&&locale=pt-br&langs_count=7`;
        linguagensPrimeiroUsuario.setAttribute('src', linklinguagensPrimeiroUsuario);

        let linguagensSegundoUsuario = document.querySelector('#languages-second-user');
        let linklinguagensSegundoUsuario = `https://github-readme-stats.vercel.app/api/top-langs/?username=${usuario2.login}&size_weight=0.5&count_weight=0.5&theme=midnight-purple&locale=pt-br&langs_count=7`;
        linguagensSegundoUsuario.setAttribute('src', linklinguagensSegundoUsuario);

        let mostrarComparacoes = document.querySelector('#show-results');
        if (!usuario1 && !usuario2) {
            mostrarComparacoes.style.display = 'none'
        } 
        
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



