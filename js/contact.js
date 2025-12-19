const requiredDropdown = document.getElementById("required-dropdown");
const optionalMenuContainer = document.getElementById("optional-menu-container");

// menu options
const serviceTypeOptions = ["Administrative Products",
    "Trainings for Educational Development"];
const adminMenuOptions = ["Not Listed",
    "LMS Management",
    "Digitalize Courses",
    "Speaker"];
const edTrainingMenuOptions = ["Not Listed",
    "AIden Teach",
    "AI Crash Course",
    "SAMR",
    "PBL",
    "AI and Writing",
    "Hybrid Teaching",
    "LMS",
    "Curipod",
    "AI Chat Prompting"];

// Define function for building and displaying the select menu
function handleMenus() {
    optionalMenuContainer.innerHTML = "";
    const selectedOption = requiredDropdown.value;
    if (selectedOption !== "Administrative Products" && selectedOption !== "Trainings for Educational Development") {
        return false;
    }

    // Create elements for new dropdown
    const selectWrapper = document.createElement("div");
    const newLegend = document.createElement("legend");
    const newSelect = document.createElement("select");
    
    // Add attributes to wrapper
    selectWrapper.classList.add("select-wrapper");

    // Add attributes to legend
    newLegend.textContent = selectedOption;

    // Add attributes to select
    newSelect.setAttribute("name", "service");
    newSelect.setAttribute("id", "optional-dropdown");
    newSelect.classList.add("input-custom");
    newSelect.required = true;

    // define legend and menu options depending on dropdown value
    let menuOptions;
    if (selectedOption == "Administrative Products") {
        menuOptions = adminMenuOptions;
    }
    else if (selectedOption == "Trainings for Educational Development") {
        menuOptions = edTrainingMenuOptions;
    }

    // Add option(s) to select
    menuOptions.forEach((option) => {
        const newOption = document.createElement("option");
        newOption.value = option;
        newOption.text = option;
        newSelect.appendChild(newOption);
    })

    // Append elements
    optionalMenuContainer.appendChild(newLegend);
    selectWrapper.appendChild(newSelect);
    optionalMenuContainer.appendChild(selectWrapper);
    return true;
}

// Partially Auto Complete form depending on header
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(document.location.search);
    const serviceType = urlParams.get("servicetype");
    const service = urlParams.get("service");
    if (!serviceType) {
       return;
    }
    if (!serviceTypeOptions.includes(serviceType)) {
        return;
    }

    requiredDropdown.value = serviceType;

    if (!handleMenus()) {
        return;
    }
    if (!service) {
        return;
    }
    if (serviceType === "Administrative Products") {
        if (!adminMenuOptions.includes(service)) {
            return;
        }
    }
    else if (serviceType === "Trainings for Educational Development") {
        if (!edTrainingMenuOptions.includes(service)) {
            return;
        }
    }
    else {
        return;
    }
    const optionalDropdown = document.getElementById("optional-dropdown");
    console.log("working?");
    optionalDropdown.value = service;
});

// Build and display menu on form when selected
requiredDropdown.addEventListener("change", handleMenus);

// Block web3forms popup and use my own
const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop normal redirect

    // captcha front end validation
    const hCaptcha = form.querySelector('textarea[name=h-captcha-response]').value;

    if (!hCaptcha) {
        window.alert("Please fill out captcha field");
        return;
    }

    const formData = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    const result = await response.json();

    if (result.success) {
        window.alert("Email sent!");
        form.reset();
        optionalMenuContainer.innerHTML = "";
    } else {
        alert("Something went wrong. Please try again.");
    }
});