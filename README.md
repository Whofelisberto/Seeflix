# 🎬 Seeflix

Projeto fullstack desenvolvido com **Next.js**, **React**, **TypeScript** e **Tailwind CSS** no front-end.  
No back-end, utiliza as **API Routes do Next.js** para login e registro de usuários, salvando dados em **MySQL** e garantindo segurança com **JWT** + **bcrypt** para criptografia de senhas.  

---

## 📌 Tecnologias usadas

### **Front-end**
- [Next.js](https://nextjs.org/) (React + SSR/SSG)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### **Back-end**
- API Routes do Next.js
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/) para autenticação
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) para criptografia de senhas

---

## ⚙️ Funcionalidades

✅ Registro de usuário com senha criptografada  
✅ Login com JWT + persistência de sessão  
✅ Integração com MySQL  
✅ Listagem de filmes, séries e animes  
✅ Interface responsiva com Tailwind  
✅ Rotas dinâmicas para detalhes de mídia (`/movie/[id]`, `/tv/[id]`)  

---

## 📂 Estrutura de pastas

A estrutura atual do projeto está assim:

```bash
📦 Seeflix
 ┣ 📂 node_modules
 ┣ 📂 public
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┣ 📂 api                 # Rotas de API (Next.js)
 ┃ ┃ ┣ 📂 filme
 ┃ ┃ ┣ 📂 lista-de-animes
 ┃ ┃ ┣ 📂 lista-de-filmes
 ┃ ┃ ┣ 📂 lista-de-series
 ┃ ┃ ┣ 📂 genre
 ┃ ┃ ┃ ┗ 📂 [id]
 ┃ ┃ ┣ 📂 movie
 ┃ ┃ ┃ ┗ 📂 [id]
 ┃ ┃ ┣ 📂 tv
 ┃ ┃ ┃ ┗ 📂 [id]
 ┃ ┃ ┣ 📜 globals.css
 ┃ ┃ ┣ 📜 layout.tsx
 ┃ ┃ ┗ 📜 page.tsx
 ┃ ┣ 📂 Components
 ┃ ┃ ┣ 📜 CardContext.tsx
 ┃ ┃ ┣ 📜 CardContentAnimes.tsx
 ┃ ┃ ┣ 📜 CardContentSeries.tsx
 ┃ ┃ ┣ 📜 Episodios.tsx
 ┃ ┃ ┣ 📜 Generos.tsx
 ┃ ┃ ┣ 📜 Header.tsx
 ┃ ┃ ┣ 📜 LoginSubmit.tsx
 ┃ ┃ ┗ 📜 Watch.tsx
 ┃ ┗ 📜 Footer.tsx
 ┣ .env.local (ignorado no git)
 ┣ .gitignore
 ┣ eslint.config.js
 ┣ next.config.ts
 ┣ package.json
 ┗ README.md
