const resetButton = document.querySelector('#reset');
const select = document.querySelector('#winningScore');
const deuce = document.querySelector('#deuce');
const p1 = {
  score: 0,
  display: document.querySelector('#p1Display'),
  button: document.querySelector('#p1Button'),
};

const p2 = {
  score: 0,
  display: document.querySelector('#p2Display'),
  button: document.querySelector('#p2Button'),
};

let winningScore = 3;
let isGameOver = false;
let isdeuce = false;

function updateScore(player, opponent) {
  if (!isGameOver) {
    player.score += 1;
    player.display.textContent = player.score;
    if (winningScore === player.score) {
      isGameOver = true;
      player.display.classList.add('has-text-success');
      opponent.display.classList.add('has-text-danger');
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
  }
}

function updateDeuce() {
  if (p1.score >= 10 && p2.score >= 10 && p1.score === p2.score) {
    winningScore += 1;
    deuce.textContent = `deuceになりました!${winningScore}点先取したら勝利です`;
  }
}

p1.button.addEventListener('click', () => {
  updateScore(p1, p2);
  updateDeuce();
});

p2.button.addEventListener('click', () => {
  updateScore(p2, p1);
  updateDeuce();
});

resetButton.addEventListener('click', reset);

select.addEventListener('change', () => {
  winningScore = parseInt(select.value);
  reset();
});

function reset() {
  isGameOver = false;
  deuce.textContent = '';
  for (let player of [p1, p2]) {
    player.score = 0;
    player.display.textContent = 0;
    player.display.classList.remove(...player.display.classList);
    player.button.disabled = false;
  }
}
