/* ========= Subsystems ========= */
class PaymentService {
  pay(amount: number): boolean {
    console.log(`Processing payment of $${amount}`);
    return true;
  }
}

class InvoiceService {
  createInvoice(amount: number): string {
    const id = `inv_${Date.now()}`;
    console.log(`Invoice created: ${id} for $${amount}`);
    return id;
  }
}

class NotificationService {
  send(message: string): void {
    console.log(`Sending notification: ${message}`);
  }
}
class FraudService {
  check(amount: number): boolean {
    console.log(`Checking fraud for $${amount}`);
    return true;
  }
}

/* ========= Facade ========= */
class CheckoutFacade {
  constructor(
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    private notificationService: NotificationService,
    private fraudService: FraudService,
  ) {}

  processPayment(amount: number): void {
    console.log("Starting checkout process...");

    const isSafe = this.fraudService.check(amount);
    if (!isSafe) {
      console.log("Fraud detected. Aborting.");
      return;
    }

    const paymentSuccess = this.paymentService.pay(amount);
    if (!paymentSuccess) {
      console.log("Payment failed.");
      return;
    }

    const invoiceId = this.invoiceService.createInvoice(amount);

    this.notificationService.send(
      `Payment successful. Invoice ID: ${invoiceId}`,
    );

    console.log("Checkout completed successfully.");
  }
}

/* ========= Client  ========= */
class App {
  run(): void {
    const facade = new CheckoutFacade(
      new PaymentService(),
      new InvoiceService(),
      new NotificationService(),
      new FraudService(),
    );

    facade.processPayment(100);
  }
}

/* ========= run  ========= */
function main() {
  const app = new App();
  app.run();
}

main();
