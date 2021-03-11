// 함수를 가리키는 변수 만들기
function addThreeSqureAddFiveTakeSqureRoot(x) {
    // 일부러 길게 지음.
    return Math.sqrt(Math.pow(x+3, 2)+5);
}

// 별명을 써서 간단히 사용
const f = addThreeSqureAddFiveTakeSqureRoot;
const answer = (f(5) + f(2)) / f(7);
console.log(answer);

// 배열안의 함수
// 2차원 변형을 이용한 예시

const sin = Math.sin;
const cos = Math.cos;
const theta = Math.PI/4;
const zoom = 2;
const offset = [1, -3];

const pipeline = [
    function rotate(p) {
        return {
            x: p.x * cos(theta) - p.y * sin(theta),
            y: p.x * sin(theta) + p.y * cos(theta),
        };
    },
    function scale(p) {
        return { x: p.x * zoom, y: p.y*zoom };
    },
    function translate(p) {
        return { x: p.x + offset[0], y: p.y + offset[1] };
    },
];

// pipeline은 2D변형에 필요한 함수의 배열.
// 점 하나 변형 해보기
const p = { x: 1, y: 1};
let p2 = p;
for(let i=0; i<pipeline.length; i++) {
    p2 = pipeline[i](p2);
}

// p2는 이제 p1을 좌표 원점 기준 45도 회전 : rotate
// 원점에서 2 단위만큼 떨어뜨림 : scale
// 1단위 오른쪽, 3단위 아래쪽으로 움직인 점 : translate

// 함수에 함수 전달 : 비동기적 프로그래밍에 많이 사용 ex) 콜백 함수

function sum(arr, f) {
    // 함수가 전달되지 않았으면 매개변수를 그대로 반환하는 null 함수를 씀.
    if(typeof f != 'function') f = x => x;

    return arr.reduce((a, x) => a += f(x), 0);
}

console.log(sum([1, 2, 3]));                        // 6
console.log(sum([1, 2, 3], x => x*x));              // 14
console.log(sum([1, 2, 3], x => Math.pow(x, 3)));   // 36

// 함수를 반환하는 함수

// 배열 하나만 받아서 제곱의 합을 반환하는 함수가 필요하면?
/*
function sumOfSquares(arr) {
    return sum(arr, x => x*x);
}
*/

// 이런 패턴이 늘어난다면? 함수를 반환하는 함수를 만들자
function newSummer(f) {
    return arr => sum(arr, f);
}

const sumOfSquares = newSummer(x => x*x);
const sumOfCubes = newSummer(x => Math.pow(x, 3));
console.log(sumOfSquares([1, 2, 3]));    // 14
console.log(sumOfCubes([1, 2, 3]));      // 36

// 재귀(recursion) : 자기 자신을 호출

// 건초 더미에서 바늘을 찾는 예시
/*
 * 1. 건초 더미에서 바늘이 보이면 3단계로 이동한다.
 * 2. 건초 더미에서 건초를 하나 덜어낸다. 1단계로 이동한다.
 * 3. 찾았다!
 */

function findNeedle(haystack) {
    if(haystack.length === 0) return "no haystack here!";
    if(haystack.shift() === 'needle') return "found it!"
    return findNeedle(haystack);    // 건초더미에 들어있는 건초가 하나 줄었습니다.
}

const haystack = ['hay', 'hay', 'hay', 'needle', 'hay', 'hay' ];
findNeedle(haystack);
console.log(haystack.length);

// 흔한 예 : 숫자의 계승 계산(factorial)
function fact(n) {
    if(n === 1 || n === 0) return 1;
    return n * fact(n-1);
}

console.log(fact(5));
console.log(fact(0));
console.log(fact(1));
console.log(fact(3));