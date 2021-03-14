//resolve(성공), reject(실패)
// 프라미스는 성공 또는 실패만 나타낸다.
// countdown 예제에서 실패 부분은 없음.
/*
function countdown(seconds) {
    return new Promise(function(resolve, reject) {
        for(let i=seconds; i>=0; i--) {
            setTimeout(function() {
                if(i===3) return reject(new Error("흑멍멍!"));
                if(i>0) console.log(i + '...');
                else resolve(console.log("GO!"));
            }, (seconds-i)*1000);
        }
    });
}
*/

// 프라미스를 무시하고 호출해도 된다.
//countdown(10);

// 반환된 프라미스를 사용하는 예제
// then 핸들러는 성공 콜백과 에러 콜백을 받는다.
/*
countdown(10).then(
    function() {
        console.log("countdown completed successfully");
    },
    function(err) {
        console.log("countdown experienced an error: " + err.message);
    }
);
*/

// catch 핸들러도 지원한다.
/*
const p = countdown(5);
p.then(function() {
    console.log("countdown completed successfully");
});
p.catch(function(err) {
    console.log("countdown experienced an error: " + err.message);
});
*/

// 에러가 일어나도록 수정
// i===13 이면 에러 발생
/*
function countdown(seconds) {
    return new Promise(function(resolve, reject) {
        for(let i=seconds; i>=0; i--) {
            setTimeout(function() {
                if(i===13) return reject(new Error("Oh my god!"));
                if(i>0) console.log(i + '...');
                else resolve(console.log("GO!"));
            }, (seconds-i)*1000);
        }
    });
}

// 13 이상의 숫자를 사용하면 13에서 에러가 일어나지만,
// 콘솔에는 12부터 다시 카운트를 기록한다.
// reject나 resolve가 함수를 멈추지 않고, 그저 프라미스의 상태만 관리할 뿐이다.

countdown(15);
*/