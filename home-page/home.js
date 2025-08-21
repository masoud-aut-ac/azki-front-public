


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


document.querySelectorAll(".btn-primary").forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        let card = this.closest(".card-body");
        let title = card.querySelector(".card-title").innerText;
        let text = Array.from(card.querySelectorAll(".card-text"))
            .map(p => p.innerText)
            .join("\n\n");

        document.getElementById("modalTitle").innerText = title;
        document.getElementById("modalBody").innerText = text;

        document.getElementById("detailsModal").style.display = "flex";
    });
});

document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("detailsModal").style.display = "none";
});

document.getElementById("detailsModal").addEventListener("click", (e) => {
    if (e.target.id === "detailsModal") {
        document.getElementById("detailsModal").style.display = "none";
    }
});


