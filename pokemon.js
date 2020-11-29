
class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elImage = document.getElementById(`image-${name}`);
        this.elName = document.getElementById(`name-${name}`);
    }
}

class Pokemon extends Selectors { 
    constructor({ name, hp, type, selectors, attacks = [], pokemons = [], img }) {
        super(selectors);

        this.name = name
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks;
        this.pokemons = pokemons

        this.renderName();
        this.renderHP();
        this.renderImage(img);
    }
    

    changeHP = (count, cb) => {
        this.hp.current -= count;

        // if (this.hp.current <= 0) {
        //     this.hp.current = 0;
        //     alert('бедный ' + this.name + ' проиграл!');
        //     $btn.disabled = true;
        //     $btn2.disabled = true;
        // }
        
        this.renderHP();
        cb && cb(count);
        
    }

    renderName() {
        this.elName.innerText = this.name;
    }

    renderImage = (src) => {
        this.elImage.src = src
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