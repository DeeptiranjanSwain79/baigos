import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import {
    profileReducer,
    userDetailsReducer,
    userReducer
} from "./reducers/userReducer"

const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    userDetails: userDetailsReducer,
});

const middleware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;