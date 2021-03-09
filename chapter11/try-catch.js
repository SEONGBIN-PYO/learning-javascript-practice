const email = null;

try {
    const validatedEmail = validateEmail(email);
    if(validatedEmail instanceof Error) {
        console.error(`Error: ${validatedEmail.message}`);
    } else {
        console.log(`Vaild email: ${validatedEmail}`);
    }
} catch(err) {
    console.error(`Error: ${err.message}`);
}

// throw new Error : 실행 중 문제가 생기면 에러를 발생시킴.
// error 인스턴스에는 스택을 문자열로 표현한 stack 프로퍼티가 있다.

function a() {
    console.log('a: calling b');
    b();
    console.log('a: done');
}

function b() {
    console.log('b: calling c');
    c();
    console.log('b: done');
}

function c() {
    console.log('c: throwing error');
    throw new Error('c error');
    console.log('c: done');
}
function d() {
    console.log('d: calling c');
    c();
    console.log('d: done');
}

try {
    a();
} catch(err) {
    console.log(err.stack);
}

try {
    d();
} catch(err) {
    console.log(err.stack);
}

// finally :에러가 일어나든, 일어나지 않든 반드시 호출

try {
    console.log("this line is executed...");
    throw new Error("ohh error");
    console.log("this line is not...");
} catch(err) {
    console.log("there was an error");
} finally {
    console.log("...always executed");
    console.log("perform cleanup here");
}