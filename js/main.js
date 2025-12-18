// Handle hamburger menu on mobile
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});