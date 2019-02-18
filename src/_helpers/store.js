import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import _reducers from "../_reducers";

const mdl = compose(
  applyMiddleware(reduxThunk),
  composeWithDevTools()
);

export const store = createStore(_reducers, mdl);
