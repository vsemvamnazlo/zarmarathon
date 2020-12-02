import Pokemon from "./pokemon.js";


class Game {
    getPoke = async () => {
        const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true')
        const body = await response.json();
        return body;
    }
    start = async () => {

const randomPokemon1 = await this.getPoke();
const randomPokemon2 = await this.getPoke();
        
let player1 = new Pokemon({
    ...randomPokemon1,
    selectors: 'player1',
});

let player2 = new Pokemon({
    ...randomPokemon2,
    selectors: 'player2',
});


const $control = document.querySelector('.control');
const $buttons = [];

player1.attacks.forEach(item => {
    //console.log(item);
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = item.name;
    const btnCount = countBtn(item.maxCount, $btn);
    $btn.addEventListener('click', (count) => {
      console.log('click button ', $btn.innerText);
      player2.changeHP(random(item.maxDamage, item.minDamage));
      btnCount();
      randomHit();

      const log = generateLog(player1, player2, count)
      const $p = document.createElement('p');
      $p.innerText = log;
      const $logs = document.querySelector('#logs');
      $logs.insertBefore($p, $logs.children[0]);
    });
    $control.appendChild($btn);
    $buttons.push($btn);
});


function randomHit() {
    const btnRandomSkill = document.createElement('button');
    const randomSkill = player2.attacks[Math.floor(Math.random() * player2.attacks.length)];
    btnRandomSkill.innerText = `${randomSkill.name} (${randomSkill.maxCount})`;
    btnRandomSkill.style.display = "none";
    const btnCount = countBtn(randomSkill.maxCount, btnRandomSkill);
    btnRandomSkill.addEventListener('click', () => {
        btnRandomSkill.innerText = randomSkill.name;
        console.log('click button', btnRandomSkill.innerText);
        player1.changeHP(random(randomSkill.maxDamage, randomSkill.minDamage));
        btnCount();
    })
    btnRandomSkill.click();
    btnRandomSkill.remove();
};

function $getElById(id) {
    return document.getElementById(id);
};

function countBtn(count = 6, el,) {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${count})`;
    return function () {
        count--;
        if (count === 0) {
            el.disabled = true;
        }
        if (player1.hp.current <= 0) {
            player1.hp.current = 0;
            player1.renderHP();
            alert('бедный ' + player1.name + ' проиграл!');
            disableButtons();
        }
        if (player2.hp.current <= 0) {
            player2.hp.current = 0;
            player2.renderHP();
            alert('бедный ' + player2.name + ' проиграл!');
            disableButtons();
        }  
        el.innerText = `${innerText} (${count})`;
        return count;
    }
};

function disableButtons() {
    $buttons.forEach(button => button.disabled = true);
};

function random (num) {
    return Math.ceil(Math.random() * num)
};

function generateLog(player1, player2, count) {
    const { name, hp: { current, total } } = player1;
    const { name: enemyName } = player2
    const logs = [
        `${name} вспомнил что-то важное, но неожиданно ${enemyName}, не помня себя от испуга, ударил в предплечье врага. , [${current}/${total}]`,
        `${name} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага. , [${current}/${total}]`,
        `${name} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил. , [${current}/${total}]`,
        `${name} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар. , [${current}/${total}]`,
        `${name} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. , [${current}/${total}]`,
        `${name} удивился, а ${enemyName} пошатнувшись влепил подлый удар. , [${current}/${total}]`,
        `${name} высморкался, но неожиданно ${enemyName} провел дробящий удар. , [${current}/${total}]`,
        `${name} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника. , [${current}/${total}]`,
        `${name} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника. , [${current}/${total}]`,
        `${name} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику. , [${current}/${total}]`,
    ];

    return logs[random(logs.length) - 1];
};

    }
}

const game = new Game();
game.start();
