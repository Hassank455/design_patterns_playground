# Factory Method Pattern

The `Factory Method` pattern defines an interface for creating an object, but lets subclasses decide which concrete product to instantiate.

In short: the base creator contains shared workflow/business logic, while each concrete creator chooses the specific product it needs.

## Core Idea

- You define a common product interface (for example: `Transport`, `Notification`, `Logger`, `Parser`)
- You define an abstract creator with a factory method
- Concrete creators override that method and return different concrete products
- The client works with the creator abstraction, not direct object construction

## When To Use It

- When object creation varies by context, type, or environment
- When you want to avoid direct `new` calls spread through business logic
- When creators share a common workflow but differ in the product they build

## 1) Transport (`transport.ts`)

- Product: `Transport`
- Concrete products:
  - `Truck`
  - `Ship`
  - `Airplane`
- Creator: `Logistics`
- Concrete creators:
  - `RoadLogistics`
  - `SeaLogistics`
  - `AirLogistics`

Run:

- `npm run example:factory-transport`

## 2) Notification (`notification.ts`)

- Product: `Notification`
- Concrete products:
  - `EmailNotification`
  - `SmsNotification`
  - `PushNotification`
- Creator: `NotificationCreator`
- Concrete creators:
  - `EmailNotificationCreator`
  - `SmsNotificationCreator`
  - `PushNotificationCreator`

Run:

- `npm run example:factory-notification`

## 3) Logger (`logger.ts`)

- Product: `Logger`
- Concrete products:
  - `ConsoleLogger`
  - `FileLogger`
  - `CloudLogger`
- Creator: `LoggerCreator`
- Concrete creators:
  - `ConsoleLoggerCreator`
  - `FileLoggerCreator`
  - `CloudLoggerCreator`

Run:

- `npm run example:factory-logger`

## 4) Parser (`parser.ts`)

- Product: `Parser`
- Concrete products:
  - `JsonParser`
  - `XmlParser`
  - `CsvParser`
- Creator: `ParserCreator`
- Concrete creators:
  - `JsonParserCreator`
  - `XmlParserCreator`
  - `CsvParserCreator`

Run:

- `npm run example:factory-parser`

## Workflow

1. The client works with an abstract creator
2. The creator runs shared logic around the operation
3. The creator calls the factory method to get the concrete product
4. The returned product performs the type-specific behavior

## Advantages

- Separates creation logic from business workflow
- Makes adding new product variants cleaner
- Reduces repetitive conditional creation logic
- Improves extensibility by relying on abstractions

## Tradeoffs

- Adds more classes compared to direct instantiation
- Can be unnecessary for very small/simple cases
- Too many creators may increase project complexity if not organized well

## Extension Note

To add a new Factory Method example, usually you only need to:

1. Define or reuse a product interface
2. Create a new concrete product implementing that interface
3. Extend the abstract creator and override the factory method
4. Use the new creator from the client/composition layer
