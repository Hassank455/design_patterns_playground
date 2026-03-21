# Facade Pattern

The `Facade` pattern provides a simplified interface over a set of subsystems so the client can perform a complex workflow through one entry point.

In short: instead of forcing the client to coordinate many low-level services directly, the facade hides orchestration details behind a small, clear API.

## Core Idea

- You have multiple subsystem classes that handle specialized tasks
- The client does not need to know the exact call order between those classes
- A facade exposes a simpler interface for common use cases
- Complex workflow stays centralized in one place

## When To Use It

- When a feature requires coordinating several services in a fixed sequence
- When you want to reduce coupling between client code and subsystem details
- When the underlying API is noisy or too detailed for common scenarios

## 1) Home Theater (`home_theater_system.ts`)

- Subsystems:
  - `TV`
  - `SoundSystem`
  - `DvdPlayer`
  - `Lights`
- Facade: `HomeTheaterFacade`
- Client flow:
  - `watchMovie(movie)`
  - `endMovie()`

Run:

- `npm run example:facade-home-theater`

## 2) Checkout (`checkout.ts`)

- Subsystems:
  - `PaymentService`
  - `InvoiceService`
  - `NotificationService`
  - `FraudService`
- Facade: `CheckoutFacade`
- Client: `App`

Run:

- `npm run example:facade-checkout`

## 3) Smart Home (`smart_home_system.ts`)

- Subsystems:
  - `Lights`
  - `AirConditioner`
  - `SecurityCamera`
  - `SmartDoorLock`
- Facade: `SmartHomeFacade`
- Client flow:
  - `arriveHome()`
  - `nightMode()`
  - `leaveHome()`

Run:

- `npm run example:facade-smart-home`

## Workflow

1. The client talks only to the facade
2. The facade coordinates subsystem calls in the correct order
3. Subsystems stay focused on their own responsibilities
4. The client gets a simpler and more stable API

## Advantages

- Reduces client-side complexity
- Centralizes orchestration logic
- Makes common workflows easier to reuse
- Hides subsystem details from higher-level code

## Tradeoffs

- The facade can become too large if it absorbs too many unrelated flows
- It may hide useful subsystem capabilities if overused
- It simplifies access, but does not remove subsystem complexity internally

## Extension Note

To add a new Facade example, usually you only need to:

1. Identify a multi-step workflow that currently touches several classes
2. Keep subsystem classes focused on single responsibilities
3. Add a facade that exposes a small set of meaningful operations
4. Move orchestration logic from the client into the facade
