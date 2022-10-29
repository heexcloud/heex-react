# Heex React

## Getting Started

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
