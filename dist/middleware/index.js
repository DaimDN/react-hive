"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;
// src/middleware/logger.ts

const logger = _ref => {
  let {
    getState
  } = _ref;
  return next => action => {
    console.group(action.type);
    console.log("prev state", getState());
    console.log("action", action);
    const result = next(action);
    console.log("next state", getState());
    console.groupEnd();
    return result;
  };
};
/**
 * 
export const thunk: Middleware =
	(api: MiddlewareAPI) => (next) => (action: AnyAction) => {
		if (typeof action === "function") {
			return action(api.dispatch, api.getState);
		}
		return next(action);
	};

 */
exports.logger = logger;