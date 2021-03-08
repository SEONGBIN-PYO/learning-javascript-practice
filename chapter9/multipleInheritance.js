class Car {
    static getNextVin() {
        return Car.nextVin++;
    }

    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.vin = Car.getNextVin();
    }
}

// 믹스인(mixins) 기법 : 특정 기능(행위)만을 기능하는 클래스를 만들어서 코드 재사용 패턴을 구현한다.
/*
class InsurancePolicy {}
function makeInsurable(o) {
    o.addInsurancePolicy = function(p) { this.insurancePolicy = p; }
    o.getInsurancePolicy = function() { return this.insurancePolicy; }
    o.isInsured = function() { return !!this.insurancePolicy; }
}
*/

// 아래와 같이 보험 항목을 추가해도 되지만, 모든 객체에서 makeInsurable을 호출해야 함.
/*
    const car1 = new Car();
    makeInsurable(car1);
    car1.addInsurancePolicy(new InsurancePolicy());
*/

// 추상클래스에 프로토타입을 이용하는 방법
// 하지만 메소드 이름의 충돌이나 보험에 가입할 수있는 객체 식별도 어려움.
/*
makeInsurable(Car.prototype);
const car1 = new Car("KIA", "K9");
car1.addInsurancePolicy(new InsurancePolicy());
console.log(car1);
*/

// 위의 문제를 심볼을 사용해 해결할 수 있음.

class InsurancePolicy {}

const ADD_POLICY = Symbol();
const GET_POLICY = Symbol();
const IS_INSURED = Symbol();
const _POLICY = Symbol();

function makeInsurable(o) {
    o[ADD_POLICY] = function(p) { this[_POLICY] = p; }
    o[GET_POLICY] = function() { return this[_POLICY]; }
    o[IS_INSURED] = function() { return !!this[_POLICY]; }
}

makeInsurable(Car.prototype);
const car1 = new Car("KIA", "K9");
car1[ADD_POLICY](new InsurancePolicy());
console.log(car1);