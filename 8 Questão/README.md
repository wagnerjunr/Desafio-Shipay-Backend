 
# Questão 8 - Padrões de Projeto para Normalização de Serviços de Terceiros

Para normalizar serviços de terceiros como disparos de e-mails ou SMS, tornando múltiplas interfaces de diferentes fornecedores uniformes, eu utilizaria uma combinação dos seguintes padrões de projeto:

**Adapter Pattern** Com esse Pattern se cria um adaptador, ele é um objeto especial que converte a interface de um objeto para que outro objeto possa entendê-lo.

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
### Vanstagens:
- Facilita a integração de diferentes provedores
- Permite a troca de provedores sem modificar o código existente
- Você pode introduzir novos tipos de adaptadores no programa sem quebrar o código

### Desvantagens:
- A complexidade geral do código aumenta porque você precisa introduzir um conjunto de novas interfaces e classes.
- Necessidade de criação de novos adaptadores para cada novo provedor

**Strategy Pattern** Caso o sistema busque suportar diferentes sistemas diferentes permitindo que o usuário escolha o provedor que deseja utilizar, o Strategy Pattern seria uma boa opção.Sendo ele diferente do Adapter Pattern, pois ele não é um objeto especial que converte a interface de um objeto para que outro objeto possa entendê-lo, mas sim um objeto que define um algoritmo que pode ser usado em diferentes contextos.

- Permite alternar entre diferentes provedores em tempo de execução
- Facilita implementação de fallback (se um provedor falhar, usar outro)
- Possibilita escolha de provedor baseada em critérios como custo, região, ou tipo de mensagem

        