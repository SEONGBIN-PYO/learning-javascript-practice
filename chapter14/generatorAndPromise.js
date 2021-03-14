// 오류우선콜백을 프라미스로 바꾸기
function nfcall(f, ...args) {
    return new Promise(function(resolve, reject) {
        f.call(null, ...args, function(err, ...args) {
            if(err) return reject(err);
            resolve(args.length<2 ? args[0] : args);
        });
    });
}

// setTimeout은 오류 우선 콜백의 패턴을 따르지 않음.
// 아래처럼 직접 만든다.
function ptimeout(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, delay);
    });
}

// 제너레이터 실행기 만들기
// 제너레이터는 원래 동기적이지만 호출자와 통신할 수 있으므로,
// 제너레이터와의 통신을 관리하고 비동기적 호출을 처리하는 함수를 만듦.

function grun(g) {
    const it = g();
    (function iterate(val) {
        const x = it.next(val);
        if(!x.done) {
            if(x.value instanceof Promise) {
                x.value.then(iterate).catch(err => it.throw(err));
            } else {
                setTimeout(iterate, 0, x.value);
            }
        }
    })();
}

// dataA, dataB, dataC를 d.txt로 하나로 합치는 예제
/*
function* theFutureIsNow() {
    const dataA = yield nfcall(fs.readFile, 'a.txt');
    const dataB = yield nfcall(fs.readFile, 'b.txt');
    const dataC = yield nfcall(fs.readFile, 'c.txt');
    yield ptimeout(60*1000);
    yield nfcall(fs.writeFile, 'd.txt', dataA+dataB+dataC);
}

grun(theFutureIsNow);
*/

// Promise.all() : 배열로 받은 프라미스가 모두 완료될 때 완료!
// Promise.all이 반환하는 프라미스에는 매개변수로 주어진 각 프라미스의 완료 값이
// 배열에 들어있었던 순서대로 들어있다.

/*
function* theFutureIsNow() {
    const data = yield Promise.all([ 
        nfcall(fs.readFile, 'a.txt'),
        nfcall(fs.readFile, 'b.txt'),
        nfcall(fs.readFile, 'c.txt'),
    ]);
    yield ptimeout(60*1000);
    yield nfcall(fs.writeFile, 'd.txt', data[0]+data[1]+data[2]);
}
*/

// 제너리이터 실행기를 동기적인 try/catch 문 사용하기
/*
function* theFutureIsNow() {
    let data;
    try {
        data = yield Promise.all([ 
            nfcall(fs.readFile, 'a.txt'),
            nfcall(fs.readFile, 'b.txt'),
            nfcall(fs.readFile, 'c.txt'),
        ]);
    } catch(err) {
        console.error("Unable to read one or more input files: " + err.message);
        throw err;
    }
    yield ptimeout(60*1000);
    try {
        yield nfcall(fs.writeFile, 'd.txt', data[0]+data[1]+data[2]);
    } catch(err) {
        console.error("Unable to write output file: " + err.messge);
        throw err;
    }
}
*/