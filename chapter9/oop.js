class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this._userGears = ['P', 'N', 'R', 'D'];
        this._userGear = this._userGears[0];
    }

    get userGear() { return this._userGear; }
    set userGear(value) {
        if(this._userGears.indexOf(value) < 0)
            throw new Error(`Invaild gear: ${value}`);
        this._userGear = value;
    }
}

/*
const car1 = new Car();
const car2 = new Car();

car1 instanceof Car     // true
car1 instanceof Array   // false
*/

const car1 = new Car("Tesla", "Model S");
console.log(car1._userGear);
console.log(car1.userGear);

// 스코프를 이용해 보호하는 WeakMap 사용 예시
const CarWeakMap = (function() {
    
    const carProps = new WeakMap();

    class Car {
        constructor(make, model) {
            this.make = make;
            this.model = model;
            this._userGears = ['P', 'N', 'R', 'D'];
            carProps.set(this, { userGear: this._userGears[0] });
        }
    
        get userGear() { return carProps.get(this).userGaer; }
        set userGear(value) {
            if(this._userGears.indexOf(value) < 0)
            {
                throw new Error(`Invaild gear: ${value}`);
            }
        }

        shift(gear) { this.userGear = gear; }
    }

    return Car;
})();

// ES5에서 클래스를 만든다면?
function CarEs5(make, model) {
    this.make = make;
    this.model = model;
    this._userGears = ['P', 'N', 'R', 'D'];
    this._userGear = this.userGears[0];
}

// 클래스는 사실 자바스크립트에서 function이다.
class CarEs6 {}
console.log(typeof(CarEs5));
console.log(typeof(CarEs6));