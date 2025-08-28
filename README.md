# 🎬 Seeflix

Projeto fullstack desenvolvido com **Next.js**, **React**, **TypeScript** e **Tailwind CSS** no front-end.  
No back-end, utiliza as **API Routes do Next.js** para login e registro de usuários, salvando dados em **MySQL** e garantindo segurança com **JWT** + **bcrypt** para criptografia de senhas.  
Além disso, o projeto consome a **API do TMDB** para listar filmes, séries e animes.  

---

## Deploy na Vercel - https://seeflix.vercel.app/
### OBS : Na Vercel não funciona back-end então a parte de cadastro não vai funcionar !!

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

### **API Externa**
- [TMDB](https://www.themoviedb.org/) para buscar filmes, séries e animes

---

## ⚙️ Funcionalidades

✅ Registro de usuário com senha criptografada  
✅ Login com JWT + persistência de sessão  
✅ Integração com MySQL  
✅ Consumo da API do TMDB  
✅ Listagem de filmes, séries e animes  
✅ Rotas dinâmicas para detalhes de mídia (`/movie/[id]`, `/tv/[id]`)  
✅ Interface responsiva com Tailwind  

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
```
## Instale as Dependências

npm install
## ou
yarn install

## Crie um banco no MySQL:
```bash
CREATE DATABASE seeflix;
```

## Crie uma tabela users:
```bash
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```


## Crie o arquivo .env.local na raiz do projeto:

### Configuração do MySQL
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=seeflix
```
## TMDB API
```bash
NEXT_PUBLIC_TMDB_API_KEY=
```

## JWT
```bash
JWT_SECRET=seusegredoaqui
```

## Rode em modo desenvolvimento

npm run dev
