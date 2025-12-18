const selectMenus = document.getElementById("select-menus");
const serviceSelect = document.getElementById("select-service");

function handleMenus() {
    // Wipe menus
    selectMenus.innerHTML = "";

    const value = serviceSelect.value;
    if (value == "Gift Card") {
        return;
    }

    const newWrapper = document.createElement("div");
    newWrapper.classList.add("select-wrapper");

    const newSelect = document.createElement("select");
    newSelect.setAttribute("id", "new-dropdown");
    newSelect.classList.add("input-simple");
    newSelect.required = true;

    const newLabel = document.createElement("label");

    // Get options and label
    let options;
    let name;
    let labelText;
    if (value == "Package") {
        options = ["Island Packcage", "Maya Escape", "The Refined Man"];
        name = "Package";
    }
    else if (value == "Massage") {
        options = ["Swedish Massage",
        "Deep Tissue Massage",
        "Back & Neck Massage",
        "Reflexology",
        "After Sun Treatment",
        "Herbal Salt Body Scrub",
        "Lemongrass Body Scrub",
        "Hot Stone Massage",
        "Facials",
        "Reiki",
        "Aura Cleansing",
        "Dry Cupping"];

        name = "Massage";
    }
    else if (value == "Waxing") {
        options = ["Brazilian Bikini Wax",
        "Eyebrows",
        "Chin",
        "Lips",
        "Underarm",
        "Half Arm",
        "Full Arm",
        "Half Leg",
        "Full Leg",
        "Full Chest",
        "Full Back"];
        
        name = "Waxing";
    }

    labelText = "Desired " + name.toLowerCase() + " service";

    newSelect.setAttribute("name", name);
    newLabel.setAttribute("for", name);

    newLabel.textContent = labelText;

    // Set options to select
    options.forEach((option) => {
        const newOption = document.createElement("option");
        newOption.value = option;
        newOption.text = option;
        newSelect.appendChild(newOption);
    });
    
    newWrapper.appendChild(newSelect);
    selectMenus.appendChild(newLabel);
    selectMenus.appendChild(newWrapper);
}

function optionExists(select, service) {
    return Array.from(select.options).some(
        option => option.value === service
    );
}

// Load page using dynamic data if applies
window.addEventListener("DOMContentLoaded", () => {
    // Get url params
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has("service")) {
        const service = urlParams.get("service");
        if (optionExists(serviceSelect, service)) {
            serviceSelect.value = service;
        }
    }

    handleMenus();

    if (urlParams.has("service")) {
        const service = urlParams.get("service");
        if (!optionExists(serviceSelect, service)) {
            return;
        }

        if (urlParams.has("option")) {
            const option = urlParams.get("option");
            // Get new dropdown
            const newDropdown = document.getElementById("new-dropdown");
            if (newDropdown) {
                if (optionExists(newDropdown, option)) {
                    newDropdown.value = option;
                }
            }
        }
    }
})

serviceSelect.addEventListener("change", () => {
    handleMenus();
})

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
    } else {
        alert("Something went wrong. Please try again.");
    }
});