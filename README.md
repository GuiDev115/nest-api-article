<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 📝 NestJS Blog API

Uma API RESTful para blog construída com NestJS, TypeScript, MySQL e JWT Authentication.

## 🚀 Características

- **Autenticação JWT** - Sistema completo de login/registro
- **Autenticação Dupla** - Suporte a token via header e query parameter
- **CRUD Completo** - Gerenciamento de usuários e artigos
- **Validação** - Validação de dados com class-validator
- **Banco de Dados** - MySQL com TypeORM
- **Relacionamentos** - Users → Articles (One-to-Many)
- **Segurança** - Hash de senhas com bcrypt

## 🛠️ Tecnologias

- **Backend**: NestJS, TypeScript
- **Banco de Dados**: MySQL
- **ORM**: TypeORM
- **Autenticação**: JWT, Passport
- **Validação**: class-validator
- **Criptografia**: bcryptjs

## 📋 Pré-requisitos

- Node.js (v16 ou superior)
- MySQL
- Yarn ou npm

## ⚙️ Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd nest-blog

# Instalar dependências
yarn install
# ou
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

## 🔧 Configuração

Configure o arquivo `.env`:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=blog_db

# JWT
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
```

### Gerar JWT Secret

```bash
# Usando Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Usando OpenSSL
openssl rand -hex 64
```

## 🗄️ Banco de Dados

```sql
-- Criar banco de dados
CREATE DATABASE blog_db;
```

## 🚀 Executar Aplicação

```bash
# Desenvolvimento
yarn start:dev

# Produção
yarn start:prod

# Watch mode
yarn start
```

A API estará rodando em `http://localhost:3000`

## 📡 Endpoints da API

### 🔐 Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/register` | Registrar novo usuário |
| POST | `/auth/login` | Login de usuário |

### 👥 Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/users/register` | Registrar usuário |

### 📰 Artigos

#### Método Tradicional (Authorization Header)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/articles` | Listar todos os artigos | ❌ |
| GET | `/articles/:id` | Buscar artigo por ID | ❌ |
| POST | `/articles` | Criar novo artigo | ✅ |
| PATCH | `/articles/:id` | Atualizar artigo | ✅ |
| DELETE | `/articles/:id` | Deletar artigo | ✅ |
| GET | `/articles/my/articles` | Meus artigos | ✅ |

#### Método com Token na URL

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/articles/create-with-token?token=JWT_TOKEN` | Criar artigo |
| PATCH | `/articles/update-with-token/:id?token=JWT_TOKEN` | Atualizar artigo |
| DELETE | `/articles/delete-with-token/:id?token=JWT_TOKEN` | Deletar artigo |
| GET | `/articles/my-articles-with-token?token=JWT_TOKEN` | Meus artigos |

## 📝 Exemplos de Uso

### Registrar Usuário

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "123456"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "password": "123456"
  }'
```

### Criar Artigo (Header Authorization)

```bash
curl -X POST http://localhost:3000/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_JWT_TOKEN" \
  -d '{
    "title": "Meu Primeiro Artigo",
    "content": "Conteúdo do artigo...",
    "summary": "Resumo do artigo",
    "published": true
  }'
```

### Criar Artigo (Token na URL)

```bash
curl -X POST "http://localhost:3000/articles/create-with-token?token=SEU_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Artigo via URL Token",
    "content": "Conteúdo do artigo...",
    "published": true
  }'
```

## 📊 Estrutura do Banco

### Tabela Users
```sql
- id (PK)
- name
- email (unique)
- password (hashed)
- createdAt
- updatedAt
```

### Tabela Articles
```sql
- id (PK)
- title
- content
- summary
- published
- authorId (FK → users.id)
- createdAt
- updatedAt
```

## 📁 Estrutura do Projeto

```
src/
├── auth/                 # Módulo de autenticação
│   ├── guards/          # Guards de autenticação
│   ├── strategies/      # Estratégias JWT
│   └── dto/            # DTOs de auth
├── users/               # Módulo de usuários
│   ├── entities/       # Entidade User
│   └── dto/           # DTOs de usuário
├── articles/           # Módulo de artigos
│   ├── entities/      # Entidade Article
│   └── dto/          # DTOs de artigo
└── config/           # Configurações
```

## 🔒 Segurança

- Senhas são criptografadas com bcrypt
- Tokens JWT com expiração de 24h
- Validação de dados de entrada
- Verificação de autorização para operações

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo para mais detalhes.

⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐