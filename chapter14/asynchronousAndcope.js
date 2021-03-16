// for문이 조건에 충족할 때 까지 setTimeout을 호출하면서 타임아웃은 그 순간의 i값의 조건에 따라 계산이됨
// 하지만, for문의 실행이 완료되고 콜백이 작동함 -> i가 -1값인 상태에서 콜백이 동작
// setTimeout자체는 동기적으로 호출되고, 타임아웃에 따라 비동기적으로 실행하는 방식

/*
function countdown() {
    let i;
    console.log("Countdown:");
    for(i=5; i>=0; i--) {
        setTimeout(function() {
            console.log(i===0 ? "GO!": i);
        }, (5-i)*1000);
    }
}
countdown();
*/

//해결
function countdown() {
    console.log("Countdown:");
    for(let i=5; i>=0; i--) {   // i를 for문 블록 스코프 변수로 지정, 클로저 캡쳐로 동작
        setTimeout(function() {
            console.log(i===0 ? "GO!": i);
        }, (5-i)*1000);
    }
}
countdown();