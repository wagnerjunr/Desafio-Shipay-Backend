# 📋 Code Review - Bot de Exportação de Dados

## 🔍 Análise do Código

Este documento apresenta os principais problemas identificados no bot de exportação de dados da tabela `users` e suas respectivas soluções.

---

### 1. **Credenciais Hardcoded no Código**

**⚠️ Problema:** Atualmente o arquivo possui exposição de credenciais no codigo fonte, uma prática não recomendada.

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:123mudar@127.0.0.1:5432/bot_db'
```

**✅ Solução Recomendada:** Configurar variáveis de ambiente e utilizar `dotenv` para gerenciar as credenciais.

```python
import os
from dotenv import load_dotenv

load_dotenv()
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
```

**📁 Arquivo .env:**

```env
DATABASE_URL=postgresql+psycopg2://postgres:senha_segura@127.0.0.1:5432/bot_db
```

---

### 2. **Exposição de Senhas em Logs**

**⚠️ Problema:** Senhas sendo expostas em console e arquivos Excel.

```python
print('Password: {0}'.format(order[3]))
worksheet.write('D{0}'.format(index),order[3])
```

**✅ Solução Recomendada:**

```python
print('Password: ****')
worksheet.write('D{0}'.format(index), '****' if order[3] else '')
```

---

### 3. **Configuração Incorreta**

**⚠️ Problema:** Ao executar task1_instance a função task1(db) é executada imediatamente,fazendo com que o agendamento desse job não funcione como esperado e o retorno dessa execução (provavelmente None) é o que esteja sendo passado para add_job.

```python
task1_instance = scheduler.add_job(task1(db), 'interval', id='task1_job', minutes=var1)
```

**✅ Solução Recomendada:** Ao executar task1_instance a função task1 sendo passado dessa forma não será executada, mas sim passada como referência para que o scheduler possa executá-la quando necessário.

```python
task1_instance = scheduler.add_job(
    func=task1,
    args=[db],
    trigger='interval',
    id='task1_job',
    minutes=var1
)
```

---

### 4. **Brecha de Segurança - Consulta SQL**

**⚠️ Problema:** Se tiver variáveis inseridas manualmente pode abrir uma brecha de segurança, uma vez que abre uma vunerabilidade de SQL Injection.

```python
def task1(db):
    orders = db.session.execute('SELECT * FROM users;')
```

**✅ Solução Recomendada:** Utilizar a função text do SQLAlchemy para evitar injeções de SQL.

```python
def task1(db):
    orders = db.session.execute(text('SELECT * FROM users')).fetchall()

    # em casos de variáveis:
    stmt = text('SELECT * FROM users WHERE id = :user_id')
    res = db.session.execute(stmt, {'user_id': 1})
```

---

### 5. **Falta de Tratamento de Erros**

**⚠️ Problema:** Falta de tratamento de erros em caso de falha na função de exportação.

```python
def task1(db):
    try:
        # ... código
    except Exception as e:
        app.logger.error(f'Erro na exportação: {str(e)}')
        raise
```

---

**Melhorias**

Para evitar repetições no código e melhorar a manutenibilidade segue algumas mudanças:

```python
# Código repetitivo com 14+ linhas de print/write
print('Id: {0}'.format(order[0]))
worksheet.write('A{0}'.format(index),order[0])
print('Name: {0}'.format(order[1]))
worksheet.write('B{0}'.format(index),order[1])
# ... mais 10 linhas similares
```

**✅ Solução Recomendada:** Verificar se é necessário enviar campo de senha(password) para o excel, caso não seja, remover a linha de senha.

```python
    orders = db.session.execute(text('SELECT * FROM users')).fetchall()

    headers = ['Id', 'Name', 'Email', 'Password', 'Role Id', 'Created At', 'Updated At']

    for col_index, header in enumerate(headers):
        worksheet.write(0, col_index, header)

    for row_index, order in enumerate(orders, start=1):
        for col_index, value in enumerate(order):
            worksheet.write(row_index, col_index, value)

    workbook.close()
    print('Job executed!')
```

## 📊 **BENEFÍCIOS DAS MELHORIAS**

### **🛠️ Manutenibilidade:**

- ✅ Código mais limpo e legível
- ✅ Funções corrigidas e funcionais
- ✅ Tratamento de erros

### **⚡ Performance:**

- ✅ Query otimizada e segura
- ✅ Menos repetição de código

### **🔒 Segurança:**

- ✅ Query segura contra injeções de SQL
- ✅ Logs mais detalhados

---

## 🚀 **Passos Recomendados**

1. **Implementar variáveis de ambiente** para credenciais
2. **Adicionar validação de configuração** antes da execução
3. **Criar testes unitários** para as funções
4. **Adicionar monitoramento** e métricas de execução
5. **Documentar APIs** e configurações necessárias

---
