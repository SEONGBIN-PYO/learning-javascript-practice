// 제너레이터는 언제든 호출자에게 제어권을 넘길 수 있음.
// 제너레이터는 호출한 즉시 실행되지는 않음. 대신 이터레이터를 반환하고, 이터레이터의 next 메서더를 호출함에 따라 실행.

// 제너레이터는 만들 때 function 키워드 뒤에 애스터리스크(*)를 붙임.

//Generator 함수는 호출되어도 즉시 실행되지 않고, 대신 함수를 위한 Iterator 객체가 반환됩니다. Iterator의 next() 메서드를 호출하면 Generator 함수가 실행되어 yield 문을 만날 때까지 진행하고, 해당 표현식이 명시하는 Iterator로부터의 반환값을 반환합니다.

function* rainbow() { // * 기호는 제너레이터 문법
    yield 'red';
    yield 'orange';
    yield 'green';
    yield 'blue';
    yield 'indigo';
    yield 'violet';
}

// 제너레이터를 호출하면 이터레이터를 얻음.
const it = rainbow();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

// 이터레이터를 반환하므로 for...of 루프 사용 가능
for(let color of rainbow()) {
    console.log(color);
}

// yield* 표현식을 마주칠 경우, 다른 Generator 함수가 위임(delegate)되어 진행됩니다.

function* rainbow2() {
    yield 'red';
    yield 'orange';
    yield 'green';
    yield* rainbow3();
    yield 'indigo';
    yield 'violet';
}

function* rainbow3() {
    yield '빨';
    yield '주';
    yield '녹';
    yield '초';
    yield '파';
    yield '남';
    yield '보';
}

for(let color of rainbow2()) {
    console.log(color);
}

// 양방향 통신 제너레이터

function* interrogate() {
    const name = yield "What is your name?";
    const color = yield "What is your favorite color?";
    return `${name}'s favorite color is ${color}.`;
}

// 실행순서
// 1. 제너레이터는 이터레이터를 반환하고 일시 정지한 상태로 시작.
const iter = interrogate();

// 2. undefined를 제너레이터에 넘김(이 값은 사용 안함!)
// 제너레이터는 "What is your name?"을 넘기고 일시 정지.
console.log(iter.next()); // undefined를 직접 넘겨줘도 같음.

// 3. "댕댕"을 제너레이터에 넘김.
// 제너레이터는 "What is your favorite color?" 넘기고 일시 정지
console.log(iter.next('댕댕'));

// 4. "orange"를 제너레이터에 넘김.
// 제너레이터는 `${name}'s favorite color is ${color}.` 을 반환하고 멈춤.
console.log(iter.next('오렌지'));

// yield 문은, 설령 제너레이터의 마지막 문이더라도 제너레이터를 끝내지 않음.
// 제너레이터에서 return 문을 사용하면 그 위치에 관계없이 done은 true가 되고,
// value 프로퍼티는 return이 반환하는 값이 됨.

function* abc() {
    yield 'a';
    yield 'b';
    return 'c';
}

const it2 = abc();
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());

// 제너레이터를 사용할 때 보통 done이 true면 value 프로퍼티에 주의를 기울이지 않음.
// "a"와 "b"는 출력되지만 "c"는 출력되지 않음.
// 제너레이터에서 return은 중간에 종료하는 목적으로만 사용!
for(let l of abc()) {
    console.log(l);
}