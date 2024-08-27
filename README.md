# Fruit List

This project, fruit-list, was developed by Jan Soldat as part of an interview
task for the company Finofo. The application is designed to display a list of
fruits, allowing users to interact with the data in various ways.

[Live app](https://jansoldat.github.io/fruit-list/) |
[Node.js server](https://github.com/jansoldat/fruit-list-api.git) |
[Data source](https://www.fruityvice.com/)

## Table of Contents

- [Key Features ](#key-features)
- [Deployment](#deployment)
- [Installing dependencies](#installing-dependencies)
- [Getting Started](#getting-started)

## Key Features

- **CORS Policy**: To bypass CORS policy restrictions, a Node.js server was
  created. You can find the server implementation here:
  [Node.js server](https://github.com/jansoldat/fruit-list-api.git)
- **State Management:** The application uses Zustand for efficient and simple
  state management.
- **Image Handling**: Cloudinary is used for lazy loading images to ensure
  faster load times and better performance.
- **Unit Testing**: The project includes comprehensive unit tests using Vitest
  and React Testing Library.
- **TypeScript**: TypeScript is used throughout the project for type safety and
  better developer experience.
- **Linting**: ESLint is integrated to maintain code quality and consistency.
- **Mocking Assets**: MSW (Mock Service Worker) is utilized to mock API
  responses and assets during development and testing.
- **CI/CD Pipeline**: A CI/CD pipeline has been implemented using GitHub Actions
  to automate testing and deployment processes.
- **End-to-End Testing**: Playwright is used for E2E testing. A basic E2E test
  has been implemented due to time constraints.
- **Data Fetching**: React Query is used for efficient data fetching and state
  synchronization with the backend.
- **Styling**: Tailwind CSS is used for styling, providing a clean and
  responsive design.
- **Localization & Theming**: The solution is ready for multiple languages and
  themes, ensuring a versatile and user-friendly experience.

## Deployment

The project is hosted on GitHub Pages and can be accessed at:
[Live app](https://jansoldat.github.io/fruit-list/)

## Installing dependencies

```
pnpm install
```

And running the setup script (initializes git repository and installs
playwright)

```
pnpm run setup
```

#### Add new icon

These icons were downloaded from https://icons.radix-ui.com/ which is licensed
under MIT: https://github.com/radix-ui/icons/blob/master/LICENSE.

> It's important that you only add icons to this directory that the application
> actually needs as there's no "tree-shaking" for sprites

##### Add new icon

```sh
pnpm sly add
```

##### Update sprite

```sh
pnpm icons:build
```

## Getting Started

### Linting and Typecheck

```
pnpm run lint
pnpm run ts
pnpm run ts:watch # Run typecheck in watch mode
```

Unit testing is handled by React Testing Library and Vitest while End-to-End
(E2E) Testing is conducted by Playwright.

If you'd like to run all tests, Unit and E2E alike, execute the following
command:

```
pnpm run test
```

### Unit Testing

If you'd like to execute unit tests specifically, the below command will execute
vitest:

```
pnpm run test:unit
```

If instead you are interested in coverage reporting, run:

```
pnpm run test:unit:coverage
```

### End-to-End (E2E) Testing

Running E2E tests use a similar syntax to running unit tests:

```
pnpm run test:e2e
```

If you wish to see the reports, run:

```
pnpm run test:e2e:report
```

If you want to see the UI, run:

```
pnpm run test:e2e:dev
```

## Preparing for Deployment

```
pnpm run build
```

and pointing your web server to the generated `index.html` file found at
`dist/index.html`
