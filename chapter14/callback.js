// 콜백함수는 일반적으로 다른 함수에 넘기거나 객체의 프로퍼티로 사용.
// 보통 익명 함수로 사용.

console.log("Before timeout: " + new Date());

/*
function f() {
    console.log("After timeout: " + new Date());
}
setTimeout(f, 60*1000); // 1분
*/

// 익명 함수 사용
setTimeout(function() {
    console.log("After timeout: " + new Date());
}, 60*1000);
console.log("I happen after setTimeout!");
console.log("Me too!");

// setInterval, clearInterval
// setInterval은 콜백을 정해진 주기마다 호출하며 clearInterval을 사용할 때 까지 멈추지 않음.

const start = new Date();
let i=0;
const intervalid = setInterval(function() {
    let now = new Date();
    if(now.getMinutes() !== start.getMinutes() || ++i>10)
        return clearInterval(intervalid);
    console.log(`${i}: ${now}`);
}, 5*1000);