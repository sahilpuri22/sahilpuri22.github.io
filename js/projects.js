(async function () {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const res = await fetch("data/projects.json");
  const data = await res.json();

  grid.innerHTML = data.projects.map(p => `
    <article class="card">
      <a href="project.html?slug=${encodeURIComponent(p.slug)}">
        <img src="${p.thumb}" alt="${p.title}">
      </a>
      <div class="card-body">
        <h3>
          <a href="project.html?slug=${encodeURIComponent(p.slug)}">${p.title}</a>
        </h3>
        <p>${p.summary}</p>
        <p><a href="project.html?slug=${encodeURIComponent(p.slug)}">Read more →</a></p>
      </div>
    </article>
  `).join("");
})();
