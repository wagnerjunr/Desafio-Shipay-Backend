         
# Projeto - 1 a 5 Questões
         
# Backend - Desafio Shipay

API REST desenvolvida com NestJS, Prisma ORM e PostgreSQL para gerenciamento de usuários, roles e permissões.

## 🚀 Tecnologias e Dependências Utilizadas

### Principais Dependências
- **NestJS** (^11.0.1) - Framework Node.js para construção de aplicações server-side escaláveis
- **Prisma** (^6.11.0) - ORM moderno para TypeScript e Node.js
- **PostgreSQL** - Banco de dados relacional
- **bcrypt** (^6.0.0) - Biblioteca para hash de senhas

### Dependências de Desenvolvimento
- **TypeScript** (^5.7.3) - Superset tipado do JavaScript

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🔧 Como Rodar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/wagnerjunr/Desafio-Shipay-Backend.git
cd Projeto
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados
```bash
docker-compose up -d
```

### 4. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="postgresql://shipay:shipay@localhost:5432/shipay-database"
PORT=3001
```

### 5. Execute as migrações do banco
```bash
npx prisma migrate dev
```

### 6. Gere o cliente Prisma
```bash
npx prisma generate
```

### 7. Inicie a aplicação
```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3001`

## 🏗️ Decisões de Arquitetura

### Estruturação das Rotas

A API foi estruturada seguindo os princípios RESTful e a arquitetura modular do NestJS:

#### **Módulo Users** (`/users`)
- `POST /users` - Criação de usuários
- `GET /users/:id` - Busca usuário por ID
- `GET /users/:id/test-sql` - Endpoint especial para consulta SQL raw

#### **Módulo Roles** (`/roles`)
- `POST /roles` - Criação de roles
- `GET /roles/:id` - Busca role por ID

### Estruturação do Banco de Dados

O banco foi modelado seguindo a estrutura do banco de dados fornecida.

Obs: Algo que seria ideal melhorar seria a forma como os Ids são gerados, sendo atualmente o Id é gerado automaticamente pelo banco de dados de forma incremental, podendo acarretar erros.Uma forma de melhorar poderia ser colocar como String e gerar um UUID v4.
Nesse projeto não foi implementado para que os testes fossem mais simples. 


### Testes Manuais com API

#### 1. Criar uma Role
```bash
curl -X POST http://localhost:3001/roles \
  -H "Content-Type: application/json" \
  -d '{"description": "Admin"}'
```

#### 2. Criar um Usuário
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "roleId": 1,
    "password": "123456"
  }'
```

#### 3. Buscar Usuário
```bash
curl http://localhost:3001/users/1
```

#### 4. Testar Consulta SQL Raw
```bash
curl http://localhost:3001/users/1/test-sql
```

### Ferramentas Recomendadas
- **Postman** ou **Insomnia** para testes de API
- **Prisma Studio** para visualizar dados: `npx prisma studio`

## 🐳 Docker

O projeto inclui um `docker-compose.yml` que configura:
- PostgreSQL na porta 5432
- Usuário: `shipay`
- Senha: `shipay`
- Database: `shipay-database`


        