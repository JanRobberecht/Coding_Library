const routes = {
  "/": "pages/home.html",
  "/home": "pages/home.html",
  "/videos": "pages/videos.html",
  "/powershell": "pages/powershell.html",
  "/about": "pages/about.html",
  "/git": "pages/git.html",
  "/node": "pages/node.html",
  "/react": "pages/react.html",
  "/vs_code": "pages/vs_code.html",
  "/other": "pages/other.html"
};

const pageTitles = {
  "/": "Home",
  "/Home": "Home", 
  "/videos": "Videos",
  "/powershell": "PowerShell",
  "/git": "Git",
  "/node": "NodeJS",
  "/react": "React",
  "/vs_code": "VS Code",
  "/other": "Other"
};

async function loadPage(path) {
  const file = routes[path] || "404.html";
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(res.statusText);
    const html = await res.text();
    document.getElementById("app").innerHTML = html;

    // Scroll to top
    window.scrollTo(0, 0);

    // sets the title on the page
    const titles = document.querySelectorAll(".desktop-title, .mobile-title");
    for (let t of titles) {
        t ?  t.textContent = pageTitles[path] : "";
    }
   
    // Run page-specific JS
    const vidContainer = document.querySelector("#videos");
    if (vidContainer) {
        // Soms is het veiliger om even een microtask te gebruiken zodat de DOM echt up-to-date is:
        // Dit zorgt dat fillLibrary() altijd werkt, zelfs als de browser nog bezig is met het renderen van de nieuwe HTML.

          setTimeout(() => fillVideos(), 0);
    }

    // Remove active classes (color green) from navigation
    // Get the href without the # (hash)
    // and sets the active link (color green)
    const navLinks = document.querySelectorAll(".navigation a");
    navLinks.forEach(link => {
        link.classList.remove("active-link");
        const linkPath = link.getAttribute("href").slice(1);
        if (linkPath === path) {
            link.classList.add("active-link");
    }

    // only used in mobile view and makes sure the popup disappears when you select a page
    document.querySelector('.navigation').classList.remove('active');
});

  } catch (err) {
    document.getElementById("app").innerHTML = `<h1>ERROR: ${err.message}</h1>`;
  }
}



function router() {
  const path = window.location.hash.slice(1) || "/";
  //console.log("Routing to:", path);
  loadPage(path);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);