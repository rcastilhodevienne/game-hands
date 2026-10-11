let pontos = 0;
let tempo = 10.0;
let jogando = false;
let timer;

const btnClick = document.getElementById('btn-click');
const txtTempo = document.getElementById('tempo');
const txtPontos = document.getElementById('pontos');
const areaFim = document.getElementById('area-fim');
const btnZap = document.getElementById('btn-zap');

// Funciona tanto para clique do rato quanto para toque no telemóvel
btnClick.addEventListener('pointerdown', () => {
    // Se o jogo ainda não começou, inicia o cronómetro
    if (!jogando && tempo === 10.0) {
        jogando = true;
        btnClick.textContent = "ESMAGUE!";
        
        timer = setInterval(() => {
            tempo -= 0.1;
            txtTempo.textContent = Math.max(0, tempo).toFixed(1);
            
            // Quando o tempo acaba
            if (tempo <= 0) {
                clearInterval(timer);
                jogando = false;
                btnClick.style.display = "none"; // Esconde o botão de jogar
                areaFim.style.display = "block"; // Mostra os botões finais
                prepararLinkZap();
            }
        }, 100);
    }

    // Se está a jogar, soma pontos
    if (jogando) {
        pontos++;
        txtPontos.textContent = pontos;
        
        // Efeito de vibração rápida se o telemóvel suportar
        if (navigator.vibrate) navigator.vibrate(10);
    }
});

function prepararLinkZap() {
    const cps = (pontos / 10).toFixed(1); // Cliques por segundo
    // ATENÇÃO: Substitua o link abaixo pelo link real do seu GitHub Pages
    const linkDoJogo = "https://[SEU-USUARIO].github.io/jogo-viral/";
    
    const mensagem = `🔥 Fiz ${pontos} cliques em 10 segundos (${cps} cliques por segundo)! Tenho um dedo super sónico. Duvido que me batas no Desafio do Dedo Nervoso! Tenta aqui: ${linkDoJogo}`;
    
    btnZap.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;
}
