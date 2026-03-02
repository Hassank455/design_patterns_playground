/* ========= Abstract Products ========= */

interface Sender {
  send(to: string, message: string): Promise<void>;
}
interface Template {
  render(data: Record<string, string>): string;
}
interface Validator {
  validateRecipient(to: string): boolean;
}
/* ========= Abstract Factory ========= */

interface NotificationFactory {
  createSender(): Sender;
  createTemplate(): Template;
  createValidator(): Validator;
}

/* ========= Email Family ========= */

class EmailSender implements Sender {
  async send(to: string, message: string) {
    // send email logic
    console.log(`[EMAIL] to=${to} msg=${message}`);
  }
}

class EmailTemplate implements Template {
  render(data: Record<string, string>) {
    return `Hello ${data.name},\nYour OTP is: ${data.otp}\nThanks.`;
  }
}

class EmailValidator implements Validator {
  validateRecipient(to: string) {
    // basic email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to);
  }
}

class EmailNotificationFactory implements NotificationFactory {
  createSender(): Sender {
    return new EmailSender();
  }
  createTemplate(): Template {
    return new EmailTemplate();
  }
  createValidator(): Validator {
    return new EmailValidator();
  }
}

/* ========= SMS Family ========= */

class SmsSender implements Sender {
  async send(to: string, message: string) {
    // send SMS logic
    console.log(`[SMS] to=${to} msg=${message}`);
  }
}

class SmsTemplate implements Template {
  render(data: Record<string, string>) {
    return `Hi ${data.name}, your OTP is ${data.otp}`;
  }
}

class SmsValidator implements Validator {
  validateRecipient(to: string) {
    // basic phone number regex
    return /^\+?[1-9]\d{1,14}$/.test(to);
  }
}

class SmsNotificationFactory implements NotificationFactory {
  createSender(): Sender {
    return new SmsSender();
  }
  createTemplate(): Template {
    return new SmsTemplate();
  }
  createValidator(): Validator {
    return new SmsValidator();
  }
}

/* ========= Client Code ========= */

class NotificationService {
  constructor(private factory: NotificationFactory) {}

  async sendNotification(to: string, data: Record<string, string>) {
    const validator = this.factory.createValidator();
    if (!validator.validateRecipient(to)) {
      throw new Error("Invalid recipient");
    }

    const template = this.factory.createTemplate();
    const message = template.render(data);

    const sender = this.factory.createSender();
    await sender.send(to, message);
  }
}

/* ========= Usage ========= */

async function main() {
  const useEmail = true; // toggle this to switch between email and SMS

  const factory: NotificationFactory = useEmail
    ? new EmailNotificationFactory()
    : new SmsNotificationFactory();

  const service = new NotificationService(factory);

  await service.sendNotification("hassan@example.com", {
    name: "Hassan",
    otp: "1234",
  });
}

main();
