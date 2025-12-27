const partnerPopup = document.getElementById("partner-popup");
const partnerPopupTitle = partnerPopup.querySelector(".title");
const partnerPopupDescription = partnerPopup.querySelector(".description");
const partnerPopupCloseButton = partnerPopup.querySelector(".close");
const partnerCardsButtons = document.querySelectorAll(".partners .content .card .action-button");

partnerPopupCloseButton.addEventListener("click", () => {
    partnerPopup.classList.remove("show");
    partnerPopupTitle.textContent = "";
    partnerPopupDescription.textContent = "";
});

partnerCardsButtons.forEach((buttons) => {
    buttons.addEventListener("click", () => {
        const popupInfo = buttons.getAttribute("data-popup-info");
        const [title, description] = popupInfo.split("|");
        partnerPopupTitle.textContent = title;
        partnerPopupDescription.textContent = description;
        partnerPopup.classList.add("show");
    });
});