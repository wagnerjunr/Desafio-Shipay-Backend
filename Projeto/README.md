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

### Deploy usando SST + AWS ECS + Fargate + Docker:

## O que é SST?

SST (Serverless Stack Toolkit) é uma ferramenta moderna para construir aplicações full-stack na AWS. Ele permite definir sua infraestrutura como código usando TypeScript, facilitando o deploy e gerenciamento de recursos AWS como ECS, Lambda, S3, RDS, entre outros. 

**Documentação oficial SST Nest.js:**https://sst.dev/docs/start/aws/nestjs/

## Passo a Passo para Deploy

### 1. Configurar AWS Credentials

Antes de começar, você deve configurar as credenciais AWS no CLI local para que o SST tenha acesso à sua conta AWS.

**Documentação oficial Credenciais:** https://sst.dev/docs/iam-credentials#credentials

```bash
aws configure
```
Você precisará fornecer (Necessário possuir uma conta AWS e ter permissões para criar recursos na AWS):
- AWS Access Key ID
- AWS Secret Access Key

### 2. Inicializar SST e Configurar sst.config.ts

```bash
npx sst@latest init
```

Este comando criará o arquivo `sst.config.ts` na raiz do projeto. Configure-o com base nos serviços desejados:

```typescript:sst.config.ts
/// <reference path="./.sst/platform/config.d.ts" />
export default {
  app(input) {
    return {
      name: "nestjs-backend",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("MyVpc");
    const cluster = new sst.aws.Cluster("MyCluster", { vpc });

    new sst.aws.Service("APIShipay", {
      cluster,
      memory: "1GB",
      cpu: "1 vCPU",
      port: 3001,
      scaling: {
        min: 1,
        max: 10,
      },
      capacity: {
        fargate: { bases: 1, weight: 0 },
        spot: { weight: 1 },
      },
      loadBalancer: {
        rules: [{ listen: "80/http", forward: "3001/http" }],
      },
      dev: {
        command: "npm run start:dev",
      },
    });
  },
};

```
**Configurações de recursos:** Para esse deploy foi colocado de exemplo apenas fazendo o deploy na AWS ECS e Fargate.
- **CPU**: Define a capacidade de processamento (0.25, 0.5, 1, 2, 4 vCPU)
- **Memory**: Define a memória RAM (0.5 GB a 30 GB, dependendo da CPU)

**Diferença entre Fargate e Spot:**
- **Fargate**: Instâncias sob demanda, mais caras mas garantidas
- **Spot**: Instâncias com desconto (até 90%), mas podem ser interrompidas pela AWS quando há alta demanda


### 3. Ajustar o Dockerfile

Crie ou ajuste o `Dockerfile` na raiz do projeto (configurar com base no projeto):

```dockerfile:Dockerfile
FROM node:22

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3001
CMD ["node", "dist/main"]
```

### 4. Comandos para Build e Visualização

#### Para desenvolvimento local:
```bash
npx sst dev
```
Este comando:
- Inicia o SST em modo desenvolvimento
- Roda sua aplicação localmente
- Conecta com recursos AWS reais

#### Para deploy em produção:
```bash
npx sst deploy --stage production
```

#### Para visualizar recursos criados:
```bash
npx sst console
```
Este comando abre o SST Console no navegador, onde você pode:
- Visualizar todos os recursos AWS criados
- Monitorar logs em tempo real
- Gerenciar diferentes stages (dev, staging, production)

#### Para remover recursos:
```bash
npx sst remove --stage production
```
### 5. Monitoramento

Após o deploy, você pode:
- Acessar a URL fornecida pelo SST
- Monitorar logs via AWS CloudWatch
- Usar o SST Console para debugging
- Configurar alertas no AWS CloudWatch para que seja notificado sobre problemas, questões de escalabilidade, valores, etc.


#### Railway

Railway é uma plataforma de deploy de aplicações. Ele permite que você crie, configure e deploy sua aplicação em poucos cliques.

#### Vanstagens

Railway suporta vários provedores de hospedagem, como AWS, Google Cloud, DigitalOcean, etc.Além de ser uma forma rápida e facil de fazer deploy, com poucos configurações, é uma ótima opção para quem não quer se preocupar com a infraestrutura.

#### Benefícios

- Deploy rápido
- Escalabilidade
- Monitoramento
- Backup
- Segurança
- Integração com outras ferramentas

#### Desvantagens

- Custo
- Menos controle para projetos complexos
- Limite de recursos


#### Passo a Passo para Deploy

1. Crie uma conta no Railway
2. Crie um novo projeto
3. Conecte o projeto ao repositório do GitHub
4. Configure as variáveis de ambiente
5. Deploy a aplicação