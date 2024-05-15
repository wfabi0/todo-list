# [Todo List]()

<div align="center" style="margin-bottom: 20px;">
    <img src="public/todo-icon-edit.png" alt="Busca CEP" width="70%" height="auto">
</div>

Website para gerenciar listas de tarefas.

## 🛠️ Tecnologias

Tecnologias usadas no desenvolvimento:

- [Next.js](https://nextjs.org/docs) - Acesse para ver a documentação;
- [React](https://react.dev/learn) - Acesse para ver a documentação;
- [Node.js](https://nodejs.org/en/download) - Acesse para realizar a instalação;
- [Tailwindcss](https://tailwindcss.com/docs/installation) - Acesse para ver a documentação;
- [Typescript](https://www.typescriptlang.org/docs/) - Acesse para ver a documentação;
- [Prisma ORM](https://www.prisma.io/docs) - Acesse para ver a documentação;

## 📑 Banco de dados

- [MongoDB](https://www.mongodb.com/atlas/database) - Acesse para mais informações.

## 💭 Ambiente de desenvolvimento.

Para iniciar no ambiente de desenvolvimento:

```bash
# Baixe o projeto na sua maquina
git clone https://github.com/wfabi0/todo-list.git

# Instalar as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### 🔐 Configurando variáveis de ambiente.

Adicione as configurações

```env
DATABASE_URL="sua url do mongodb"
AUTH_SECRET="gere uma senha secreta"

# Exemplo:
# DATABASE_URL="mongodb+srv://NOME:SENHA@CLUSTER/nextcrashcourse"
# AUTH_SECRET="7gXu7;J0gnMAuo%R"
```

#### 🔗 Recomendações:

Gerador de senha: [LastPass](https://www.lastpass.com/pt/features/password-generator#generatorTool);

Banco de dados: [MongoDB Atlas](https://www.mongodb.com/atlas/database), possui um plano gratuito para pequenos projetos.

### ✍️ Iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Lembre-se de ter [Node.js](https://nodejs.org/pt-br/download/current) instalado.

Abra o [http://localhost:3000](http://localhost:3000) com seu navegador para ver o projeto.
A porta será diferente caso a 3000 esteja sendo usada.