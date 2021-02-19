function getGreetings() {
    return new Array('Hello JS', '안녕 자바스크립트', 'Aloha JS');
};

for (const iterator of getGreetings()) {
    console.log(iterator);
}

console.log(`${getGreetings}\n`);

function addPrefix(prefix, ...arr) {
    //console.log(arr);
    const prefIxedWords = [];
    for(let i=0; i<arr.length; i++){
        prefIxedWords[i] = prefix + arr[i];
    }
    return prefIxedWords;
}

for (const iterator of addPrefix('치킨', '피자', '햄버거')) {
    console.log(iterator);
}

// this 키워드

// 모호해지는 this 예시. undefined가 되기도하고 전역 객체에 묶이기도 함.
// this가 undefined. name을 찾지 못하여 "Cannot read property 'length' of undefined"
/*
const beforeO = {
    name: 'Juile',
    greetBackwards: function() {
        function getReverseName() {
            let nameBackwards = '';
            for(let i=this.name.length-1; i>=0; i--) {
                nameBackwards += this.name[i];
            }
            return nameBackwards;
        }
        return `\n${getReverseName()} eman ym si`;
    }
} 

console.log(beforeO.greetBackwards());
*/

// 다른 변수에 this를 할당하거나 화살표 함수를 사용하여 해결.

const afterO = {
    name: 'Juile',
    greetBackwards: function() {
        // 화살표 함수를 사용하면 this가 정적으로 묶여 내부함수 안에서 this 사용 가능.
        const getReverseName = () => {
            let nameBackwards = '';
            for(let i=this.name.length-1; i>=0 ; i--) {
                nameBackwards += this.name[i];
            }
            return nameBackwards;
        }
        return `\n${getReverseName()} eman ym si`;

        // 혹은 다른 변수에 this 할당
        /*
        const self = this;
        function getReverseName() {
            let nameBackwards = '';
            for(let i=self.name.length-1; i>=0; i--) {
                nameBackwards += self.name[i];
            }
            return nameBackwards;
        }
        return `\n${getReverseName()} eman ym si`;
        */
    }
}

console.log(afterO.greetBackwards());