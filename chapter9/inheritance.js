// 상속

class Vehicle {
    constructor() {
        this.passengers = [];
        console.log("Vehicle created");
    }
    addPassenger(p) {
        this.passengers.push(p);
    }
}

class Car extends Vehicle {
    constructor() {
        super();    // super 클래스 생성자 호출
        console.log("Car created");
    }
    deployAirbags() {
        console.log("BWOOSH!");
    }
}

/*
const v = new Vehicle();
v.addPassenger("Frank");
v.addPassenger("Judy");
console.log(v.passengers);  // ["Frank", "Judy"]
const c = new Car();
c.addPassenger("Alice");
c.addPassenger("Cameron");
console.log(c.passengers);  // ["Alice", "Cameron"]
//v.deployAirbags();        // error
c.deployAirbags();          // "BWOOSH!"
*/

// Polymorphism
class Motorcycle extends Vehicle {}
const c = new Car();
const m = new Motorcycle();
console.log(c instanceof Car);           // true
console.log(c instanceof Vehicle);       // true
console.log(m instanceof Car);           // false
console.log(m instanceof Motorcycle);    // true
console.log(m instanceof Vehicle);       // true

// ES6 클래스를 설계 의도대로 사용한다면 데이터 프로퍼티는 항상 프로토타입 체인이 아니라 인스턴스에 정의해야 한다.
// 하지만 프로퍼티를 프로토타입에 정의하지 못하도록 강제하는 장치는 없으므로
// 확실히 확인하려면 항상 hasOwnProperty를 사용하는 편이 좋다.

class Super {
    constructor() {
        this.name = 'Super';
        this.isSuper = true;
    }
}

// 유효하지만, 권장하지 않음.
Super.prototype.sneaky = 'not recommended!';

class Sub extends Super {
    constructor() {
        super();
        this.name = 'Sub';
        this.isSub = true;
    }
}

const obj = new Sub();

for(let p in obj) {
    console.log(`${p}: ${obj[p]}`
        + (obj.hasOwnProperty(p) ? '' : ' (inherited)'));
}

// 문자열 표현 : toString()
// toStirng 메서드를 이용하여 객체에 관한 중요 정보를 제공하면 디버깅에도 유용하고, 객체를 한눈에 파악할 수 있다.
 
class People {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() {
        return `name : ${this.name}, age : ${this.age}`;
    }
}

const man = new People("Huge", "25");

console.log(man.toString());