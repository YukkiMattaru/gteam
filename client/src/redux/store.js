import {combineReducers, compose, createStore} from "redux";
import {registerThunk} from "./registerReducer";
import {reducer as formReducer} from 'redux-form';
import {applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import countersReducer from "./countersReducer";
import certificatesReducer from "./certificatesReducer";
import tradeareaReducer from "./tradeareaReducer";


let reducers = combineReducers({
    register: registerThunk,
    auth: authReducer,
    app: appReducer,
    counters: countersReducer,
    certificates: certificatesReducer,
    tradearea: tradeareaReducer,
    form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;