const u1 = { name: 'Cynthia' };
const u2 = { name: 'Jackson' };
const u3 = { name: 'Olive' };
const u4 = { name: 'James' };

const userRoles = new Map();

// 메서드 체인 사용 가능
userRoles
    .set(u1, 'User')
    .set(u2, 'User')
    .set(u3, 'Admin');

// 2차원 배열을 넘기는 형태도 가능.
const userRoels2 = new Map([
    [u1, 'User'],
    [u2, 'User'],
    [u3, 'Admin'],
]);

// u2 확인
console.log(userRoles.get(u2)); // "User"

// 맵에 키가 존재하는지 확인
console.log(userRoles.has(u1)); // true
console.log(userRoles.get(u1)); // "User"
console.log(userRoles.has(u4)); // false
console.log(userRoles.get(u4)); // undefined

// size : 맵의 요소 숫자 반환
console.log(userRoles.size); // 3

// keys() : 맵의 키
// values() : 값
// entries() : 첫번째 요소가 키, 두번째 요소가 값인 배열을 각각 반환

// for...of 루프 사용 가능
for(let u of userRoles.keys())
    console.log(u.name);

for(let r of userRoles.values())
    console.log(r);

for(let ur of userRoles.entries())
    console.log(`${ur[0].name} : ${ur[1]}`);

// 이터러블 객체보다 배열이 필요하다면 확산 연산자(spread operator)를 쓰면 된다.
console.log([...userRoles.values()]);        // [ "User", "User", "Admin" ]

// delete() : 맵의 요소를 지울 때
userRoles.delete(u2);
console.log(userRoles.size);    // 2

// clear() : 맵의 요소를 모두 지울 때
userRoles.clear();
console.log(userRoles.size);    // 0

// WeakMap : Map과 아래와 같은 차이점이 존재한다.
/* 키는 반드시 객체여야 한다.
 * WeakMap의 키는 가비지 콜렉션에 포함될 수 있다.
 * WeakMap은 이터러블이 아니며 clear() 메서드도 없다.
 */

// 객체 인스턴스의 전용 키(private)를 저장하기에 알맞음.
const SecretHolder = (function() {
    const secrets = new WeakMap();
    return class {
        setSecret(secret) {
            secrets.set(this, secret);
        }
        getSecret() {
            return secrets.get(this);
        }
    }
})();

const a = new SecretHolder();
const b = new SecretHolder();

a.setSecret('secret A');
b.setSecret('secret B');

console.log(a.getSecret()); // 'secret A'
console.log(b.getSecret()); // 'secret B'