// 변수 숨김 예제
    /*
    {
        // 외부 블록
        let x = 'blue';
        console.log(x); // "blue"
        {
            // 내부 블록
            let x = 3;
            console.log(x); // "3"
        }
        console.log(x);     // "blue"
    }
    console.log(typeof x);  // "undifined"; x는 스코프에 없음.
*/

/*
    {
        // 외부 블록
        let x = { color: "blue" };
        let y = x;      // y와 x는 같은 객체를 가리킴.
        let z = 3;
        {
            // 내부 블록
            let x = 5;              // 이제 바깥의 x는 가려짐.
            console.log(x);         // 5
            console.log(y.color);   // "blue"; y가 가리키는,
                                    // 외부 스코프의 x가 가리키는 객체는
                                    // 스코프 안에 있음.
            y.color = "red";
            console.log(z);         // 3; z는 숨겨지지 않음.
        }
        console.log(x.color);       // "red"; 객체가 내부 스코프에서 수정.
        console.log(y.color);       // "red"; x와 y는 같은 객체를 가리킴.
        console.log(z);             // 3
    }
*/

// 클로저
/*
    let globalFunc;             // 정의되지 않은 전역 함수
    let f;
    {
        let blockVar = 'a';     // 블록 스코프에 있는 변수
        let o = { note: 'Safe' };

        globalFunc = function() {
            console.log(blockVar);
        }
        
        f = function() {
            return o;
        }
    }
    globalFunc();               // "a"
    //console.log(blockVal);    // 직접 접근 불가능.
    let oRef = f();
    //console.log(o);           // 직접 접근 불가능.
    console.log(f());
    oRef.note = "Not so safe after all!";   // 객체를 접근해서 수정 가능.
    console.log(f());
*/

// 즉시 호출하는 함수 표현식(IIFE)
/*
    const f = (function() {
        let count = 0;
        return function() {
            return `I have been called ${++count} times(s)`
        }
    })();
    f();
    f();
    //console.log(count); // undefined. count가 스코프에 없음.
*/

// 호이스팅

/*
    x;          // ReferenceError: x는 정의되지 않았음.
    let x =3;   // 에러가 일어나서 실행이 멈춰 이 행까지 도달하지 못함.
*/

/*
    // var x; <= 선언이 끌어 올려짐
    x;          // undefined
    var x = 3;  // -> x = 3;
    x;          // 3

    //console.log(x);
*/

// 함수 호이스팅

/*
    f();        // 'f'
    function f() {
        console.log('f');
    }
*/

/*
    f();        // 변수에 할당한 함수표현식은 호이스팅 되지 않음.
    let f = function() {
        console.log('f');
    }
*/

// 사각지대
/*
    if(typeof x === "undefined") { // referenceError
        console.log("x doesn't exist or is undefined");
    } else {
        // x를 사용해도 안전한 코드
    }
*/

/*
    if(typeof x === "undefined") { // referenceError
        console.log("x doesn't exist or is undefined");
    } else {

    }
    let x = 5;
*/