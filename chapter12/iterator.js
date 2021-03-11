const book = [
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
    "Up above the world you fly",
    "Like a tea tray in the sky",
    "Twinle, twinkle, little bat!",
    "How I wonder what you're at!",
];

// 노드에 core-js 패키지를 추가하면 사용 가능.
const it = book.values();

// next() : value 프로퍼티, done 프로퍼티(마지막은 true)

/*
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
*/

// for...of 루프를 while로 흉내내기
let current = it.next();
while(!current.done) {
    console.log(current.value);
    current = it.next();
}

// 이터레이터는 모두 독립적.

const it1 = book.values();
const it2 = book.values();
// 아직 시작 전

// it1 이터레이터 두번 접근
console.log(it1.next());
console.log(it1.next());

// it2 이터레이터 한번 접근
console.log(it2.next());

// it1 이터레이터 추가 접근
console.log(it1.next());

// 이터레이션 프로토콜 : 모든 객체를 이터러블 객체로 바꿀 수 있음.
/*
class Log {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push({ message, timestamp: Date.now() });
    }
}
*/
// 클래스에 심볼 메서드 Symbol.iterator가 있고 이 메서드가 이터레이터처럼 동작하는 객체를 반환한다면 그 클래스의 인스턴스는 이터러블 객체라는 뜻.

class Log {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push({ message, timestamp: Date.now() });
    }
    [Symbol.iterator]() {
        return this.messages.values();
    }
}

const log = new Log();
log.add("first day at sea");
log.add("spotted whale");
log.add("spotted another vessel");

// 로그를 배열처럼 순회
for(let entry of log) {
    console.log(`${entry.message} @ ${entry.timestamp}`);
}

// 직접 이터레이터 구현
class Log2 {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push({ message, timestamp: Date.now() });
    }

    [Symbol.iterator]() {
        let i = 0;
        const messages = this.messages;
        return  {
            next() {
                if(i >= messages.length) {
                    return { value: undefined, done: true };
                }
                return { value: messages[i++], done: false };
            }
        }
    }
}

const log2 = new Log2();

log2.add("직접 이터레이터를");
log2.add("만들어보았는데, ");
log2.add("잘 작동하는건가?");

for(let entry of log2) {
    console.log(`${entry.message} @ ${entry.timestamp}`);
}

// 무한한 데이터에도 사용 가능 ex) 피보나치 수열

class FibonacciSequence {
    [Symbol.iterator]() {
        let a = 0, b = 1;
        return {
            next() {
                let rval = { value: b, done: false };
                b += a;
                a = rval.value;
                return rval;
            }
        };
    }
}

const fib = new FibonacciSequence();
let i = 0;
for(let n of fib) {
    console.log(n);
    if(++i > 9 ) break;
}