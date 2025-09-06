import {register, Registration, REGISTRATION_NETWORK} from "../common/azki-center.js";


window.addEventListener('scroll', () => {
    if (window.innerWidth < 1000) {
        return;
    }

    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.classList.remove("custom-navbar");
        navbar.classList.add("sticky-navbar");
    } else {
        navbar.classList.remove("sticky-navbar");
        navbar.classList.add("custom-navbar");
    }

});


function persianToLatin(str) {
    return str.replace(/۰/g, "0").replace(/۱/g, "1").replace(/۲/g, "2")
        .replace(/۳/g, "3").replace(/۴/g, "4").replace(/۵/g, "5")
        .replace(/۶/g, "6").replace(/۷/g, "7").replace(/۸/g, "8")
        .replace(/۹/g, "9");
}


function isPhoneValid(value) {
    value = persianToLatin(value);
    return /^09\d{9}$/.test(value);
}


async function submit() {
    const r = new Registration();
    r.fullName = document.getElementById("name").value.trim();
    r.phone = persianToLatin(document.getElementById('phone').value.trim());
    r.job = document.getElementById("job").value.trim();
    r.role = REGISTRATION_NETWORK;



    if (!r.phone || !r.fullName || !r.job) {
        showError("لطفا همه مقادیر را پر کنید");
        return;
    }

    if (!isPhoneValid(r.phone)) {
        showError("شماره موبایل معتبر نیست!");
        return;
    }

    const registerResponse = await register(r);

    if (registerResponse.success) {
        window.location.href = './../public-registration/result.html';
    } else if (registerResponse.reason === 400) {
        showError("لطفا مقادیر وارد شده را بررسی نمایید.");
    } else if (registerResponse.reason === 409) {
        showError("شماره تماس قبلا ثبت شده است");
    } else {
        showError("خطا در برقراری ارتباط، لطفا بعدا تلاش کنید");
    }
}


function showError(message) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerText = message;
    resultDiv.classList.add("show-error");
    }

window.submit = submit;