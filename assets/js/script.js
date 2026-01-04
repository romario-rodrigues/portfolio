// --- CONFIGURAÇÃO ---
const usuarioGitHub = "romario-rodrigues"; // <---Seu usuário vai aqui
const urlAPI = `https://api.github.com/users/${usuarioGitHub}`;

// Elementos do HTML
const avatar = document.getElementById("avatar");
const nome = document.getElementById("nome");
const bio = document.getElementById("bio");
const linkPerfil = document.getElementById("link-perfil");
const botaoTema = document.getElementById("botao-tema");

// --- FUNÇÃO DE BUSCA (API) ---
// Async/Await é muito parecido com Python moderno
async function carregarDados() {
  try {
    const resposta = await fetch(urlAPI);

    if (!resposta.ok) {
      throw new Error("Usuário não encontrado!");
    }

    const dados = await resposta.json(); // Transforma JSON em Objeto JS

    // Preenchendo o HTML com os dados reais
    avatar.src = dados.avatar_url;
    nome.textContent = dados.name || dados.login; // Se não tiver nome, usa o login
    bio.textContent = dados.bio || "Sem biografia definida.";
    linkPerfil.href = dados.html_url;
  } catch (erro) {
    console.error(erro);
    nome.textContent = "Erro!";
    bio.textContent = "Não foi possível carregar o usuário.";
    avatar.src = "https://cdn-icons-png.flaticon.com/512/753/753345.png";
  }
}

// --- LÓGICA DO TEMA (Mantida e melhorada) ---
const body = document.body;
const temaSalvo = localStorage.getItem("preferencia-tema");

if (temaSalvo === "escuro") body.classList.add("modo-escuro");

botaoTema.addEventListener("click", () => {
  body.classList.toggle("modo-escuro");

  if (body.classList.contains("modo-escuro")) {
    localStorage.setItem("preferencia-tema", "escuro");
  } else {
    localStorage.setItem("preferencia-tema", "claro");
  }
});

// --- ANIMAÇÃO DE SCROLL (SCROLL REVEAL) ---

// 1. Configuração do "Vigia"
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    // Se o elemento entrou na tela
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel"); // Adiciona a classe que faz aparecer
    } else {
      // Opcional: Remove a classe se sair da tela (para animar de novo ao subir)
      // entrada.target.classList.remove('visivel');
    }
  });
});

// 2. Mandar o vigia observar todos os cartões de projeto
const projetos = document.querySelectorAll(".card-projeto");
projetos.forEach((projeto) => observador.observe(projeto));
// Chama a função ao iniciar o script
carregarDados();

// --- SISTEMA DE COPIAR EMAIL ---

// Seleciona o botão e o aviso
const btnCopiar = document.querySelector(".botao-copiar");
const toast = document.getElementById("toast-aviso");

if (btnCopiar) {
  btnCopiar.addEventListener("click", function (e) {
    e.preventDefault(); // Impede o link de pular para o topo da página

    // 1. Pega o email que está no atributo data-email
    const email = btnCopiar.getAttribute("data-email");

    // 2. Copia para a área de transferência (API moderna do navegador)
    navigator.clipboard
      .writeText(email)
      .then(() => {
        // 3. Se deu certo, mostra o aviso
        mostrarToast();
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err);
      });
  });
}

function mostrarToast() {
  // Adiciona a classe que torna visível
  toast.className = "mostrar";

  // Espera 3 segundos (3000ms) e remove a classe
  setTimeout(function () {
    toast.className = toast.className.replace("mostrar", "");
  }, 3000);
}
