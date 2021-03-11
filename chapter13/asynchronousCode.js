// 카운트 함수
/*
var i; // IIFE가 왜 중요했는지 이해하기 위해서 var를 씀
for(i=5; i>=0; i--) {
    console.log("setTimeout에 전달된 함수가 루프가 종료된 뒤에 실행!");
    setTimeout(function() {
        console.log(i===0 ? "go!" : i);
    }, (5-i)*1000);
}
*/

// 블록 스코프 변수가 도입되기 전 해결법
/*
function loopBody(i) {
    setTimeout(function() {
        console.log(i===0 ? "go!" : i);
    }, (5-i)*1000);
}

var i;
for(i=5; i>=0; i--) {
    loopBody(i);
}
*/

// IIFE를 사용하는 법
/*
var i;
for(i=5; i>=0; i--) {
    (function(i) {
        setTimeout(function() {
            console.log(i===0 ? "go!" : i);
        }, (5-i)*1000);
    })(i);
}
*/

// 블록 스코프 변수 사용
for(let i=5; i>=0; i--) {
    setTimeout(function() {
        console.log(i===0 ? "go!" : i);
    }, (5-i)*1000);
}
