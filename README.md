````markdown
# react-hive

A powerful and lightweight state management library built for React, designed to
provide a centralized store, powerful selectors, async actions, and middleware
support for both large-scale and small-scale applications with simple and
complex state management requirements.

## Features

- **Centralized Store**: Manage your application's state in a single store.
- **Selectors**: Efficiently select pieces of state using selectors.
- **Dispatching Actions**: Dispatch actions to update the state and trigger side
  effects.
- **Middleware Support**: Extend functionality using custom middleware (e.g.,
  logging, async actions).
- **React Hooks**: Use React hooks to access the store, dispatch actions, and
  select state.

## Installation

Install the package via npm or yarn:

```bash
npm install react-hive
```
````

## Usage

### 1. Create a Store

To create a store, define a reducer, an initial state, and any middleware you
need.

```ts
import { Store } from "react-hive";

const initialState = { count: 0 };

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "increment":
			return { count: state.count + 1 };
		default:
			return state;
	}
};

const store = new Store(reducer, initialState);
```

### 2. Wrap Your Application with `StoreProvider`

The `StoreProvider` component should wrap your app to provide access to the
store.

```tsx
import React from "react";
import { StoreProvider } from "react-hive";
import { store } from "./store";

const App = () => (
	<StoreProvider store={store}>
		<YourAppComponents />
	</StoreProvider>
);
```

### 3. Using `useStore`, `useSelector`, and `useDispatch`

#### `useStore`

Access the entire store in any component:

```tsx
import { useStore } from "react-hive";

const MyComponent = () => {
	const store = useStore();
	console.log(store.getState());
	return <div>Current count: {store.getState().count}</div>;
};
```

#### `useSelector`

Select specific pieces of state:

```tsx
import { useSelector } from "react-hive";

const MyComponent = () => {
	const count = useSelector((state) => state.count);
	return <div>Current count: {count}</div>;
};
```

#### `useDispatch`

Dispatch actions to update the state:

```tsx
import { useDispatch } from "react-hive";

const MyComponent = () => {
	const dispatch = useDispatch();

	const increment = () => dispatch({ type: "increment" });

	return <button onClick={increment}>Increment</button>;
};
```

## Creating Async Thunks

You can create asynchronous actions using `createAsyncThunk`.

```ts
import { createAsyncThunk } from "react-hive";

const fetchData = createAsyncThunk("fetchData", async () => {
	const response = await fetch("/api/data");
	return response.json();
});
```

## Middleware

You can add middleware for logging, async actions, and more.

```ts
import { loggerMiddleware } from "react-hive";

const store = new Store(reducer, initialState, [loggerMiddleware]);
```

## Types

react-hive comes with fully typed definitions for the following:

- `Store`: The core store class.
- `Dispatch`: The dispatch function to send actions.
- `Selector`: A function to select a piece of state.
- `Middleware`: Functions to extend the store with custom logic.

## Example

Here's a complete example using the store, selectors, and dispatch:

```tsx
import React from "react";
import { StoreProvider, useStore, useSelector, useDispatch } from "react-hive";

const initialState = { count: 0 };

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "increment":
			return { count: state.count + 1 };
		default:
			return state;
	}
};

const store = new Store(reducer, initialState);

const Counter = () => {
	const count = useSelector((state) => state.count);
	const dispatch = useDispatch();

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={() => dispatch({ type: "increment" })}>Increment</button>
		</div>
	);
};

const App = () => (
	<StoreProvider store={store}>
		<Counter />
	</StoreProvider>
);

export default App;
```

## Contributing

1. Fork the repository.
2. Create your branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

MIT License. See the [LICENSE](LICENSE) file for more information.

```

This updated `README.md` now refers to your package name **react-hive** and includes the proper usage details. It maintains a clean structure and provides necessary information on how to integrate and use your state management library.
```
