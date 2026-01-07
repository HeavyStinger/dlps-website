// Handle hamburger menu on mobile
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Automatically assign buttons based on their skate-type
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("[skate-type]");
    const page = "./contact.html";

    buttons.forEach((button) => {
        const skateType = button.getAttribute("skate-type");
        if (skateType == "OG") {
            button.href = page;
        }
        else if (skateType.includes("main-services")) {
            const values = skateType.split("|");
            button.href = page + "?" + "servicetype=Main%20Services" + "&service=" + values[1];
        }
        else if (skateType.includes("most-popular-trainings")) {
            const values = skateType.split("|");
            button.href = page + "?" + "servicetype=Most%20Popular%20Trainings" + "&service=" + values[1];
        }
        else {
            return;
        }

        button.href += "#contact-form";
    });
})