# 🦐 Viveiro Control

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/license-MIT-green)

Um sistema de gestão completo para aquicultura, focado em viveiros de camarão. Desenvolvido com as tecnologias mais modernas de front-end e back-end.

**[Acesse a versão ao vivo do projeto aqui!] (EM-BREVE)**

---

![Prévia do Viveiro Control](EM-BREVE)

## 📖 Sobre o Projeto

O Viveiro Control nasceu da necessidade de aplicar meus conhecimentos em desenvolvimento web para resolver um problema do mundo real. Meu pai gerencia viveiros de camarão e sempre precisou de uma ferramenta simples e eficaz para controlar os custos, as vendas e o desempenho de cada ciclo de produção.

Este projeto é a solução, construído para ser uma aplicação web rápida, intuitiva e completa, que ajuda produtores de aquicultura a tomar decisões melhores baseadas em dados.

---

## 🚀 Funcionalidades

- [x] **Gestão de Viveiros:** CRUD completo (Criar, Ler, Atualizar, Deletar) para os viveiros.
- [x] **Controle de Despesas:** CRUD completo para registrar todos os custos associados a cada viveiro.
- [x] **Controle de Vendas:** CRUD completo para registrar os dados de cada despesca (venda).
- [x] **Persistência de Dados:** Todos os dados são salvos em um banco de dados na nuvem com Supabase.
- [x] **Arquitetura Multi-Página:** Navegação fluida entre diferentes seções do app com React Router.
- [ ] **Dashboard Financeiro:** Visualização de totais, lucro e gráficos para análise de desempenho.
- [ ] **Autenticação de Usuários:** Sistema de login para proteger os dados.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

- **Front-End:**

  - [React](https://react.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
  - [React Router](https://reactrouter.com/)
  - [Recharts](https://recharts.org/) (para os gráficos)

- **Back-End & Infra:**
  - [Supabase](https://supabase.com/) (Banco de Dados PostgreSQL e APIs)
  - [Vercel](https://vercel.com/) (Hospedagem e Deploy Contínuo)

---

## ⚙️ Como Rodar o Projeto Localmente

Para rodar este projeto na sua máquina, siga os passos abaixo.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- [Git](https://git-scm.com/)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/](https://github.com/)[seu-usuario-github]/[nome-do-repositorio].git
    ```
2.  Navegue até a pasta do projeto e instale as dependências:
    ```bash
    cd [nome-do-repositorio]
    npm install
    ```
3.  Crie um arquivo `.env.local` na raiz do projeto e adicione suas chaves do Supabase, seguindo o exemplo do arquivo `.env.example`.
    ```
    VITE_SUPABASE_URL="sua-url-do-supabase"
    VITE_SUPABASE_ANON_KEY="sua-chave-anon-publica"
    ```
4.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
5.  Abra [http://localhost:5173](http://localhost:5173) no seu navegador para ver o resultado.

---

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

## 👨‍💻 Autor

**[Daniel Chaves Castro]**

- LinkedIn: [https://www.linkedin.com/in/daniel-chaves-castro/](https://www.linkedin.com/in/daniel-chaves-castro/)
- GitHub: [@lilkirito22](https://github.com/lilkirito22)
