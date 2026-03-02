# Abstract Factory Pattern

The `Abstract Factory` pattern is used to create families of related objects without coupling client code to concrete classes.

In short: instead of creating objects directly, the client works with a factory abstraction and can switch an entire family (for example, Stripe to PayPal) without changing core business logic.

## Core Idea

- You have a set of related products (for example: `Payment`, `Refund`, `Invoice`)
- Each provider family (Stripe / PayPal) supplies compatible implementations for those products
- The client depends only on abstractions (interfaces)

## When To Use It

- When your system has multiple families of related objects
- When you expect to add new providers/families over time
- When you want to avoid spreading `if/else` or `switch` logic for implementation selection

## 1) Payment Provider (`payment_provider.ts`)

- Abstract products: `Payment`, `Refund`, `Invoice`
- Concrete families:
  - Stripe (`StripePayment`, `StripeRefund`, `StripeInvoice`)
  - PayPal (`PayPalPayment`, `PayPalRefund`, `PayPalInvoice`)
- Abstract factory: `PaymentProviderFactory`
- Client: `CheckoutService`

Run:

- `npm run example:payment`

## 2) Notification Channel (`notification_channel.ts`)

- Abstract products: `Sender`, `Template`, `Validator`
- Concrete families:
  - Email (`EmailSender`, `EmailTemplate`, `EmailValidator`)
  - SMS (`SmsSender`, `SmsTemplate`, `SmsValidator`)
- Abstract factory: `NotificationFactory`
- Client: `NotificationService`

Run:

- `npm run example:notification`

## Workflow

1. The client chooses the desired family (for example Email or SMS)
2. It gets the corresponding concrete factory
3. It asks the factory to create the required products
4. It uses products only through abstract interfaces

## Diagram

![Abstract Factory Structure](./doc/structure-2x.png)

## Advantages

- Clear separation between business logic and object creation
- Easy provider-family replacement with minimal code changes
- Easier client testing via interface-based mocking

## Tradeoffs

- Increases number of interfaces/classes
- Can be over-engineering for very small/simple projects

## Extension Note

To add a new provider family, usually you only need to:

1. Create concrete products for each abstract product interface
2. Create a concrete factory implementing the same abstract factory interface
3. Select that factory from one composition/configuration point
