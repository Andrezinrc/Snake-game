
let canvas = document.createElement("canvas");
canvas.id = "snowCanvas";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
let selecionarNivel = document.getElementById("levelSelect");
let btnMenu = document.getElementById("btn-menu");
let menu = document.getElementById("menu-mobile");
let alerta = document.getElementById("alert-input");


let ctx = canvas.getContext("2d");

let flocosDeNeve = [];

// Função para criar flocos de neve
function criarFlocosDeNeve() {
    for (var i = 0; i < 100; i++) {
        flocosDeNeve.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            raio: Math.random() * 4 + 1,
            velocidade: Math.random() * 2 + 1,
            opacidade: Math.random(),
        });
    }
}

// Função para desenhar os flocos de neve
function desenharFlocosDeNeve() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";

    for (var i = 0; i < flocosDeNeve.length; i++) {
        var flocoDeNeve = flocosDeNeve[i];
        ctx.beginPath();
        ctx.arc(flocoDeNeve.x, flocoDeNeve.y, flocoDeNeve.raio, 0, Math.PI * 2);
        ctx.closePath();
        ctx.globalAlpha = flocoDeNeve.opacidade;
        ctx.fill();
    }
}

// Função para atualizar a posição dos flocos de neve
function atualizarFlocosDeNeve() {
    for (var i = 0; i < flocosDeNeve.length; i++) {
        var flocoDeNeve = flocosDeNeve[i];
        flocoDeNeve.y += flocoDeNeve.velocidade;

        if (flocoDeNeve.y > canvas.height) {
            flocoDeNeve.y = -5;
        }
    }
}

// Função para animar a neve
function animarNeve() {
    desenharFlocosDeNeve();
    atualizarFlocosDeNeve();
    requestAnimationFrame(animarNeve);
}

criarFlocosDeNeve();
animarNeve();

btnMenu.addEventListener("click", () => {
    btnMenu.classList.toggle('ativar');
    menu.classList.toggle('abrirMenu');
});

// Função para iniciar o jogo
function iniciarJogo() {
    let nomeJogador = document.getElementById("playerName").value;
    let corSelecionada = document.getElementById("colorSelect").value;

    if (nomeJogador === "") {
        alerta.style.display = "block";
        setTimeout(() => {
            alerta.style.display = "none";
        }, 3000);
    } else {
        localStorage.setItem("playerName", nomeJogador);
        localStorage.setItem("backgroundColor", corSelecionada);
        window.location.href = "game.html";
    }
}
