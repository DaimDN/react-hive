"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAction = createAction;
exports.createReducer = createReducer;
function createAction(type) {
  const actionCreator = payload => ({
    type,
    payload
  });
  actionCreator.type = type;
  return actionCreator;
}
function createReducer(initialState, handlers) {
  return function () {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    let action = arguments.length > 1 ? arguments[1] : undefined;
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action.payload);
    }
    return state;
  };
}