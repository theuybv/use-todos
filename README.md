# Simplifying the React Redux Example Todo List App with custom use-todos hooks

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/test.svg)](https://www.npmjs.com/package/test) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @theuybv/use-todos
```

## Redux Store Provider on App level

```jsx
import React from "react";
import { render } from "react-dom";
import App from "./components/App";

import {TodosProvider} from "@theuybv/use-todos";

const Index = () => {

  return (
    <TodosProvider>
      {" "}
      <App />
    </TodosProvider>
  );
};

render(<Index />, document.getElementById("root"));

```

## Actions, Selectors and Constants
```jsx
import React from 'react';
import useTodos from "@theuybv/use-todos";
const SomeComp = () => {
  const {actions, selectors, VISIBILITY_FILTERS} = useSelectors();
  const {toggleTodo, addTodo, setVisibility} = actions; // similar to stateToProps
  const {todos, active} = selectors; // similar to dispatchToProps
  const {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} = VISIBILITY_FILTERS;


  return (
    <div>Do something with it!</div>
  )
}
```

## License

MIT © [theuybv](https://github.com/theuybv)
