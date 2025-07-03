                         
# Desafio Shipay Backend

Este repositório contém as soluções para o desafio técnico da Shipay, organizado em diferentes questões que abordam desenvolvimento backend, análise de problemas e boas práticas de segurança.

## 📁 Estrutura do Projeto

### 🚀 Projeto Principal (Questões 1-5)
O projeto principal é uma API desenvolvida em **NestJS** com **TypeScript** e **Prisma ORM**, utilizando **PostgreSQL** como banco de dados.

**[Projeto](https://github.com/wagnerjunr/Desafio-Shipay-Backend/blob/main/Projeto/README.md)**

#### Questões Implementadas:
- **Questão 1**: Consulta SQL raw para buscar dados de usuário com roles e permissões
- **Questão 2**: Implementação da mesma consulta utilizando ORM (Prisma)
- **Questão 3**: Sistema de busca de roles de usuários
- **Questão 4**: Criação de usuários com geração automática de senha
- **Questão 5**: Documentação do projeto e como executá-la localmente e no ambiente de produção

### 🔧 Questão 6 - Análise de Erro em Produção
Análise detalhada de um erro crítico em sistema de renovação de tokens, incluindo diagnóstico, causas possíveis e soluções recomendadas.

**[Análise Completa](https://github.com/wagnerjunr/Desafio-Shipay-Backend/blob/main/6%20Quest%C3%A3o/README.md)**

**Resumo**: Erro `AttributeError` em task de renovação de tokens da Wallet X devido à configuração `WALLET_X_TOKEN_MAX_AGE` ausente.

### 🛡️ Questão 7 - Code Review e Segurança
Revisão de código de um bot de exportação de dados, identificando vulnerabilidades de segurança e propondo melhorias.

**[Code Review Completo](https://github.com/wagnerjunr/Desafio-Shipay-Backend/blob/main/7%20Quest%C3%A3o/README.md)**

**Principais problemas identificados**:
- Credenciais hardcoded no código
- Exposição de senhas em logs
- Ausência de tratamento de erros
- Problemas de performance

### 🏗️ Questão 8 - Padrões de Projeto para Normalização de Serviços
Análise e proposta de padrões de projeto para normalizar serviços de terceiros, criando interfaces uniformes para diferentes fornecedores.

**[Análise Completa](https://github.com/wagnerjunr/Desafio-Shipay-Backend/blob/main/8%20Quest%C3%A3o/README.md)**

**Padrões propostos**:
- **Adapter Pattern**: Para converter interfaces incompatíveis em uma interface comum
- **Strategy Pattern**: Para alternar entre diferentes provedores em tempo de execução
---
        