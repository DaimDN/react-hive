"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combinePartials = combinePartials;
// src/core/combinePartials.ts

function combinePartials(partials) {
  const initialState = {};
  const reducers = {};
  partials.forEach(partial => {
    // Initialize with undefined state to get initial state from reducer
    initialState[partial.name] = partial.reducer(undefined, {
      type: "@@INIT"
    });
    reducers[partial.name] = partial.reducer;
  });
  const rootReducer = function () {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    let action = arguments.length > 1 ? arguments[1] : undefined;
    let hasChanged = false;
    const nextState = {};
    Object.keys(reducers).forEach(key => {
      const prevStateForKey = state[key];
      // Here we know the state exists because we're using the initialState as default
      nextState[key] = reducers[key](prevStateForKey, action);
      hasChanged = hasChanged || nextState[key] !== prevStateForKey;
    });
    return hasChanged ? nextState : state;
  };
  return {
    initialState,
    reducer: rootReducer
  };
}