import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';

import user from "./user/user.reducer";
import app from "./app/app.reducer";

const rootReducer = combineReducers({
    app,
    user,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
