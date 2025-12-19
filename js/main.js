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
        else if (skateType.includes("admin-prod")) {
            const values = skateType.split("|");
            button.href = page + "?" + "servicetype=Administrative%20Products" + "&service=" + values[1];
        }
        else if (skateType.includes("ed-prod")) {
            const values = skateType.split("|");
            button.href = page + "?" + "servicetype=Trainings%20for%20Educational%20Development" + "&service=" + values[1];
        }
        else {
            return;
        }

        button.href += "#contact-form";
    });
})