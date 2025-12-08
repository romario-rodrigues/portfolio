# 🚀 Portfólio de Desenvolvedor

Um site de portfólio moderno, responsivo e interativo, desenvolvido para apresentar meus projetos e habilidades. O projeto consome a API do GitHub para carregar dados de perfil dinamicamente e conta com funcionalidades como troca de tema (Dark Mode) e animações suaves.

🔗 **Acesse o projeto online:** [https://romario-rodrigues.github.io/portfolio/](https://romario-rodrigues.github.io/portfolio/)

## 🖼️ Visualização

> Dica: Você pode adicionar um print ou GIF do seu site aqui depois. Basta colocar a imagem na pasta assets e linkar assim: `![Print do Site](assets/img/preview.png)`

## 🛠️ Funcionalidades

- **Integração com API:** Consome a API pública do GitHub para buscar foto, nome e biografia automaticamente.
- **Dark Mode Persistente:** Alternância entre temas Claro e Escuro, salvando a preferência do usuário no `LocalStorage`.
- **Glassmorphism:** Interface moderna utilizando efeitos de vidro fosco (backdrop-filter).
- **Responsividade:** Layout adaptável para Mobile, Tablet e Desktop usando CSS Grid e Flexbox.
- **Animações:** Efeito de *Scroll Reveal* (elementos aparecem ao rolar a página) utilizando `IntersectionObserver`.

## 💻 Tecnologias Utilizadas

- **HTML5:** Estrutura semântica.
- **CSS3:** Variáveis CSS, Flexbox, Grid, Animações e Media Queries.
- **JavaScript (ES6+):** Fetch API, Manipulação do DOM, Async/Await.
- **Git & GitHub Pages:** Versionamento e Hospedagem.

## 📂 Estrutura do Projeto

A organização de pastas segue o padrão de mercado para projetos front-end:

```text
/
├── index.html          # Estrutura principal
├── README.md           # Documentação
└── assets/
    ├── css/
    │   └── style.css   # Estilos globais e temas
    ├── js/
    │   └── script.js   # Lógica (API, Tema, Animações)
    └── img/            # Imagens e ícones
