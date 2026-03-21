# Design Patterns Playground (TypeScript)

This project is a personal reference for learning and documenting design patterns through practical TypeScript examples.
It is designed to be expandable, with new patterns added over time.

## Project Goals

- Understand the core idea behind each pattern
- Implement each pattern with clean, practical code
- Keep a quick reference that is easy to revisit later

## Project Structure

- `src/` contains pattern examples
- `dist/` contains compiled JavaScript output

## Current Patterns

- Abstract Factory  
  Details: `src/abstract-factory/README.md`
- Factory Method  
  Details: `src/factory_method/README.md`
- Singleton  
  Details: `src/singleton/README.md`
- Adapter  
  Details: `src/adapter/README.md`
- Facade  
  Details: `src/facade/README.md`

## Run

1. Install dependencies:
   - `npm install`
2. Build:
   - `npm run build`
3. Run the current smoke checks:
   - `npm run check`

## Individual Examples

- `npm run example:payment`
- `npm run example:notification`
- `npm run example:singleton`
- `npm run example:factory-transport`
- `npm run example:factory-notification`
- `npm run example:factory-logger`
- `npm run example:factory-parser`
- `npm run example:adapter-payment`
- `npm run example:adapter-logger`
- `npm run example:adapter-xml-json`
- `npm run example:facade-home-theater`
- `npm run example:facade-checkout`
- `npm run example:facade-smart-home`

## Notes

- For each new pattern, create a dedicated folder in `src/` with an internal `README` that explains both concept and implementation.
