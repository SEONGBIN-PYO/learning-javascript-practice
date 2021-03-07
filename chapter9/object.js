const SYM = Symbol();

const o = { a: 1, b: 2, c: 3, [SYM]: 4};

// for...in 루프에는 키가 심볼인 프로퍼티는 포함되지 않음.
for(let prop in o) {
    if (!o.hasOwnProperty(prop)) continue;
    console.log(`${prop}: ${o[prop]}`);
}

// Object.keys : 객체에서 나열 가능한 문자열 프로퍼티를 배열로 반환.

Object.keys(o).forEach(prop => console.log(`${prop}: ${o[prop]}`));

const o2 = { apple: 1, xochitl: 2, ballon: 3, guitar: 4, xylophone: 5, };

Object.keys(o2)
    .filter(prop => prop.match(/^x/))
    .forEach(prop => console.log(`${prop}: ${o2[prop]}`));