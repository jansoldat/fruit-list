# Fruit List

## Table of Contents

- [Getting Started](#getting-started)
- [Testing](#testing)
- [Preparing for Deployment](#preparing-for-deployment)
- [Installed Packages](#installed-packages)

## Installing dependencies

```
yarn install
```

And running the setup script (initializes git repository and installs playwright)

```
yarn run setup
```

#### Add new icon

These icons were downloaded from https://icons.radix-ui.com/ which is licensed
under MIT: https://github.com/radix-ui/icons/blob/master/LICENSE.

> [!WARNING] It's important that you only add icons to this directory that the
> application actually needs as there's no "tree-shaking" for sprites

##### Add new icon

```sh
yarn sly add
```

##### Update sprite

```sh
yarn icons:build
```

## Getting Started

Unit testing is handled by React Testing Library and Vitest while End-to-End (E2E) Testing is conducted by Playwright.

If you'd like to run all tests, Unit and E2E alike, execute the following command:

```
yarn run test
```

### Unit Testing

If you'd like to execute unit tests specifically, the below command will execute vitest:

```
yarn run test:unit
```

If instead you are interested in coverage reporting, run:

```
yarn run test:unit:coverage
```

### End-to-End (E2E) Testing

Running E2E tests use a similar syntax to running unit tests:

```
yarn run test:e2e
```

If you wish to see the reports, run:

```
yarn run test:e2e:report
```

## Preparing for Deployment

```
yarn run build
```

and pointing your web server to the generated `index.html` file found at `dist/index.html`

## Installed Packages

### Base

- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [React](https://react.dev)

### Routing

- [TanStack Router](https://tanstack.com/router/v1)

### Linting & Formatting

- [ESLint](https://eslint.org)
  - [typescript-eslint](https://typescript-eslint.io)
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#readme)
  - [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react#readme)
  - [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
  - [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh)
  - [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn#readme)
  - [eslint-plugin-storybook](https://github.com/storybookjs/eslint-plugin-storybook#readme)
- [Prettier](https://prettier.io)

### State Management

- [TanStack Query (React Query)](https://tanstack.com/query/latest)

### UI

- [Tailwind CSS](https://tailwindcss.com)

### Testing

- [Vitest](https://vitest.dev)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev)

### Other

- [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)
- [i18next](https://www.i18next.com/)
- [react-i18next](https://react.i18next.com/)
- [ts-reset](https://github.com/total-typescript/ts-reset#readme)
