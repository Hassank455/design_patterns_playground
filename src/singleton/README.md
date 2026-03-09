# Singleton Pattern

`Singleton` is a creational design pattern that ensures a class has only one instance during the application's lifetime, while providing a global access point to that instance.

In this project, the pattern is implemented with 3 examples:

- `Logger` to centralize logging
- `Database` to avoid creating multiple database clients/connections
- `AppConfig` to keep shared app settings in one place

## Quick Definition

- Prevent direct construction from outside the class using a `private constructor`
- Store a single static instance inside the class (`static instance`)
- Expose a method like `getInstance()` that always returns the same object

## Brief Overview

Core idea: instead of each part of the system creating a new object, all parts use one shared instance.  
This is especially useful for expensive resources or components that should stay consistent, such as a database client or application configuration.

## Singleton Benefits

- Reduces resource usage by reusing a single object
- Maintains a single source of truth for shared services
- Makes shared objects easy to access without passing dependencies everywhere
- Fits components that logically should exist only once in an app

## Why Many Developers Do Not Recommend It by Default

- It introduces global state, which makes changes harder to track
- It can reduce testability because state is shared across tests
- It can increase tight coupling between parts of the system
- It can hide dependency design issues compared to Dependency Injection
- In parallel environments (threads/workers), implementation may require extra care

## When To Use It

- When you truly need exactly one instance during runtime
- When object creation is expensive and reuse matters
- When a centralized shared service is clearly needed (for example, Config or Logger)

## Project Example (`test.ts`)

The file [test.ts](./test.ts) demonstrates that:

- `Logger.getInstance()` returns the same object
- `Database.getInstance()` returns the same object
- `AppConfig.getInstance()` provides shared settings through one instance

## Run

1. Install dependencies:
   - `npm install`
2. Build:
   - `npm run build`
3. Run the Singleton example:
   - `npm run example:singleton`
