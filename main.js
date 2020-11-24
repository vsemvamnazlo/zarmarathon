function $getElById(id) {
    return document.getElementById(id);
}
const elHP = $getElById('')
const elProgressbar = $getElById('')
const $btn = $getElById('btn-kick');
const $btn2 = $getElById('btn-poison');

const generate = (name, elHp, elProgressbar) => ({
    hit: 0,
    name: name,
    defaultHP: 100,
    damageHP: 100,
    elHP: $getElById(elHp),
    elProgressbar: $getElById(elProgressbar),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP,
}); 

const character = generate('Pickachu', 'health-character', 'progressbar-character');
const enemy = generate('Charmander', 'health-enemy', 'progressbar-enemy');

const character1 = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: $getElById('health-character'),
    elProgressbar: $getElById('progressbar-character'),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP,
}

const enemy1 = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: $getElById('health-enemy'),
    elProgressbar: $getElById('progressbar-enemy'),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP,
}


$btn.addEventListener('click', function() {
    if (counter1() <= 5) {
        const hitCharacter = random(20)
        const hitEnemy = random(20)
        //console.log('kick') 
        character.changeHP(hitCharacter);
        enemy.changeHP(hitEnemy);
    } else {
        $btn.disabled = true;
    }
});

let timeoutIds = [];

$btn2.addEventListener('click', function() {
    if (counter2() <= 2) {
    let psn = setInterval(() => enemy.changeHP(random(5)), 500);
    setTimeout(() => { clearInterval(psn); }, 2500);
    } else {
        $btn2.disabled = true;
    }
})

function init() {
    console.log('start game!')
    character.renderHP()
    enemy.renderHP()
}

function renderHP() {
    this.renderHPLife()
    this.renderProgressbarHP()
}
function renderHPLife(person) {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP; //
}

function renderProgressbarHP(person) {
    this.elProgressbar.style.width = this.damageHP + '%'
    return
}

function changeHP(count, person) {
    this.damageHP -= count;
    this.hit = count;

    const log = this ? generateLog(this, character) : generateLog(this, enemy);
    const $p = document.createElement('p')
    $p.innerText = log
    const $logs = document.querySelector('#logs')
    $logs.insertBefore($p, $logs.children[0])
    if (this.damageHP <= 0) {
        this.damageHP = 0
        alert('бедный ' + this.name + ' проиграл!')
        $btn.disabled = true;
    }
    
    this.renderHP();

}

function random (num) {
    return Math.ceil(Math.random() * num)
}

function generateLog(firstPerson, secondPerson) {
    console.log()

    const logs = [
        `${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.hit} вспомнил что-то важное, но неожиданно ${secondPerson.name} ${secondPerson.damageHP} / ${secondPerson.hit}, не помня себя от испуга, ударил в предплечье врага.`,
        `${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.hit} поперхнулся, и за это ${secondPerson.name} ${secondPerson.damageHP} / ${secondPerson.hit} с испугу приложил прямой удар коленом в лоб врага.`,
        `${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.hit} забылся, но в это время наглый ${secondPerson.name} ${secondPerson.damageHP} / ${secondPerson.hit}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.hit} пришел в себя, но неожиданно ${secondPerson.name} ${secondPerson.damageHP} / ${secondPerson.hit} случайно нанес мощнейший удар.`,
        `${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.hit} поперхнулся, но в это время ${secondPerson.name} ${secondPerson.damageHP} / ${secondPerson.hit} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
        `${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.hit} удивился, а ${secondPerson.name} ${secondPerson.damageHP} / ${secondPerson.hit} пошатнувшись влепил подлый удар.`,
        `${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.hit} высморкался, но неожиданно ${secondPerson.name} ${secondPerson.damageHP} / ${secondPerson.hit} провел дробящий удар.`,
        `${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.hit} пошатнулся, и внезапно наглый ${secondPerson.name} ${secondPerson.damageHP} / ${secondPerson.hit} беспричинно ударил в ногу противника`,
        `${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.hit} расстроился, как вдруг, неожиданно ${secondPerson.name} ${secondPerson.damageHP} / ${secondPerson.hit} случайно влепил стопой в живот соперника.`,
        `${firstPerson.name} ${firstPerson.damageHP} / ${firstPerson.hit} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} ${secondPerson.damageHP} / ${secondPerson.hit} со скуки, разбил бровь сопернику.`
    ];

    //console.log(character1.damageHP - character.damageHP);
    //console.log(damageEnemy);
    //console.log(damageChar);
    return logs[random(logs.length) - 1]
}


function useCounter() {
    let Count = 0;
 
    return function(n = 0) {
        Count += n;
        return Count
    }
}
 
const counter1 = useCounter();
const counter2 = useCounter();
 
function count1() {
  console.log('thunder jolt использован ' + counter1(1) + ' раз(а)');
}

function count2 () {
    console.log('poison использован ' + counter2(1) + ' раз(а)')
}




init();