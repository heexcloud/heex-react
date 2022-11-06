# Heex React

## Getting Started

[![](https://img.shields.io/npm/dw/@heex/react?label=NPM%20downloads&style=flat-square)](https://www.npmjs.com/package/@heex/react)

#### Installation

```sh
// install via npm
npm install @heex/react

// or install via yarn
yarn add @heex/react

```

#### Usage

```javascript
// import into project
import { Heex } from "@heex/react";
import "@heex/react/index.css";

// render it
<Heex
  options={{
    apiBaseUrl: "your-api-server-url",
    clientName: "your-client-name", // any random name
    clientId: "your-client-id", //  any randon string
  }}
/>;
```
