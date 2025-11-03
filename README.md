# Articles API

Uma API REST robusta para gerenciamento de artigos com sistema de autenticação JWT e controle de permissões baseado em roles.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Sistema de Permissões](#sistema-de-permissões)
- [Endpoints Principais](#endpoints-principais)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)

## 🚀 Sobre o Projeto

A Articles API é uma aplicação backend desenvolvida com NestJS que oferece um sistema completo de gerenciamento de artigos com autenticação segura e controle granular de permissões. O projeto implementa as melhores práticas de desenvolvimento, incluindo validação de dados, documentação automática e soft delete.

### Principais Características

- **Autenticação JWT**: Sistema seguro de autenticação com tokens JWT
- **Controle de Permissões**: Sistema baseado em roles (Admin, Editor, Reader)
- **Soft Delete**: Exclusão lógica de registros para auditoria
- **Validação Robusta**: Validação automática de dados com class-validator
- **Documentação Automática**: Interface Swagger para testes e documentação
- **Arquitetura Modular**: Código organizado em módulos para melhor manutenibilidade

## 🛠 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - JSON Web Tokens para autenticação
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Hash de senhas
- **[Swagger](https://swagger.io/)** - Documentação automática da API
- **[Docker](https://www.docker.com/)** - Containerização da aplicação

## ✨ Funcionalidades

### Autenticação e Autorização
- ✅ Login com email e senha
- ✅ Geração e validação de tokens JWT
- ✅ Sistema de permissões baseado em roles
- ✅ Proteção de rotas com guards personalizados

### Gerenciamento de Usuários
- ✅ CRUD completo de usuários (Admin apenas)
- ✅ Hash seguro de senhas
- ✅ Soft delete para auditoria
- ✅ Validação de dados de entrada

### Gerenciamento de Artigos
- ✅ Criação de artigos (Admin/Editor)
- ✅ Listagem e visualização (Admin/Editor/Reader)
- ✅ Edição e exclusão (Admin/Editor)
- ✅ Associação automática com autor

### Gerenciamento de Permissões
- ✅ CRUD de permissões (Admin apenas)
- ✅ Controle granular de acesso
- ✅ Validação de permissões em tempo real

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose**
- **PostgreSQL** (se não usar Docker)

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd articles
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/articles_db"

# JWT
JWT_SECRET="seu-jwt-secret-super-seguro"
JWT_EXPIRES_IN="1h"

# Application
PORT=3000
NODE_ENV="development"
```

### Banco de Dados

O projeto utiliza PostgreSQL com Prisma ORM. A configuração do banco está no arquivo `prisma/schema.prisma`.

## 🚀 Executando o Projeto

### Com Docker (Recomendado)

1. **Inicie os serviços**
```bash
docker-compose up -d --build
```

2. **Execute as migrações**
```bash
npm run prisma:migrate
```

3. **Popule o banco com dados iniciais**
```bash
npm run prisma:seed
```

### Sem Docker

1. **Inicie o PostgreSQL localmente**

2. **Execute as migrações**
```bash
npm run prisma:migrate
```

3. **Popule o banco com dados iniciais**
```bash
npm run prisma:seed
```

4. **Inicie a aplicação**
```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📚 Documentação da API

A documentação interativa da API está disponível através do Swagger UI:

**URL**: `http://localhost:3000/api`

### Como usar a documentação:

1. Acesse a URL da documentação
2. Faça login através do endpoint `/auth/signin`
3. Copie o token JWT retornado
4. Clique em "Authorize" no Swagger
5. Cole o token (sem "Bearer ")
6. Teste os endpoints protegidos

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

#### Users
- `id`: Identificador único
- `name`: Nome do usuário
- `email`: Email único
- `passwordHash`: Senha criptografada
- `permissionId`: Referência à permissão
- `createdAt`, `updatedAt`, `deletedAt`: Timestamps

#### Articles
- `id`: Identificador único
- `title`: Título do artigo
- `content`: Conteúdo do artigo
- `authorId`: Referência ao autor
- `createdAt`, `updatedAt`, `deletedAt`: Timestamps

#### Permissions
- `id`: Identificador único
- `name`: Nome da permissão
- `description`: Descrição da permissão

## 🔐 Sistema de Permissões

O sistema implementa três níveis de permissão:

### Admin (Nível 3)
- ✅ Acesso total ao sistema
- ✅ Gerenciar usuários
- ✅ Gerenciar permissões
- ✅ Criar, editar e excluir artigos

### Editor (Nível 1)
- ✅ Criar, editar e excluir artigos
- ✅ Visualizar artigos
- ❌ Gerenciar usuários
- ❌ Gerenciar permissões

### Reader (Nível 2)
- ✅ Visualizar artigos
- ❌ Criar, editar ou excluir artigos
- ❌ Gerenciar usuários
- ❌ Gerenciar permissões