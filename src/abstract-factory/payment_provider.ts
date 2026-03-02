/* ========= Abstract Products ========= */

interface Payment {
  pay(amount: number, currency: string): Promise<{ transactionId: string }>;
}

interface Refund {
  refund(transactionId: string, amount?: number): Promise<{ refundId: string }>;
}

interface Invoice {
  createInvoice(
    customerId: string,
    items: Array<{ name: string; price: number }>,
  ): Promise<{ invoiceId: string }>;
  send(invoiceId: string): Promise<string>;
}

/* ========= Abstract Factory ========= */

interface PaymentProviderFactory {
  createPayment(): Payment;
  createRefund(): Refund;
  createInvoice(): Invoice;
}

/* ========= Stripe Family ========= */

/* ========= Concrete Product  ========= */
class StripePayment implements Payment {
  async pay(amount: number, currency: string) {
    // imagine Stripe SDK call هنا
    return { transactionId: `stripe_tx_${Date.now()} ${currency} ${amount}` };
  }
}

/* ========= Concrete Product  ========= */
class StripeRefund implements Refund {
  async refund(transactionId: string, amount?: number) {
    return { refundId: `stripe_rf_${transactionId}_${amount ?? "full"}` };
  }
}

/* ========= Concrete Product  ========= */
class StripeInvoice implements Invoice {
  async createInvoice(
    customerId: string,
    items: Array<{ name: string; price: number }>,
  ) {
    return {
      invoiceId: `stripe_inv_${customerId}_${items.length}_${Date.now()}`,
    };
  }
  async send(invoiceId: string) {
   return `sent ${invoiceId}`; // send invoice via Stripe
  }
}

class StripeFactory implements PaymentProviderFactory {
  createPayment(): Payment {
    return new StripePayment();
  }
  createRefund(): Refund {
    return new StripeRefund();
  }
  createInvoice(): Invoice {
    return new StripeInvoice();
  }
}

/* ========= PayPal Family ========= */

class PayPalPayment implements Payment {
  async pay(amount: number, currency: string) {
    // imagine PayPal SDK call هنا
    return { transactionId: `paypal_tx_${Date.now()} ${currency} ${amount}` };
  }
}

class PayPalRefund implements Refund {
  async refund(transactionId: string, amount?: number) {
    return { refundId: `paypal_rf_${transactionId}_${amount ?? "full"}` };
  }
}

class PayPalInvoice implements Invoice {
  async createInvoice(
    customerId: string,
    items: Array<{ name: string; price: number }>,
  ) {
    return {
      invoiceId: `paypal_inv_${customerId}_${items.length}_${Date.now()}`,
    };
  }
  async send(invoiceId: string) {
    return `sent ${invoiceId}`; // send invoice via PayPal
  }
}

class PayPalFactory implements PaymentProviderFactory {
  createPayment(): Payment {
    return new PayPalPayment();
  }
  createRefund(): Refund {
    return new PayPalRefund();
  }
  createInvoice(): Invoice {
    return new PayPalInvoice();
  }
}

/* ========= Client Code ========= */

class CheckoutService {
  constructor(private factory: PaymentProviderFactory) {}

  async processPayment(amount: number, currency: string) {
    const payment = this.factory.createPayment();
    return await payment.pay(amount, currency);
  }

  async processRefund(transactionId: string, amount?: number) {
    const refund = this.factory.createRefund();
    return await refund.refund(transactionId, amount);
  }

  async createInvoice(
    customerId: string,
    items: Array<{ name: string; price: number }>,
  ) {
    const invoice = this.factory.createInvoice();
    return await invoice.createInvoice(customerId, items);
  }
}

/* ========= Usage ========= */

async function main() {
  const provider: "stripe" | "paypal" = "stripe";

  const factory: PaymentProviderFactory =
    provider === "stripe" ? new StripeFactory() : new PayPalFactory();

  const checkout = new CheckoutService(factory);

  const result = await checkout.processPayment(20, "USD");
  console.log("Payment:", result);

  const refundResult = await checkout.processRefund(result.transactionId, 10);
  console.log("Refund:", refundResult);
}

main();
