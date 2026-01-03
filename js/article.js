const googleSheetURL = "https://docs.google.com/spreadsheets/d/17rNva0XRsboNKJh0h5XYbQNPGf2UVboVgCECKut5exk/gviz/tq?tqx=out:json";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

fetch(googleSheetURL)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47, text.length - 2));
    const rows = json.table.rows;

    const articles = rows.map(r => ({
        title: r.c[0]?.v || "",
        description: r.c[1]?.v || "",
        image: r.c[2]?.v || "",
        slug: r.c[3]?.v || ""
    }));

    const article = articles.find(a => a.slug === slug);

    if (!article) {
        console.warn("Article not found for slug:", slug);
        return;
    }

    renderArticle(article);
    updateSEO(article);
  });

function renderArticle(article) {
    document.getElementById("article-title").textContent = article.title;
    document.getElementById("article-image").src = "./images/blog/" + article.image;
    document.getElementById("article-description").textContent = article.description;
}

function updateSEO(article) {
    const pageUrl = `https://www.dlpsbelize.com/article.html?slug=${article.slug}`;
    const imageUrl = `https://www.dlpsbelize.com/images/${article.image}`;

    document.title = `${article.title} | DLPS Belize`;

    setMeta("description", article.description);

    setMetaProp("og:title", article.title);
    setMetaProp("og:description", article.description);
    setMetaProp("og:type", "article");
    setMetaProp("og:url", pageUrl);
    setMetaProp("og:image", imageUrl);

    setMeta("twitter:title", article.title);
    setMeta("twitter:description", article.description);
    setMeta("twitter:image", imageUrl);

    setCanonical(pageUrl);
}

function setMeta(name, content) {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
    }
    el.content = content;
}

function setMetaProp(prop, content) {
    let el = document.querySelector(`meta[property="${prop}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        document.head.appendChild(el);
    }
    el.content = content;
}

function setCanonical(url) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
    }
    link.href = url;
}