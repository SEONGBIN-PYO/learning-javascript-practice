// 배열 리터럴
const arr1 = [1, 2, 3];                         // 숫자로 구성된 배열
const arr2 = ["one", 2, "three"];               // 비균질적 배열
const arr3 = [[1, 2, 3], ["one", 2, "three"]];  // 배열을 포함한 배열
const arr4 = [                                  // 비균질적 배열
    { name: "Fred", type: "object", luckyNumbers: [5, 7, 13] },
    [
        { name: "Susan", type: "object" },
        { name: "Anthony", type: "object" },
    ],
    1,
    function() { return "arrays can contain functions too"; },
    "three"
];

// 배열 요소에 접근하기
console.log(arr1[0]);           // 1
console.log(arr1[2]);           // 3       
console.log(arr3[1]);           // ["one", 2, "three"]
console.log(arr4[1][0]);        // { name: "Susan", type: "object" }

// 배열 길이
console.log(arr1.length);       // 3
console.log(arr4.length);       // 5
console.log(arr4[1].length);    // 2

// 배열 길이 늘리기
arr1[4] = 5;
console.log(arr1);              // [1, 2, 3, <1 empty item>, 5];
console.log(arr1.length)        // 5

// 배열의 현재 길이보다 큰 인덱스에 접근하는 것만으로 배열의 길이가 늘어나진 않음.
console.log(arr2[10]);          // undefined
console.log(arr2.length);       // 3

// Array 생성자는 거의 사용하지 않음.

// 배열의 처음이나 끝에서 요소 하나를 추가하거나 제거
/*
 * push, unshift : 새 요소를 추가해서 늘어난 길이 반환
 * pop, shift : 제거된 요소를 반환.
*/

const arr = ["b", "c", "d"];
console.log(arr.push("e"));     // ["b", "c", "d", "e"]
console.log(arr.pop());         // ["b", "c", "d"]
console.log(arr.unshift("a"));  // ["a", "b", "c", "d"]
console.log(arr.shift());       // ["b", "c", "d"]

// 배열의 끝에 여러 요소 추가(사본)
/*
 * concat : 배열의 끝에 여러 요소를 추가한 사본을 반환.
 * concat : concat에 배열을 넘기면 제공받은 배열을 한번만 분해.
*/

const arrConcat = [1, 2, 3];
console.log(arrConcat.concat(4,5,6));       // [1, 2, 3, 4, 5, 6]
console.log(arrConcat.concat([4, 5, 6]));   // [1, 2, 3, 4, 5, 6]
console.log(arrConcat.concat([4, 5], 6));   // [1, 2, 3, 4, 5, 6]
console.log(arrConcat.concat([4, [5, 6]])); // [1, 2, 3, 4, [5, 6]]

// 배열 일부 가져오기(사본)
/*
 * slice(a, (b)) : a는 시작인덱스, b는 끝 인덱스(생략 시 배열의 마지막까지)
 * 음수 인덱스를 스면 배열의 끝에서 부터 요소를 셈
*/

const arrSlice = [1, 2, 3, 4, 5];
console.log(arrSlice.slice(3));         // [4, 5]
console.log(arrSlice.slice(2, 4));      // [3, 4]
console.log(arrSlice.slice(-2));        // [4, 5]
console.log(arrSlice.slice(1, -2));     // [2, 3]
console.log(arrSlice.slice(-2, -1));    // [4]

// 임의의 위치에 요소 추가하거나 제거하기
/*
 * splice(a, b, ...other) : a는 수정을 시작할 인덱스, b는 제거할 요소 숫자. 제거하지 않을 때는 0을 넘김
 * ...other은 배열에 추가될 요소들. 제거된 요소를 반환.
*/
const arrSplice = [1, 5, 7];
console.log(arrSplice.splice(1, 0, 2, 3, 4));     // [1, 2, 3, 4, 5, 7]
console.log(arrSplice.splice(1, 2));              // [1, 4, 5, 7]

// 배열 안에서 요소 교체
/*
 * copyWithin(a, b, c) : a는 복사한 요소를 붙여넣을 위치, b는 복사를 시작할 위치
 * c는 복사를 끝낼 위치(생략가능)
*/

const arrCopyWithin = [1, 2, 3, 4];
console.log(arrCopyWithin.copyWithin(1, 2));    // [1, 3, 4, 4]
console.log(arrCopyWithin.copyWithin(2, 0, 2)); // [1, 3, 1, 3]

// 특정 값으로 배열 채우기
/*
 * fill(a, b, c) : a는 채울 값, b는 시작인덱스, c는 끝 인덱스
*/

const arrFill = new Array(5).fill(1);   // [1, 1, 1, 1, 1]
console.log(arrFill.fill("a"));         // ["a", "a", "a", "a", "a"]
console.log(arrFill.fill("c", 2, 4));   // ["a", "a", "c", "c", "a"] c-1 까지!!

// 배열 정렬과 역순 정렬
/*
 * reverse : 역순 정렬
 * sort : 정렬
*/

const tempArr = [1, 2, 3, 4, 5];
console.log(tempArr.reverse());     // [5, 4, 3, 2, 1]
console.log(tempArr.sort());        // [1, 2, 3, 4, 5]

// sort는 정렬 함수를 받을 수 있다.
const arrSortF = [{ name: "Suzanne"}, { name: "Jim"}, 
    { name: "Trevor"}, { name: "Amanda"}];
//arrSortF.sort();                             // 바뀌지 않음.
arrSortF.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);    // arr은 name 프로퍼티의 알파벳 순으로 정렬
console.log(arrSortF);