let seuVotoPara = document.querySelector('.div-1-1 span');
let cargo = document.querySelector('.div-1-2 span');
let descricao = document.querySelector('.div-1-4');
let warning = document.querySelector('.div-2');
let lateral = document.querySelector('.div-1-direita');
let numeros = document.querySelector('.div-1-3');

let etapaAtual = 0;
let numero = '';
let branco = false;
let votos = [];

function startEtapa () {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero='';

    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
        numeroHtml += '<div class="square-numbers pisca"></div>';
    } else {
        numeroHtml += '<div class="square-numbers"></div>';
    }
}

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    warning.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function interfaceRefresh() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length>0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        warning.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br/> Partido: ${candidato.partido} <br/> Vice: ${candidato.vice}`

        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
            fotosHtml += `<div class="div1-imagem small"><img src="images/${candidato.fotos[i].url}" alt="Presidente1">${candidato.fotos[i].legenda}</div>`
            } else {
            fotosHtml += `<div class="div1-imagem"><img src="images/${candidato.fotos[i].url}" alt="Presidente1">${candidato.fotos[i].legenda}</div>`
            }
        }


        lateral.innerHTML = fotosHtml;

    } else {
        seuVotoPara.style.display = 'block';
        warning.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-big pisca">VOTO NULO</div>';

    }

}

function clicou(n) {
    let oNumero = document.querySelector('.square-numbers.pisca');
    if(oNumero !== null) {
        oNumero.innerHTML= n;
        numero = `${numero}${n}`;

        oNumero.classList.remove('pisca');
        if(oNumero.nextElementSibling !== null) {
        oNumero.nextElementSibling.classList.add('pisca');
    } else {
        interfaceRefresh();
    }
}
}

function white() {
    if(numero==='') {
branco = true;
seuVotoPara.style.display = 'block';
warning.style.display = 'block';
numeros.innerHTML = '';
descricao.innerHTML = '<div class="aviso-big2 pisca">VOTO EM BRANCO</div>'
    } else {
        alert('Você não pode votar em branco quando houver números digitados na tela');
    }
}

function restart() {
    startEtapa();
}

function confirm() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(branco===true) {
        votoConfirmado = true;
        votos.push({
        etapa: etapas[etapaAtual].titulo,
        voto: 'branco'
    });
    } else if(numero.length === etapa.numeros) {
        votoConfirmado =true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'numero'
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            startEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-large pisca">FIM! ♥</div>'
        }
    }
}

startEtapa();

