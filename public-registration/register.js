import {register, Registration, REGISTRATION_AGENT} from "../common/azki-center.js";

async function registerBtn() {
    const r = new Registration();
    r.phone = document.getElementById('phone').value.trim();
    r.fullName = document.getElementById('name').value.trim();
    r.nationalCode = document.getElementById('nationalCode').value.trim();
    r.refererCode = document.getElementById('refererCode').value.trim();
    r.frontImage = document.getElementById('frontImage').files[0]   ;
    r.role = REGISTRATION_AGENT;


    if (!r.fullName || !r.phone || !r.nationalCode) {
        showResult("لطفاً فیلد های اجباری را کامل کنید");
        return;
    }

    let convertResult = convertFarsiToEnglishNums(r.phone);
    if (r.phone.length !== 11  || convertResult.hasError || !convertResult.converted.startsWith("09")) {
        showResult("شماره همراه اشتباه است!");
        return;
    }
    r.phone = convertResult.converted;


    let convertIdResult = convertFarsiToEnglishNums(r.nationalCode);
    if (r.nationalCode.length !== 10 || convertIdResult.hasError) {
        showResult("کد ملی اشتباه است!");
        return;
    }
    r.nationalCode = convertIdResult.converted;

    const registerResponse = await register(r);

    if (registerResponse.success) {
        window.location.href = 'result.html';
    } else if (registerResponse.reason === 400) {
        showResult("لطفا مقادیر وارد شده را بررسی نمایید.");
    } else if (registerResponse.reason === 409) {
        showResult("کد ملی یا شماره تماس قبلا ثبت شده است ");
    } else {
        showResult("خطا در برقراری ارتباط ، لطفا بعدا تلاش کنید ")
    }
}

let numbersMap = {"۰": 0, "۱": 1, "۲": 2, "۳": 3, "۴": 4, "۵": 5, "۶": 6, "۷": 7, "۸": 8, "۹": 9,};

function convertFarsiToEnglishNums(n) {
    let result = [];
    let hasError = false;

    for (let digit of n) {
        if (containsOnlyDigits(digit)) {
            result.push(digit);
            continue;
        }
        if (numbersMap[digit] !== undefined) {
            result.push(numbersMap[digit]);
            continue;
        }
        hasError = true;
    }

    return {
        converted: result.join(''),
        hasError: hasError,
    };
}

function containsOnlyDigits(str) {
    return /^\d+$/.test(str);
}


export function showResult(message) {
    const errorDiv = document.getElementById("errorDiv");
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
}

function backToHome() {
    window.location.href = "../index.html";
}

window.registerBtn = registerBtn;
window.backToHome = backToHome;