# Projeto Desafio Shipay

# 1 - Questão

Para consulta SQL que retorne o nome, e-mail, a descrição do papel e as descrições das permissões/claims que um usuário possui, com base no ID do usuário foi criado uma rota para testar a consulta SQL e um arquivo SQL.

- [Arquivo com SQL](https://github.com/wagnerjunr/Desafio-Shipay-Backend/blob/main/SELECT.sql)
- `GET /users/:id/test-sql` - Endpoint especial para consulta SQL raw

# 2 - Questão

Fazer a busca de nome, e-mail, a descrição do papel e as descrições das permissões/claims que um usuário possui utilizando um ORM para busca. Essa rota de busca se encontra no módulo de users.

- `GET /users/:id` - Busca usuário por ID

**implementação:**

```typescript
async findOne(id: number) {
  const user = await this.prisma.user.findUnique({
    where: { id: BigInt(id) },
    select: {
      id: true,
      name: true,
      email: true,
      roleId: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      userClaims: {
        include: {
          claim: true,
        },
      },
    },
  });
  if (!user) {
    throw new BadRequestException("Usuário não encontrado");
  }
  return user;
}
```

# 3 - Questão

Para a busca de role de um usuário foi criado uma rota para criação de roles e outras para buscas.

- `GET /users/:userId/role` - Busca a role de um usuário
- `POST /roles` - Criação de roles
- `GET /roles/:id` - Busca role os usuários vinculados a roleId

**implementação:**

```typescript
async userRoleById(userId: number) {
    const userRole = await this.prisma.user.findUnique({
      where: { id: BigInt(userId) },
      select: {
        name:true,
        email: true,
        role: true,
      },
    });
    if (!userRole) {
      throw new BadRequestException("Usuário não encontrado");
    }
    return userRole;
  }
```

# 4 - Questão

Criado uma rota para criação de usuário, sendo campos obrigatórios name, email, roleId. Já a senha é um campo opcional, caso não seja informado será gerado uma senha aleatória.

- `POST /users` - Criação de usuários
- `GET /users/:id` - Busca usuário por ID

**Exemplo de implementação:**

```typescript
let password = createUserDto.password;
if (!password) {
  password = this.generateRandomPassword();
}
const hashedPassword = await bcrypt.hash(password, 10);
const user = await this.prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    roleId,
  },
  include: {
    role: true,
  },
});
return {
  message: "Usuário criado com sucesso",
};
```

# 5 - Questão

Documentação de como rodar o projeto no ambiente local e sugestões de como fazer o deploy no ambiente de produção.

## 🚀 Tecnologias e Dependências Utilizadas

### Principais Dependências

- **NestJS** (^11.0.1) - Framework Node.js para construção de aplicações server-side escaláveis
- **Prisma** (^6.11.0) - ORM moderno para TypeScript e Node.js
- **PostgreSQL** - Banco de dados relacional
- **bcrypt** (^6.0.0) - Biblioteca para hash de senhas
- **@nestjs/swagger** (^11.2.0) - Documentação automática da API

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
cd Desafio-Shipay-Backend
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
```

A API estará disponível em `http://localhost:3001`

## 📚 Documentação da API (Swagger)

O projeto utiliza o **Swagger** para documentação automática da API. O Swagger foi escolhido porque:

- **Documentação Automática**: Gera documentação interativa automaticamente a partir dos decorators do NestJS
- **Interface Amigável**: Permite testar as rotas diretamente na interface web
- **Validação Visual**: Mostra os schemas de request/response de forma clara

### Como acessar:

Após iniciar a aplicação, acesse: **http://localhost:3001/docs**

A documentação Swagger permite:

- Visualizar todas as rotas disponíveis
- Testar endpoints diretamente na interface

## 🏗️ Decisões de Arquitetura

### Estruturação das Rotas

A API foi estruturada seguindo os princípios RESTful e a arquitetura modular do NestJS:

#### **Módulo Users** (`/users`)

- `POST /users` - Criação de usuários
- `GET /users/:id` - Busca usuário por ID
- `GET /users/:userId/role` - Busca a role de um usuário
- `GET /users/:id/test-sql` - Endpoint especial para consulta SQL raw

#### **Módulo Roles** (`/roles`)

- `POST /roles` - Criação de roles
- `GET /roles/:id` - Busca role por ID

### Estruturação do Banco de Dados

O banco foi modelado seguindo a estrutura do banco de dados fornecida.

Obs: Algo que seria ideal melhorar seria a forma como os Ids são gerados, sendo atualmente o Id é gerado automaticamente pelo banco de dados de forma incremental, podendo acarretar erros.Uma forma de melhorar poderia ser colocar como String e gerar um UUID v4.
Nesse projeto não foi implementado para que os testes fossem mais simples.

### Testes da API

#### Usando Swagger (Recomendado)

Acesse `http://localhost:3001/docs` e teste diretamente na interface web.

## 🐳 Docker

O projeto inclui um `docker-compose.yml` que configura:

- PostgreSQL na porta 5432
- Usuário: `shipay`
- Senha: `shipay`
- Database: `shipay-database`

