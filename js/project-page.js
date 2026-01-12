(async function () {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");

  const titleEl = document.getElementById("project-title");
  const summaryEl = document.getElementById("project-summary");
  const heroEl = document.getElementById("project-hero");
  const mediaEl = document.getElementById("project-media");
  const bodyEl = document.getElementById("project-body");
  const stackEl = document.getElementById("project-stack");
  const linksEl = document.getElementById("project-links");
  const linksSectionEl = document.getElementById("project-links-section");

  if (!slug) {
    titleEl.textContent = "Project not found";
    summaryEl.textContent = "Missing ?slug= in the URL.";
    return;
  }

  const res = await fetch("data/projects.json");
  const data = await res.json();
  const p = data.projects.find(x => x.slug === slug);

  if (!p) {
    titleEl.textContent = "Project not found";
    summaryEl.textContent = `No project with slug "${slug}".`;
    return;
  }

  document.title = `${p.title} | Sahil Puri`;

  titleEl.textContent = p.title;
  summaryEl.textContent = p.summary;

  heroEl.src = p.hero || p.thumb || "";
  heroEl.alt = p.title;

    if (mediaEl) {
    if (p.youtube) {
        const url = new URL(p.youtube);
        const id =
        url.searchParams.get("v") ||
        (url.hostname.includes("youtu.be") ? url.pathname.slice(1) : "");

        mediaEl.innerHTML = id ? `
        <div class="project-video" style="margin:16px 0;">
            <div style="position:relative;padding-top:56.25%;border-radius:12px;overflow:hidden;border:1px solid #e0e0e0;background:#000;">
            <iframe
                src="https://www.youtube-nocookie.com/embed/${id}"
                title="${p.title} video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                style="position:absolute;inset:0;width:100%;height:100%;"
            ></iframe>
            </div>
        </div>
        ` : "";
    } else {
        mediaEl.innerHTML = "";
    }
    }



  bodyEl.innerHTML = "";
  (p.body || []).forEach(text => {
    const para = document.createElement("p");
    para.textContent = text;
    bodyEl.appendChild(para);
  });

  stackEl.innerHTML = "";
  (p.stack || []).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    stackEl.appendChild(li);
  });

  const links = [];
  const pushLink = (label, url) => {
    if (!label || !url) return;
    links.push(`<a href="${url}" target="_blank" rel="noopener">${label} →</a>`);
  };

  if (Array.isArray(p.links)) {
    p.links.forEach(item => pushLink(item?.label, item?.url));
  } else if (Array.isArray(p.links?.items)) {
    p.links.items.forEach(item => pushLink(item?.label, item?.url));
  } else {
    const addFromValue = (label, value) => {
      if (!value) return;
      if (typeof value === "string") {
        pushLink(label, value);
      } else {
        pushLink(value.label || label, value.url);
      }
    };
    addFromValue("Repo", p.links?.repo);
    addFromValue("Demo", p.links?.demo);
    addFromValue("Write-up", p.links?.paper);
  }

  if (links.length) {
    linksEl.innerHTML = links.join(" &nbsp; ");
    if (linksSectionEl) linksSectionEl.style.display = "";
  } else {
    linksEl.innerHTML = "";
    if (linksSectionEl) linksSectionEl.style.display = "none";
  }
})();
