"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPartial = createPartial;
// src/createPartial.ts

function createPartial(config) {
  const {
    name,
    initialState,
    reducers,
    selectors = {}
  } = config;
  const actionCreators = {};
  const reducerMap = {};

  // Create action creators and reducers
  Object.entries(reducers).forEach(_ref => {
    let [key, reducer] = _ref;
    const type = "".concat(name, "/").concat(key);
    actionCreators[key] = payload => ({
      type,
      payload
    });
    reducerMap[type] = reducer;
  });

  // Create the main reducer
  const reducer = function () {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    let action = arguments.length > 1 ? arguments[1] : undefined;
    const handler = reducerMap[action.type];
    return handler ? handler(state, action) : state;
  };
  return {
    name,
    reducer,
    actions: actionCreators,
    selectors
  };
}