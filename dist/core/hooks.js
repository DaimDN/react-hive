"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useActions = useActions;
exports.useNova = useNova;
exports.usePartial = usePartial;
exports.useSelector = useSelector;
var _react = require("react");
var _provider = require("./provider");
// src/core/hooks.ts

function useNova() {
  const context = (0, _react.useContext)(_provider.NovaContext);
  if (!context) {
    throw new Error("useNova must be used within a NovaProvider");
  }
  return context;
}
function usePartial(partialName) {
  const {
    state,
    dispatch
  } = useNova();
  if (!(partialName in state)) {
    throw new Error("Partial \"".concat(partialName, "\" not found in store"));
  }
  return [state[partialName], dispatch];
}
function useSelector(selector) {
  let equalityFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.is;
  const {
    state
  } = useNova();
  return (0, _react.useMemo)(() => selector(state), [selector, state]);
}
function useActions(actions) {
  const {
    dispatch
  } = useNova();
  return (0, _react.useMemo)(() => {
    if (Array.isArray(actions)) {
      return actions.map(action => function () {
        return dispatch(action(...arguments));
      });
    }
    return Object.keys(actions).reduce((bound, key) => {
      const action = actions[key];
      bound[key] = function () {
        return dispatch(action(...arguments));
      };
      return bound;
    }, {});
  }, [actions, dispatch]);
}