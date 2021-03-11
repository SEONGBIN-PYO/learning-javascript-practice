// 오늘이 윤년인지 아닌지 판단
const year = new Date().getFullYear();
if(year % 4 !== 0) {
    console.log(`${year} is NOT a leap year.`);
} else if(year % 100 != 0) {
    console.log(`${year} is a leap year.`);
} else if(year % 400 != 0) {
    console.log(`${year} is NOT a leap year.`);
} else {
    console.log(`${year} is a leap year.`);
}

// 함수로 바꾸기
function printLeapYearStatus() {
    const year = new Date().getFullYear();
    if(year % 4 !== 0) {
        console.log(`${year} is NOT a leap year.`);
    } else if(year % 100 != 0) {
        console.log(`${year} is a leap year.`);
    } else if(year % 400 != 0) {
        console.log(`${year} is NOT a leap year.`);
    } else {
        console.log(`${year} is a leap year.`);
    }
}

printLeapYearStatus();

// 값을 반환하는 서브루틴으로서의 함수
function isCurrentYearLeapYear() {
    const year = new Date().getFullYear();
    if(year % 4 !== 0) {
        return false;
    } else if(year % 100 != 0) {
        return true;
    } else if(year % 400 != 0) {
        return false;
    } else {
        return true;
    }
}

// isCurrentYearLeapYear() 활용
const daysInMonth = [ 31, isCurrentYearLeapYear() ? 29 : 28, 31, 30, 31, 30, 31,
                    31, 30, 31, 30, 31 ];

if(isCurrentYearLeapYear()) console.log("It is a leap year.");

// 순수한 함수(pure function) : 입력이 같으면 결과도 반드시 같은 함수.
// 순수한 함수는 부수 효과(side effect)도 없어야 함.
// 즉, 함수를 호출한다고 해서 프로그램의 상태가 바뀌어서는 안됨.


const colors = [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet' ];
let colorIndex = -1;
// 순수한 함수가 아님.
// 1. 입력이 같아도(매개변수가 없다는 점이 같음) 결과가 항상 다름.
// 2. 변수 colorIndex를 바꾸는 부수 효과가 있음.
/*
function getNextRainbowColor() {
    if(++colorIndex >= colors.length) colorIndex = 0;
    return colors[colorIndex];
}
*/

// 윤년인지 아닌지 판단하는 함수를 순수한 함수로 바꾸기.
function isLeapYear(year) {
    if(year % 4 !== 0) {
        return false;
    } else if(year % 100 != 0) {
        return true;
    } else if(year % 400 != 0) {
        return false;
    } else {
        return true;
    }
}

// getNextRainbowColor() 함수를 순수한 함수로 고치기
const getNextRainbowColor = (function() {
    const colors = [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet' ];
    let colorIndex = -1;
    return function() {
        if(++colorIndex >= colors.length) colorIndex = 0;
        return colors[colorIndex];
    }
})();

// but, 입력이 같아도 결과가 다를 수 있으므로 순수한 함수라고 볼 수 없음.
console.log(getNextRainbowColor());
console.log(getNextRainbowColor());
console.log(getNextRainbowColor());
console.log(getNextRainbowColor());

// 이터레이터를 사용하여 결과가 같도록(독립적인 이터레이터 생성) 변경
/* 프로그램의 다른 부분에서 getRainbowIterator를 호출하더라도 독립적인 이터레이터가 생성되므로 다른 이터레이터를 간섭하지 않음. */
function getRainbowIterator() {
    const colors = [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet' ];
    let colorIndex = -1;
    return {
        next() {
            if(++colorIndex >= colors.length) colorIndex = 0;
            return { value: colors[colorIndex], done: false };
        }
    }
}

