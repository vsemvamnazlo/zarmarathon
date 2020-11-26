import Pokemon from "./pokemon.js";


const player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    hp: 500,
    selectors: 'character',
});
const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 450,
    selectors: 'enemy',
});


function $getElById(id) {
    return document.getElementById(id);
};

const $btn = $getElById('btn-kick');
const $btn2 = $getElById('btn-poison');

const btnCountJolt = countBtn(6, $btn);
$btn.addEventListener("click", function () {
    btnCountJolt();
    player1.changeHP(random(60, 20), function (count) {
      console.log("Урон по пикачу", count);
      console.log(generateLog(player1, player2, count));

      const log = generateLog(player1, player2, count)
      const $p = document.createElement('p');
      $p.innerText = log;
      const $logs = document.querySelector('#logs');
      $logs.insertBefore($p, $logs.children[0]);
    });
    player2.changeHP(random(60, 20), function (count) {
      console.log("Урон по чармандеру", count);
    });
});

const btnCountPoison = countBtn(3, $btn2);
$btn2.addEventListener("click", function () {
  btnCountPoison();
  let psn = setInterval(
    () =>
      player2.changeHP(random(20), function (count) {
        console.log("Урон по чармандеру", count);
        console.log(generateLog(player1, player2, count));

        const log = generateLog(player1, player2, count)
        const $p = document.createElement('p');
        $p.innerText = log;
        const $logs = document.querySelector('#logs');
        $logs.insertBefore($p, $logs.children[0]);
      }),
    500
  );
  setTimeout(() => {
    clearInterval(psn);
  }, 2500);
});

function countBtn(count = 6, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${count})`;
    return function () {
        count--;
        if (count === 0) {
            el.disabled = true;
        }
        el.innerText = `${innerText} (${count})`;
        return count;
    }
};


function random (num) {
    return Math.ceil(Math.random() * num)
};

function generateLog(player1, player2, count) {
    const { name, hp: { current, total } } = player1;
    const { name: enemyName } = player2
    const logs = [
        `${name} вспомнил что-то важное, но неожиданно ${enemyName}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${current}/${total}]`,
        `${name} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${current}/${total}]`,
        `${name} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${current}/${total}]`,
        `${name} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар. -${count}, [${current}/${total}]`,
        `${name} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${count}, [${current}/${total}]`,
        `${name} удивился, а ${enemyName} пошатнувшись влепил подлый удар. -${count}, [${current}/${total}]`,
        `${name} высморкался, но неожиданно ${enemyName} провел дробящий удар. -${count}, [${current}/${total}]`,
        `${name} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника. -${count}, [${current}/${total}]`,
        `${name} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника. -${count}, [${current}/${total}]`,
        `${name} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику. -${count}, [${current}/${total}]`,
    ];

    return logs[random(logs.length) - 1];
};