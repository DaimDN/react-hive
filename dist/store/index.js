"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = void 0;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// src/store/index.ts

class Store {
  constructor(reducer, initialState) {
    let _middleware = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    _defineProperty(this, "middleware", []);
    _defineProperty(this, "listeners", new Set());
    _defineProperty(this, "dispatch", action => {
      let dispatchFunction = action => {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach(listener => listener());
        return action;
      };

      // Apply middleware
      if (this.middleware.length > 0) {
        const middlewareAPI = {
          getState: this.getState.bind(this),
          dispatch: action => dispatchFunction(action)
        };
        const chain = this.middleware.map(middleware => middleware(middlewareAPI));
        dispatchFunction = chain.reduce((a, b) => action => b(a))(dispatchFunction);
      }
      return dispatchFunction(action);
    });
    this.state = initialState;
    this.reducer = reducer;
    this.middleware = _middleware;
  }
  getState() {
    return this.state;
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
exports.Store = Store;