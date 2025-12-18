// Show team member information on title click

const titles = document.querySelectorAll(".team .content .card .details .title");
titles.forEach(title => {
    title.addEventListener("click", () => {
        const details = title.parentElement;
        const card = details.parentElement;
        const checker = details.classList.toggle("active");

        if (checker) {
            setTimeout(() => {
                card.classList.toggle("active");
            }, 400);
        }
        else {
            card.classList.toggle("active");
        }
        console.log("Work");
    })
});