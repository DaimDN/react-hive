# React Nova

A lightweight, type-safe state management library for React applications, built
on top of React Context and inspired by Redux.

## Features

- 🎯 TypeScript-first approach
- 🔄 Redux-like pattern with simpler boilerplate
- 📦 Built on React Context API - no external dependencies
- 🚀 Modular state management using partials
- 🎨 Built-in middleware support
- 💡 Easy to understand and use

## Installation

```bash
npm install react-nova
# or
yarn add react-nova
```

## Quick Start

### 1. Create a Partial

```typescript
// partials/counterPartial.ts
import { createPartial } from "react-nova";

interface CounterState {
	count: number;
	loading: boolean;
}

const initialState: CounterState = {
	count: 0,
	loading: false,
};

export const counterPartial = createPartial("counter", initialState, {
	increment: (state) => ({
		...state,
		count: state.count + 1,
	}),
	decrement: (state) => ({
		...state,
		count: state.count - 1,
	}),
});
```

### 2. Create Store

```typescript
// store.ts
import { combinePartials } from "react-nova";
import { counterPartial } from "./partials/counterPartial";

export const store = combinePartials([counterPartial]);
```

### 3. Add Provider

```typescript
// App.tsx
import { NovaProvider } from 'react-nova';
import { store } from './store';

function App() {
  return (
    <NovaProvider store={store}>
      <YourComponents />
    </NovaProvider>
  );
}
```

### 4. Use in Components

```typescript
import { usePartial, useActions } from 'react-nova';
import { counterPartial } from '../partials/counterPartial';

function Counter() {
  const [state, dispatch] = usePartial<CounterState>('counter');
  const { increment, decrement } = useActions(counterPartial.actions);

  return (
    <div>
      <h2>Count: {state.count}</h2>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => decrement()}>-</button>
    </div>
  );
}
```

## Core Concepts

### Partials

Similar to Redux slices, partials are the building blocks of your state
management. Each partial represents a slice of your state with its own actions
and reducers.

### Actions

Actions in React Nova are created automatically when you define your reducers in
the partial. They maintain type safety throughout your application.

### Hooks

- `usePartial`: Access state and dispatch for a specific partial
- `useActions`: Get bound action creators
- `useSelector`: Select specific data from state
- `useNova`: Access entire state and dispatch

## Advanced Usage

### Custom Middleware

```typescript
const logger = ({ getState }) => next => action => {
  console.log('prev state', getState());
  console.log('action', action);
  const result = next(action);
  console.log('next state', getState());
  return result;
};

// Use in provider
<NovaProvider store={store} middleware={[logger]}>
  <App />
</NovaProvider>
```

### Async Actions

```typescript
const fetchTodos = () => async (dispatch) => {
	dispatch(todoPartial.actions.setLoading(true));
	try {
		const response = await fetch("/api/todos");
		const todos = await response.json();
		dispatch(todoPartial.actions.setTodos(todos));
	} finally {
		dispatch(todoPartial.actions.setLoading(false));
	}
};
```

### Using Selectors

```typescript
const TodoCount = () => {
  const incompleteTodos = useSelector(state =>
    state.todos.items.filter(todo => !todo.completed)
  );

  return <div>Remaining: {incompleteTodos.length}</div>;
};
```

## Best Practices

1. **Type Everything**: Make use of TypeScript to ensure type safety across your
   application.
2. **Organize by Feature**: Group your partials by feature rather than by type.
3. **Keep Partials Small**: Each partial should manage a specific piece of
   functionality.
4. **Use Selectors**: For complex state derivations, use selectors to improve
   performance.

## Contributing

Contributions are welcome! Please read our contributing guidelines before
submitting PRs.

## License

MIT
