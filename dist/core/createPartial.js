"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPartial = createPartial;
var _index = require("../util/index");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function createPartial(name, initialState) {
  let reducers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let extraReducers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const actionTypes = {};
  const actions = {};

  // Generate action creators and types
  Object.keys(reducers).forEach(type => {
    const actionType = "".concat(name, "/").concat(String(type));
    actionTypes[type] = actionType;
    actions[String(type)] = (0, _index.createAction)(actionType);
  });

  // Create the reducer
  const reducer = (0, _index.createReducer)(initialState, _objectSpread(_objectSpread({}, Object.keys(reducers).reduce((acc, type) => _objectSpread(_objectSpread({}, acc), {}, {
    [actionTypes[type]]: reducers[type]
  }), {})), extraReducers));
  return {
    name,
    reducer,
    actions,
    actionTypes
  };
}