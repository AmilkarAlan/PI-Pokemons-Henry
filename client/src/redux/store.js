import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import {thunk as thunkMiddleware} from "redux-thunk"


const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhacer(applyMiddleware(thunkMiddleware))
);



export default store