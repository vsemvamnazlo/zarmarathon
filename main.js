const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-poison');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
}

$btn.addEventListener('click', function() {
    console.log('kick') 
    changeHP(randon(20), character);
    changeHP(randon(20), enemy);
});

$btn2.addEventListener('click', function() {
    let psn = setInterval(() => changeHP(randon(5), enemy), 1000);
    setTimeout(() => { clearInterval(psn); }, 5000)
})

function init() {
    console.log('start game!')
    renderHP(character)
    renderHP(enemy)
}

function renderHP(person) {
    renderHPLife(person)
    renderProgressbarHP(person)
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP; //
}

function renderProgressbarHP (person) {
    person.elProgressbar.style.width = person.damageHP + '%'

}

function changeHP(count, person) {
    if (person.damageHP < count) {
        person.damageHP = 0
        
        alert('бедный ' + person.name + ' проиграл!')
        $btn.disabled = true;
    } else {
        person.damageHP -= count
    }
    renderHP(person);

}

function randon (num) {
    return Math.ceil(Math.random() * num)
}

init();