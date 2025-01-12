"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thunkMiddleware = exports.loggerMiddleware = void 0;
// src/middleware.ts

// Thunk middleware to support async actions
const thunkMiddleware = _ref => {
  let {
    dispatch,
    getState
  } = _ref;
  return next => action => {
    if (typeof action === "function") {
      // If the action is a function, invoke it with dispatch and getState
      return action(dispatch, getState);
    }
    // Otherwise, pass the action to the next middleware/reducer
    return next(action);
  };
};

// Logger middleware to log every action and the next state
exports.thunkMiddleware = thunkMiddleware;
const loggerMiddleware = _ref2 => {
  let {
    getState
  } = _ref2;
  return next => action => {
    console.log("Dispatching:", action);
    const result = next(action);
    console.log("Next State:", getState());
    return result;
  };
};
exports.loggerMiddleware = loggerMiddleware;