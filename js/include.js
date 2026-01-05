async function loadInto(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) {
    console.warn(`Failed to load ${url}:`, res.status);
    return;
  }
  el.innerHTML = await res.text();
}

function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  const map = {
    "index.html": "home",
    "projects.html": "projects",
    "about.html": "about",
    "contact.html": "contact",
  };
  const key = map[path];
  if (!key) return;

  document.querySelectorAll('.tab[data-nav]').forEach(a => {
    a.classList.toggle("active", a.dataset.nav === key);
  });
}

(async function () {
  await loadInto("#site-nav", "components/nav.html");
  await loadInto("#site-footer", "components/footer.html");
  setActiveNav();
})();
