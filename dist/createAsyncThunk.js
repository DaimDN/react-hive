"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAsyncThunk = createAsyncThunk;
// src/createAsyncThunk.ts

function createAsyncThunk(type, payloadCreator) {
  return payload => async (dispatch, getState) => {
    try {
      dispatch({
        type: "".concat(type, "/pending"),
        payload
      });
      const result = await payloadCreator(payload);
      dispatch({
        type: "".concat(type, "/fulfilled"),
        payload: result
      });
      return result;
    } catch (error) {
      dispatch({
        type: "".concat(type, "/rejected"),
        error: true,
        payload: error
      });
      throw error;
    }
  };
}