// 정적메서드

class CarStatic {
    static getNextVin() {
        return CarStatic.nextVin++;   // 정적메서드에서 this는 인스턴스가 아니라 클래스 자체에 묶임
                                // 하지만, 클래스 이름을 사용하여 정적 메서드라는 점을 상기시켜주는 것이 좋음.
    }

    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.vin = CarStatic.getNextVin();
    }

    static areSimilar(car1, car2) {
        return car1.make === car2.make && car1.model === car2.model;
    }
    
    static areSame(car1, car2) {
        return car1.vin === car2.vin;
    }
}

CarStatic.nextVin = 0;

const carA = new CarStatic("Tesla", "S");
const carB = new CarStatic("KIA", "K9");
const carC = new CarStatic("KIA", "K9");
const carD = new CarStatic("KIA", "K7");

console.log(carA.vin);  // 0
console.log(carB.vin);  // 1
console.log(carC.vin);  // 2
console.log(carD.vin);  // 3

console.log(CarStatic.areSimilar(carA, carB));  // false
console.log(CarStatic.areSimilar(carB, carC));  // true
console.log(CarStatic.areSimilar(carC, carD));  // false
console.log(CarStatic.areSame(carB, carC));     // false
console.log(CarStatic.areSame(carD, carD));     // true