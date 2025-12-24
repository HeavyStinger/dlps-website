// Get rows from dedicated spreadsheet

// define spreadsheet
const googleSheetURL = "https://docs.google.com/spreadsheets/d/17rNva0XRsboNKJh0h5XYbQNPGf2UVboVgCECKut5exk/gviz/tq?tqx=out:json";

// Define posts container
const allPosts = document.getElementById("all-posts");

fetch (googleSheetURL)
    .then(res => res.text())
    .then(text => {
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;
    // Generate posts for latest news section
    for (let i = 1; i < 4; i++) {
        // Get latest container
        const latest = document.getElementById("latest-" + i);
        // Define each row in var
        const title = rows[i].c[0]?.v;
        let description = rows[i].c[1]?.v;
        const imgName = rows[i].c[2]?.v;
        const slug = rows[i].c[3]?.v;

        // Handle description elipsis
        const maxChars = 200;
        if (description.length > maxChars) {
            description = description.slice(0, maxChars) + "…";
        }

        // Build children

        // Build Image
        const newImage = document.createElement("img");
        newImage.src = "./images/blog/" + imgName;
        newImage.alt = "Picture for news card '" + title + "'";
        latest.appendChild(newImage);

        // Build content
        const newContent = document.createElement("div");
        newContent.classList.add("content");
        // Build children
        const newTitle = document.createElement("h4");
        newTitle.classList.add("title");
        newTitle.textContent = title;
        newContent.appendChild(newTitle);
        
        if (i == 1) {
            const newDescription = document.createElement("p");
            newDescription.classList.add("description");
            newDescription.textContent = description;
            newContent.appendChild(newDescription);
        }

        const newLink = document.createElement("a");
        newLink.href = "./article?slug=" + slug;
        newLink.innerHTML = 'Read More<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>';
        newContent.appendChild(newLink);

        latest.appendChild(newContent);
    }

    // Generate cards for all posts section
    rows.slice(1).forEach((row) => {
        // Define each row in var
        const title = row.c[0]?.v;
        let description = row.c[1]?.v;
        const imgName = row.c[2]?.v;
        const slug = row.c[3]?.v;

        // Handle description elipsis
        const maxChars = 200;
        if (description.length > maxChars) {
            description = description.slice(0, maxChars) + "…";
        }

        // Build card
        const newPost = document.createElement("article");
        newPost.classList.add("blog-card");

        // Build children

        // Build Image
        const newImage = document.createElement("img");
        newImage.src = "./images/blog/" + imgName;
        newImage.alt = "Picture for news card '" + title + "'";
        newPost.appendChild(newImage);

        // Build content
        const newContent = document.createElement("div");
        newContent.classList.add("content");
        // Build children
        const newTitle = document.createElement("h4");
        newTitle.classList.add("title");
        newTitle.textContent = title;
        newContent.appendChild(newTitle);
        
        const newDescription = document.createElement("p");
        newDescription.classList.add("description");
        newDescription.textContent = description;
        newContent.appendChild(newDescription);

        const newLink = document.createElement("a");
        newLink.href = "./article?slug=" + slug;
        newLink.innerHTML = 'Read More<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>';
        newContent.appendChild(newLink);

        newPost.appendChild(newContent);

        allPosts.appendChild(newPost);
    })
})