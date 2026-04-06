/* ========== CONFIG ========== */
const usuarioGitHub = "romario-rodrigues";
const urlAPI = `https://api.github.com/users/${usuarioGitHub}`;
const reposURL = `https://api.github.com/users/${usuarioGitHub}/repos`;

const avatar = document.getElementById("avatar");
const nome = document.getElementById("nome");
const bio = document.getElementById("bio");
const linkPerfil = document.getElementById("link-perfil");

function slug(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

/* ========== GITHUB API ========== */
async function carregarDados() {
  try {
    const res = await fetch(urlAPI);
    if (!res.ok) throw new Error("Usuário não encontrado");
    const dados = await res.json();

    avatar.src = dados.avatar_url;
    nome.textContent = dados.name || dados.login;
    bio.textContent = dados.bio || "Desenvolvedor apaixonado por automação e tecnologia.";
    linkPerfil.href = dados.html_url;

    document.getElementById("stat-repos").textContent = dados.public_repos;
    document.getElementById("stat-followers").textContent = dados.followers;

    // Busca repos para popular stars nos cards
    const reposRes = await fetch(reposURL);
    if (reposRes.ok) {
      const repos = await reposRes.json();
      const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
      document.getElementById("star-total").textContent = totalStars;

      // Atualiza contagem de stars em cada card de projeto
      const mapa = {};
      repos.forEach((r) => {
        mapa[r.name] = r.stargazers_count;
      });
      document.querySelectorAll(".projeto-card").forEach((card) => {
        const h3 = card.querySelector("h3");
        if (!h3) return;
        const repoSlug = slug(h3.textContent);
        const stars = mapa[repoSlug];
        if (stars !== undefined) {
          const starEl = card.querySelector(".projeto-stars");
          if (starEl) starEl.innerHTML = `<i class="fa-regular fa-star"></i> ${stars}`;
        }
      });
    }
  } catch (err) {
    console.error(err);
    nome.textContent = "Romário Rodrigues";
    bio.textContent = "Desenvolvedor apaixonado por automação e tecnologia.";
    avatar.src = "https://cdn-icons-png.flaticon.com/512/753/753345.png";
  }
}

/* ========== THEME TOGGLE ========== */
const body = document.body;
const temaBtn = document.getElementById("botao-tema");

function aplicarTema(tema) {
  if (tema === "escuro") {
    body.classList.add("modo-escuro");
    temaBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    temaBtn.title = "Tema claro";
  } else {
    body.classList.remove("modo-escuro");
    temaBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    temaBtn.title = "Tema escuro";
  }
}

// Detecta a preferência do navegador
const temaSalvo = localStorage.getItem("preferencia-tema");
if (temaSalvo) {
  aplicarTema(temaSalvo);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  aplicarTema("escuro");
}

temaBtn.addEventListener("click", () => {
  const novoTema = body.classList.contains("modo-escuro") ? "claro" : "escuro";
  localStorage.setItem("preferencia-tema", novoTema);
  aplicarTema(novoTema);
});

/* ========== MOBILE MENU ========== */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Fecha menu ao clicar num link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

/* ========== SCROLL REVEAL ========== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visivel");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ========== COPY EMAIL ========== */
const btnCopiar = document.querySelector(".botao-copiar");
const toast = document.getElementById("toast-aviso");

if (btnCopiar) {
  btnCopiar.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = btnCopiar.getAttribute("data-email");
    try {
      await navigator.clipboard.writeText(email);
      mostrarToast();
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  });
}

function mostrarToast() {
  toast.classList.add("mostrar");
  setTimeout(() => toast.classList.remove("mostrar"), 3000);
}

/* ========== FOOTER YEAR ========== */
document.getElementById("ano-footer").textContent = new Date().getFullYear();

/* ========== BOOT ========== */
carregarDados();