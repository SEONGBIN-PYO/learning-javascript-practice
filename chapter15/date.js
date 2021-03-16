// 서버에서 날짜 생성하기
// 서버에서 날짜를 생성할 때는 항상 UTC를 사용하거나 타임존을 명시하는게 좋다.
const moment = require('moment-timezone');
/*
const d = new Date(Date.UTC(2016, 4, 27));  // May 27, 2016 UTC
*/
// 특정 타임존에 있는 서버에서 날짜를 생성할 때는 moment.tz를 써서,
// Date 인스턴스를 만들면 타임존을 손으로 변환할 필요가 없다.

// moment.js에 넘기는 배열은 자바스크립트의 Date 생성자에 넘기는 매개변수와 똑같고,
// 월은 0으로 시작한다.
// toDate() 메서드는 Monent.js 객체를 자바스크립트 Date 객체로 변환한다.
/*
const date = moment.tz([2016, 3, 27, 9, 19], 'America/Los_Angeles'). toDate();
const s = moment.tz([2016, 3, 27, 9, 19], 'Asia/Seoul').toDate();

console.log(date);
console.log(s);
*/

// 날짜 데이터 전송하기
// 가장 확실한 방법은 JSON을 사용하는 것.
/* 
const before = { d: new Date() };
before.d instanceof Date    // true
const json = JSON.stringify(before);
const after = JSON.parse(json);
after.d instanceof Date // false
typeof after.d          // "string"
*/

// JSON으로 바로 날짜를 다룰 수는 없지만, 전송된 문자열에서 날짜를 복구하는 것은 가능.

/* 
after.d = new Date(after.d);
after.d instanceof Date // true
 */

// 날짜 형식
//const d = new Date(Date.UTC(1930, 4, 10));

// 다음 결과는 서울시 기준입니다.
/*
console.log(d.toLocaleDateString());    // "5/9/1930"
console.log(d.toLocaleTimeString());    // 9:00:00
console.log(d.toTimeString());          // 09:00:00 GMT+0900 (GMT+09:00)
console.log(d.toUTCString());           // Sat, 10 May 1930 00:00:00 GMT

console.log(moment(d).format("YYYY-MM-DD"));              // 1930-05-10
console.log(moment(d).format("YYYY-MM-DD HH:mm [UTZ]Z")); //1930-05-10 09:00 UTZ+09:00

console.log(moment(d).format("dddd, MMMM [the] Do, YYYY")); // Saturday, May the 10th, 1930
*/

// 날짜 구성 요소
const d = new Date(Date.UTC(1815, 9, 10));

// 서울시 기준
console.log(d.getFullYear());
console.log(d.getMonth());
console.log(d.getDate());
console.log(d.getDay());
console.log(d.getHours());
console.log(d.getMinutes());
console.log(d.getSeconds());
console.log(d.getMilliseconds());

// UTC 기준 메서드
console.log(d.getUTCFullYear());
console.log(d.getUTCMonth());
// ... etc

// 날짜비교 : Date 인스턴스는 날짜를 숫자로 저장하므로,
// 숫자에 쓸 수 있는 비교 연산자를 그대로 사용 가능.
const d1 = new Date(1996, 2, 1);
const d2 = new Date(2009, 4, 26);

console.log(d1 > d2);   // false
console.log(d1 < d2);   // true

// 날짜 연산
const msDiff = d2 - d1;
const daysDiff = msDiff/1000/60/60/24;
console.log(msDiff);    // 417657600000 ms
console.log(daysDiff);  // 4834.?? days

// Array.prototype.sort를 써서 날짜 정렬
const dates = [];

// 랜덤한 날짜 만들기
const min = new Date(2017, 0, 1).valueOf();
const delta = new Date(2020, 0, 1).valueOf() - min;
for(let i=0; i<10; i++) {
    dates.push(new Date(min + delta*Math.random()));
}

// 역순 정렬
dates.sort((a, b) => b - a);

dates.forEach(function(date) {
    console.log(date);   
})

// 날짜를 빼거나 더하는 메서드
let m = moment();   // 현재
console.log(m.add(3, 'days'));   // m은 이제 3일 뒤
console.log(m.subtract(2, 'years')); // m은 이제 2년전으로부터 3일이 지난 날

m = moment();       // 리셋
console.log(m.startOf('year'));  // m은 이제 올해의 1월 1일
console.log(m.endOf('month'));   // 올해의 1월 31일

// 사용자가 알기 쉬운 상대적 날짜
console.log(moment().subtract(10, 'seconds').fromNow()); // a few seconds ago
console.log(moment().subtract(45, 'seconds').fromNow()); // a minute ago
console.log(moment().subtract(5, 'minutes').fromNow()); // 5 minutes ago