// error 인스턴스
const err = new Error('invaild email');

// 단순하게 앳 기호(@)만 있으면 유효한 이메일 주소로 간주.
function validateEmail(email) {
    return email.match(/@/) ?
        email :
        new Error(`invalid email: ${email}`);
}

// instanceof 연산자를 써서 error 인스턴스가 반환됐는지 확인.
const email = "abc123@abc.com";

const validatedEmail = validateEmail(email);
if(validateEmail instanceof Error) {
    console.error(`Error: ${validatedEmail.message}`);
} else {
    console.log(`Valid Email: ${validatedEmail}`);
}

