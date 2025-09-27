# React + Vite Project

Este é um projeto React criado com Vite como ferramenta de build.

## Tecnologias Utilizadas
- React 18
- Vite como bundler
- React Router DOM para navegação
- JavaScript/JSX
- Hot Module Replacement (HMR)
- ESLint para linting

## Estrutura do Projeto
```
src/
├── Components/
│   └── NavBar.jsx
├── Pages/
│   ├── LandingPage.jsx
│   ├── MoviesPage.jsx
│   ├── SeriesPage.jsx
│   └── SeriesDetail.jsx
├── main.jsx
└── index.css
```

## Comandos Disponíveis
- `npm run dev` - Inicia o servidor de desenvolvimento (porta 5175)
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa ESLint

## Desenvolvimento
1. Use `npm run dev` para iniciar o desenvolvimento local com hot reload
2. O servidor estará disponível em http://localhost:5175/
3. O projeto já está configurado com React Router para navegação entre páginas

## Rotas Disponíveis
- `/` - Landing Page
- `/movies` - Página de Filmes
- `/series` - Página de Séries
- `/series/:id` - Detalhes de uma série específica

## Dependências Instaladas
- react-router-dom - Para navegação SPA
- Todas as dependências do Vite/React configuradas automaticamente
