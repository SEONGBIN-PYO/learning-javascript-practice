const roles = new Set();

roles.add("User");  // Set [ "User" ]
roles.add("Admin"); // Set [ "User", "Admin" ]

// size
console.log(roles.size);    // 2

// 추가하려는 것이 셋에 이미 있다면 추가하지 않음. : 중복 허용 안함.
roles.add("User");  // Set [ "User", "Admin" ]
console.log(roles.size);    // 2

// delete와 clear
console.log(roles.delete("Admin"));  // 제거에 성공한다면 true
console.log(roles);                  // Set [ "User" ]
console.log(roles.delete("Admin"));  // 제거에 실패한다면 false

//WeakSet
// 객체만 포함할 수 있으며, 이 객체들은 가비지 콜렉션의 대상이 됨.
// 이터러블아님.
// 실제 용도는 주어진 객체가 셋 안에 존재하는지 알아보는 정도..

const naughty = new WeakSet();

const children = [
    { name: "성빈" },
    { name: "준수" },
];

naughty.add(children[1]);

for(let child of children) {
    if (naughty.has(child)) {
        console.log(`Coal for ${child.name}!`);
    } else {
        console.log(`Presents for ${child.name}!`);
    }
}