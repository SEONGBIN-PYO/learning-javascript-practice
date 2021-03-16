// 오류 우선 콜백(error-first-callback) 패턴
// 콜백을 사용하면 예외 처리가 어려워지므로, 콜백의 첫번째 매개변수에 에러 객체를 쓰는 패턴

const fs = require('fs');

const fname = 'may_or_may_not_exist.txt';
fs.readFile(fname, function(err, data) {
    if(err) return console.error(`error reading file ${fname}: ${err.message}`);
    console.log(`${fname} contents: ${data}`);
});

// 콜백 지옥(callback hell) : 콜백안에 콜백이 꼬리에 꼬리를 무는 형태
// 콜백 관리가 힘들어진다.

fs.readFile('a.txt', function(err, dataA) {
    if(err) console.error(err);
    fs.readFile('b.txt', function(err, dataB) {
        if(err) console.error(err);
        fs.readFile('c.txt', function(err, dataC) {
            if(err) console.error(err);
            setTimeout(function() {
                fs.writeFile('d.txt', dataA+dataB+dataC, function(err) {
                    if(err) console.error(err);
                });
            }, 60*1000);
        });
    });
});