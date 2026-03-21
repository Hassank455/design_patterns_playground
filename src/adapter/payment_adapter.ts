/* ========= Target ========= */
interface PaymentProcessor {
  pay(amount: number): Promise<{ success: boolean; transactionId: string }>;
}

/* ========= Adaptee ========= */
class StripeGateway {
  async createCharge(
    amountInCents: number,
  ): Promise<{ id: string; status: string }> {
    console.log(`[Stripe] Charging ${amountInCents} cents...`);

    return {
      id: `stripe_${Date.now()}`,
      status: "succeeded",
    };
  }
}

/* ========= Adaptee ========= */
class LegacyPaymentGateway {
  makePayment(value: number): { reference: string; approved: boolean } {
    console.log(`[Legacy] Processing payment of ${value} dollars...`);

    return {
      reference: `legacy_${Date.now()}`,
      approved: true,
    };
  }
}
/* ========= Adapter ========= */
class StripeAdapter implements PaymentProcessor {
  constructor(private stripeGateway: StripeGateway) {}
  async pay(
    amount: number,
  ): Promise<{ success: boolean; transactionId: string }> {
    const amountInCents = amount * 100;

    const result = await this.stripeGateway.createCharge(amountInCents);

    return {
      success: result.status === "succeeded",
      transactionId: result.id,
    };
  }
}

class LegacyPaymentAdapter implements PaymentProcessor {
  constructor(private legacyGateway: LegacyPaymentGateway) {}

  async pay(
    amount: number,
  ): Promise<{ success: boolean; transactionId: string }> {
    const result = this.legacyGateway.makePayment(amount);

    return {
      success: result.approved,
      transactionId: result.reference,
    };
  }
}

//* ========= Client ========= */
class CheckoutService {
  constructor(private paymentProcessor: PaymentProcessor) {}

  async checkout(amount: number): Promise<void> {
    console.log(`Starting checkout for $${amount}...`);

    const result = await this.paymentProcessor.pay(amount);

    if (result.success) {
      console.log(
        `Payment successful. Transaction ID: ${result.transactionId}`,
      );
    } else {
      console.log("Payment failed.");
    }
  }
}

/* ========= run  ========= */
async function main(): Promise<void> {
  const stripeProcessor = new StripeAdapter(new StripeGateway());
  const legacyProcessor = new LegacyPaymentAdapter(new LegacyPaymentGateway());

  const stripeCheckout = new CheckoutService(stripeProcessor);
  const legacyCheckout = new CheckoutService(legacyProcessor);

  await stripeCheckout.checkout(50);
  console.log("---------------------------");
  await legacyCheckout.checkout(75);
}

main();
