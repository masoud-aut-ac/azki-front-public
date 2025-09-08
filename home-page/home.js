import {atashSoozi, badane, motor, omr, otherInsurance, shakhseSales} from "../common/data-bank.js";

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


function clickedBtn(button) {
    if (button === "shakhseSales") {
        renderModal("بیمه شخص ثالث", shakhseSales);
    } else if (button === "badane") {
        renderModal("بیمه بدنه", badane);
    } else if (button === "motor") {
        renderModal("بیمه موتور سیکلت", motor);
    } else if (button === "omr") {
        renderModal("بیمه عمر", omr);
    } else if (button === "atashSoozi") {
        renderModal("بیمه آتش سوزی", atashSoozi);
    } else if (button === "otherInsurance") {
        renderModal("سایر بیمه‌ها", otherInsurance);
    }
}

function renderModal(title, items) {
    document.getElementById("modalTitle").innerHTML = title;
    let modalBody = document.getElementById("modalBody");
    let content = [];
    for (let item of items) {
        let aghsat = !item.aghsat ? "" : `
کارمزد اقساط :          
           ${item.aghsat}
           %
`;

        let c = `
            <div class="col-lg-4 col-xl-3">    
                <p >
                  <b>${item.title}</b> :
                  <br>
        کارمزد نقدی:          
                  ${item.naghd}
                  %
                  ${aghsat}
            </p>
            <div class="modal-line"></div>
            </div>
        `;
        content.push(c);
    }
    modalBody.innerHTML = content.join("\n");

    document.getElementById("detailsModal").style.display = "flex";

    document.querySelector(".close-btn").onclick = () => {
        document.getElementById("detailsModal").style.display = "none";
    };
    document.getElementById("detailsModal").onclick = function(e) {
        if (e.target === this) {
            this.style.display = "none";
        }
    };



}


window.clickedBtn = clickedBtn;
window.shakhseSales = shakhseSales;
window.badane = badane;
window.motor = motor;
window.omr = omr;
window.atashSoozi = atashSoozi;
window.otherInsurance = otherInsurance;