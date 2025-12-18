// link show nav to menu button
const menuButton = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Set active current link
window.addEventListener("DOMContentLoaded", () => {
    const navButtons = document.querySelectorAll("nav a");
    const footerButtons = document.querySelectorAll("footer a");

    navButtons.forEach((button) => {
        if (button.getAttribute("href") == "#") {
            button.classList.add("active");
        }
    })

    footerButtons.forEach((button) => {
        if (button.getAttribute("href") == "#") {
            button.classList.add("active");
        }
    })
});

// Automatically assign buttons based on their skate-type
window.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("[skate-type]");
    const page = "contact.html";

    buttons.forEach((button) => {
        const skateType = button.getAttribute("skate-type");
        if (skateType == "OG") {
            button.href = page;
        }
        else if (skateType.includes("patpack")) {
            const values = skateType.split("|");
            button.href = page + "?" + "service=Package" + "&option=" + values[1];
        }
        else if (skateType.includes("patdown")) {
            const values = skateType.split("|");
            button.href = page + "?" + "service=Massage" + "&option=" + values[1];
        }
        else if (skateType.includes("wax")) {
            const values = skateType.split("|");
            button.href = page + "?" + "service=Waxing" + "&option=" + values[1];
        }
        else {
            return;
        }

        button.href += "#contact-form";
    });
})
// Legend
{
    // OG - no params
    // patpack - Is a package and carries an option after |
    // patdown - Is a massage and carries an option after |
    // wax - Is a wax and can carry an option after | or stay alone
}