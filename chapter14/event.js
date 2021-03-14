// 이벤트가 일어나면 이벤트 발생을 담당하는 개체(emitter)에서 이벤트가 일어났음을 알림.
// 필요한 이벤트는 모두 주시(listen)할 수 있음.
// Node에는 이벤트를 지원하는 모듈 EventEmitter가 내장 되어있음.

// countdown 함수를 클래스로 변환
/*
const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor(seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    }
    go() {
        const countdown = this;
        return new Promise(function(resolve, reject) {
            for(let i=countdown.seconds; i>=0; i--) {
                setTimeout(function() {
                    if(countdown.superstitious && i===13)
                        return reject(new Error("Oh my god"));
                    countdown.emit('tick', i);
                    if(i===0) resolve();

                }, (countdown.seconds-i)*1000);
            }
        });
    }
}
*/
/*
const c = new Countdown(15, true);

// on 메서드로 이벤트 주시
c.on('tick', function(i) {
    if(i>0) console.log(i + '...');
});

// 여전히 모든 카운트가 출력되어 0이 될 때까지 진행.
// 이미 모든 타임아웃이 만들어졌기 때문.
c.go()
    .then(function() {
        console.log('GO!');
    })
    .catch(function(err) {
        console.error(err.message);
    })
*/

// 에러가 발생하여 진행할 수 없으면, 즉시 대기중인 타임아웃을 취소.

const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor(seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    }
    go() {
        const countdown = this;
        const timeoutIds = [];
        return new Promise(function(resolve, reject) {
            for(let i=countdown.seconds; i>=0; i--) {
                timeoutIds.push(setTimeout(function() {
                    if(countdown.superstitious && i===13) {
                        // 대기중인 타임아웃을 모두 취소.
                        timeoutIds.forEach(clearTimeout);
                        return reject(new Error("Oh my god"));
                    }
                    countdown.emit('tick', i);
                    if(i===0) resolve();
                }, (countdown.seconds-i)*1000));
            }
        });
    }
}

/*
const c = new Countdown(15, true);

c.on('tick', function(i) {
    if(i>0) console.log(i + '...');
    });

c.go()
    .then(function() {
        console.log('GO!');
    })
    .catch(function(err) {
        console.error(err.message);
    })
*/
// promise chain
// 프라미스는 체인으로 쉽게 연결할 수 있음.
// 즉, 프라미스가 완료되면 다른 프라미스를 반환하는 함수를 즉시 호출할 수 있음.

function launch() {
    return new Promise(function(resolve, reject) {
        console.log("Lift off!");
        setTimeout(function() {
            resolve("In orbit");
        }, 2*1000);
    });
}
/*
const cl = new Countdown(15, true)
    .on('tick', i => console.log(i + '...'));

cl.go()
    .then(launch)
        .then(function(msg) {
            console.log(msg);
        })
        // 모든 단계에서 에러를 캐치할 필요 없음.
        // 체인 어디에서나 에러가 발생하면 체인 전체가 멈추고 catch 핸들러가 동작함.
        .catch(function(err) {
            console.error("we have a problem...");
        });
*/
// 결정되지 않은 프라미스 방지하기 : 타임아웃 걸기

function addTimeout(fn, timeout) {
    if(timeout === undefined) timeout = 1000;   // 타임아웃 기본값
    return function(...args) {
        return new Promise(function(resolve, reject) {
            const tid = setTimeout(reject, timeout,
                new Error("promise timed out"));
            fn(...args)
                .then(function(...args) {
                    clearTimeout(tid);
                    resolve(...args);
                })
                .catch(function(...args) {
                    clearTimeout(tid);
                    reject(...args);
                });
        });
    }
}

const c1 = new Countdown(12, true)
    .on('tick', i => console.log(i + '...'));

c1.go()
    .then(addTimeout(launch, 1*1000))
    .then(function(msg) {
        console.log(msg);
    })
    .catch(function(err) {
        console.error("we have a problem:" + err.message);
    });