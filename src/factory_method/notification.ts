/* ========= Products ========= */

interface Notification {
  send(to: string, data: string): Promise<void>;
}

/* ========= Concrete Product  ========= */

class EmailNotification implements Notification {
  send(to: string, data: string): Promise<void> {
    return new Promise((resolve) => {
      console.log(`[EMAIL] to=${to} data=${JSON.stringify(data)}`);
      resolve();
    });
  }
}

class SmsNotification implements Notification {
  send(to: string, data: string): Promise<void> {
    return new Promise((resolve) => {
      console.log(`[SMS] to=${to} data=${JSON.stringify(data)}`);
      resolve();
    });
  }
}

class PushNotification implements Notification {
  send(to: string, data: string): Promise<void> {
    return new Promise((resolve) => {
      console.log(`[PUSH] to=${to} data=${JSON.stringify(data)}`);
      resolve();
    });
  }
}

/* ========= Creator  ========= */

abstract class NotificationCreator {
  protected abstract createNotification(): Notification;

  public sendNotification(to: string, data: string): void {
    const notification = this.createNotification();
    const validatedRecipient = this.validateRecipient(to);
    const formattedMessage = this.formatMessage(JSON.stringify(data));
    notification.send(validatedRecipient, formattedMessage);
  }

  protected validateRecipient(recipient: string): string {
    if (!recipient || recipient.trim().length === 0) {
      throw new Error("Recipient cannot be empty.");
    }

    return recipient.trim();
  }

  protected formatMessage(message: string): string {
    const timestamp = new Date().toISOString();
    return `${timestamp} - ${message}`;
  }
}
/* ========= Concrete Creators  ========= */

class EmailNotificationCreator extends NotificationCreator {
  protected createNotification(): Notification {
    return new EmailNotification();
  }
}

class SmsNotificationCreator extends NotificationCreator {
  protected createNotification(): Notification {
    return new SmsNotification();
  }
}

class PushNotificationCreator extends NotificationCreator {
  protected createNotification(): Notification {
    return new PushNotification();
  }
}
/* ========= run  ========= */
function sendNotification(
  creator: NotificationCreator,
  recipient: string,
  message: string,
): void {
  creator.sendNotification(recipient, message);
}

function main(): void {
  const emailCreator = new EmailNotificationCreator();
  const smsCreator = new SmsNotificationCreator();
  const pushCreator = new PushNotificationCreator();

  sendNotification(
    emailCreator,
    "hassan@example.com",
    "Welcome to our platform.",
  );
  sendNotification(smsCreator, "+970599123456", "Your OTP code is 1234.");
  sendNotification(
    pushCreator,
    "user_device_token_123",
    "You have a new message.",
  );
}

main();
