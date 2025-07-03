 
# Questão 8 - Padrões de Projeto para Normalização de Serviços de Terceiros

Para normalizar serviços de terceiros como disparos de e-mails ou SMS, tornando múltiplas interfaces de diferentes fornecedores uniformes, eu utilizaria uma combinação dos seguintes padrões de projeto:

**Adapter Pattern** 

- É o padrão mais adequado para converter interfaces incompatíveis em uma interface comum
- Permite integrar diferentes provedores (SendGrid, Mailgun)
- Cada provedor teria seu próprio adaptador que implementa uma interface comum

**Exemplo conceitual:**
```typescript
interface EmailService {
  sendEmail(to: string, subject: string, body: string): Promise<boolean>;
}

class SendGridAdapter implements EmailService {
  async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
  }
}

class MailgunAdapter implements EmailService {
  async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
  }
}
```

**Strategy Pattern**

- Permite alternar entre diferentes provedores em tempo de execução
- Facilita implementação de fallback (se um provedor falhar, usar outro)
- Possibilita escolha de provedor baseada em critérios como custo, região, ou tipo de mensagem

**Factory Pattern**

- Centraliza a criação dos adaptadores
- Facilita configuração e injeção de dependências
- Permite escolha dinâmica do provedor baseada em configuração

**Exemplo conceitual:**
```typescript
class EmailServiceFactory {
  static create(provider: string): EmailService {
    switch(provider) {
      case 'sendgrid': return new SendGridAdapter();
      case 'mailgun': return new MailgunAdapter();
      default: throw new Error('Provider not supported');
    }
  }
}
```
        