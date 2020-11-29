const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-poison');
class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, hp, type, selectors}) {
        super(selectors);

        this.name = name
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;

        this.renderHP();
    }
    

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
            alert('бедный ' + this.name + ' проиграл!');
            $btn.disabled = true;
            $btn2.disabled = true;
        }
        
        this.renderHP();
        cb && cb(count);
        
    }

    
    renderHP = () => {
        this.renderHPLife()
        this.renderProgressbarHP()
    }
    renderHPLife = (person) => {
        const { elHP, hp: { current, total } } = this;
        elHP.innerText = current + ' / '+ total;
    }
    
    renderProgressbarHP = (person) => {
        const { hp: { current, total }, elProgressbar } = this;
        const procent = current / (total / 100);
        elProgressbar.style.width = procent + '%';
    }
}

export default Pokemon;