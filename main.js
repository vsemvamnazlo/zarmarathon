function $getElById(id) {
    return document.getElementById(id);
}

const $btn = $getElById('btn-kick');
const $btn2 = $getElById('btn-poison');

const generate = (name, elHp, elProgressbar) => ({
    name: name,
    defaultHP: 100,
    damageHP: 100,
    elHP: $getElById(elHp),
    elProgressbar: $getElById(elProgressbar),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}); 

const character = generate('Pickachu', 'health-character', 'progressbar-character');
const enemy = generate('Charmander', 'health-enemy', 'progressbar-enemy');

const character1 = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: $getElById('health-character'),
    elProgressbar: $getElById('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}

const enemy1 = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: $getElById('health-enemy'),
    elProgressbar: $getElById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP, renderProgressbarHP,
}

$btn.addEventListener('click', function() {
    console.log('kick') 
    character.changeHP(random(20));
    enemy.changeHP(random(20));
});

let timeoutIds = [];

$btn2.addEventListener('click', function() {
    let psn = setInterval(() => enemy.changeHP(random(5)), 1000);
    setTimeout(() => { clearInterval(psn); }, 5000);
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

}

function changeHP(count, person) {
    this.damageHP -= count

    const log = this === enemy1 ? generateLog(this, character1) : generateLog(this, enemy1);
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
    const logs = [
        `${firstPerson.name} ${firstPerson.elHP.innerText} вспомнил что-то важное, но неожиданно ${secondPerson.name} ${secondPerson.elHP.innerText}, не помня себя от испуга, ударил в предплечье врага.`,
        `${firstPerson.name} ${firstPerson.elHP.innerText} поперхнулся, и за это ${secondPerson.name} ${secondPerson.elHP.innerText} с испугу приложил прямой удар коленом в лоб врага.`,
        `${firstPerson.name} ${firstPerson.elHP.innerText} забылся, но в это время наглый ${secondPerson.name} ${secondPerson.elHP.innerText}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${firstPerson.name} ${firstPerson.elHP.innerText} пришел в себя, но неожиданно ${secondPerson.name} ${secondPerson.elHP.innerText} случайно нанес мощнейший удар.`,
        `${firstPerson.name} ${firstPerson.elHP.innerText} поперхнулся, но в это время ${secondPerson.name} ${secondPerson.elHP.innerText} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
        `${firstPerson.name} ${firstPerson.elHP.innerText} удивился, а ${secondPerson.name} ${secondPerson.elHP.innerText} пошатнувшись влепил подлый удар.`,
        `${firstPerson.name} ${firstPerson.elHP.innerText} высморкался, но неожиданно ${secondPerson.name} ${secondPerson.elHP.innerText} провел дробящий удар.`,
        `${firstPerson.name} ${firstPerson.elHP.innerText} пошатнулся, и внезапно наглый ${secondPerson.name} ${secondPerson.elHP.innerText} беспричинно ударил в ногу противника`,
        `${firstPerson.name} ${firstPerson.elHP.innerText} расстроился, как вдруг, неожиданно ${secondPerson.name} ${secondPerson.elHP.innerText} случайно влепил стопой в живот соперника.`,
        `${firstPerson.name} ${firstPerson.elHP.innerText} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} ${secondPerson.elHP.innerText} со скуки, разбил бровь сопернику.`
    ];

    //console.log(firstPerson.elHP);
    return logs[random(logs.length) - 1]
}

init();