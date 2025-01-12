"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoreProvider = void 0;
exports.useDispatch = useDispatch;
exports.useSelector = useSelector;
exports.useStore = useStore;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const StoreContext = /*#__PURE__*/(0, _react.createContext)(null);
const StoreProvider = _ref => {
  let {
    store,
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(StoreContext.Provider, {
    value: store
  }, children);
};
exports.StoreProvider = StoreProvider;
function useStore() {
  const store = (0, _react.useContext)(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return store;
}
function useDispatch() {
  const store = useStore();
  return (0, _react.useCallback)(store.dispatch, [store]);
}
function useSelector(selector) {
  const store = (0, _react.useContext)(StoreContext);
  if (!store) {
    throw new Error("useSelector must be used within a StoreProvider");
  }
  return selector(store.getState());
}