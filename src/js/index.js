const menu = document.querySelector('.menu');
const game = document.querySelector('.game-play');
const gamePanel = document.querySelector('.game');

const scorePlayer1 = document.querySelector('.points-p1');
const scorePlayer2 = document.querySelector('.points-p2');

const initTable = function() {
   options.forEach((option) => {
    option.textContent = '?';
   });
}
const init = function(score1 = 0, score2 = 0) {
    initTable();
    gameOver = false;
    turn = true;
    scorePlayer1.textContent = score1;
    scorePlayer2.textContent = score2;
}

const comeback = document.querySelector('.comeback');
comeback.addEventListener('click', function() {
    menu.classList.toggle('exit');
    gamePanel.classList.toggle('exit');
});

const start = document.querySelector('.start-game');
start.addEventListener('click', function() {
    init();
    localStorage.clear();
    menu.classList.toggle('exit');
    gamePanel.classList.toggle('exit');
});

const resumeGame = document.querySelector('.resume');
resumeGame.addEventListener('click', function() {
    if(localStorage.getItem('player1') === undefined) {
        return;
    }
    scorePlayer1.textContent = JSON.parse(localStorage.getItem('player1'));
    scorePlayer2.textContent = JSON.parse(localStorage.getItem('player2'));
    init(+scorePlayer1.textContent, +scorePlayer2.textContent);
    menu.classList.toggle('exit');
    gamePanel.classList.toggle('exit');
});

let turn = true;
let gameOver = false;
const mapTable = {};

const wait = async (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time*1000);
    })
};

const returnHTML = function(player) {
    return `<div class="winner">
                <img class="sub-img" src="trofeo.31cc5e33.png">
                <p class="sub-text">The winner is Player ${player}!</p>
            </div>`;
};

const showWinner = async function(winner) {
    const win = winner.textContent === 'X' ? 1 : 2;
    gamePanel.insertAdjacentHTML('afterbegin', returnHTML(win));
    game.classList.toggle('blur');
        
    await wait(3);

    const alert = document.querySelector('.winner');
    alert.parentNode.removeChild(alert);
    game.classList.toggle('blur');
    winner.textContent === 'X' ? scorePlayer1.textContent = +scorePlayer1.textContent +1 : scorePlayer2.textContent = +scorePlayer2.textContent +1;
    localStorage.setItem('player1', JSON.stringify(scorePlayer1.textContent));
    localStorage.setItem('player2', JSON.stringify(scorePlayer2.textContent));
}

const verificateWinner = async () => {

    if( (mapTable[1].textContent === mapTable[2].textContent && mapTable[2].textContent === mapTable[3].textContent)  && (mapTable[1].textContent === 'X' || mapTable[1].textContent === 'O') ){
        gameOver = true;
        await showWinner(mapTable[1]);
    }else if(mapTable[4].textContent === mapTable[5].textContent && mapTable[5].textContent === mapTable[6].textContent && (mapTable[6].textContent === 'X' || mapTable[6].textContent === 'O')){
        gameOver = true;        
        await showWinner(mapTable[4]);
    }else if(mapTable[7].textContent === mapTable[8].textContent && mapTable[8].textContent === mapTable[9].textContent && (mapTable[9].textContent === 'X' || mapTable[9].textContent === 'O')){
        gameOver = true;
        await showWinner(mapTable[7]);
    }else if(mapTable[1].textContent === mapTable[5].textContent && mapTable[5].textContent === mapTable[9].textContent && (mapTable[9].textContent === 'X' || mapTable[9].textContent === 'O')) {
        gameOver = true;
        await showWinner(mapTable[1]);
    }else if(mapTable[3].textContent === mapTable[5].textContent && mapTable[5].textContent === mapTable[7].textContent && (mapTable[7].textContent === 'X' || mapTable[7].textContent === 'O')) {
        gameOver = true;
        await showWinner(mapTable[3]);
    }else if(mapTable[1].textContent === mapTable[4].textContent && mapTable[4].textContent === mapTable[7].textContent && (mapTable[7].textContent === 'X' || mapTable[7].textContent === 'O')) {
        gameOver = true;
        await showWinner(mapTable[1]);
    }else if(mapTable[2].textContent === mapTable[5].textContent && mapTable[5].textContent === mapTable[8].textContent && (mapTable[8].textContent === 'X' || mapTable[8].textContent === 'O')) {
        gameOver = true;
        await showWinner(mapTable[2]);
    }else if(mapTable[3].textContent === mapTable[6].textContent && mapTable[6].textContent === mapTable[9].textContent && (mapTable[9].textContent === 'X' || mapTable[9].textContent === 'O')) {
        gameOver = true;
        await showWinner(mapTable[3]);
    }
};

const again = document.querySelector('.restart');
again.addEventListener('click', function() {
    options.forEach( (option) => {
        option.textContent = '?';
    });
    gameOver = false;
    turn = true;
});

const options = document.querySelectorAll('.grid-item');
options.forEach((option, index) => {
    mapTable[index+1] = option;
    option.addEventListener('click', async function(e) {
        if(option.textContent === 'X' || option.textContent === 'O') return;
        if(gameOver) return;
        option.textContent = turn === true ? 'X' : 'O';
        verificateWinner();
        turn = !turn;
    });
});