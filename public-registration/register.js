import {register, Registration} from "../common/azki-center.js";

async function registerBtn() {
    const r = new Registration();
    r.phone = document.getElementById('phone').value.trim();
    r.fullName = document.getElementById('name').value.trim();
    r.nationalCode = document.getElementById('nationalCode').value.trim();
    r.refererCode = document.getElementById('refererCode').value.trim();
    r.frontImage = document.getElementById('frontImage').value.trim();
    r.backImage = document.getElementById('backImage').value.trim();


    if (!r.fullName || !r.phone || !r.nationalCode) {
        showResult("لطفاً فیلد های اجباری را کامل کنید");
        return;
    }

    if (r.phone.length !== 11 || !r.phone.startsWith("09")) {
        showResult("شماره همراه اشتباه است!");
        return;
    }


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