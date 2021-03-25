import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';

import user from "./user/user.reducer";

const rootReducer = combineReducers({
    user,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
