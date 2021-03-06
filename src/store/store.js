import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import {routerReducer} from "react-router-redux";
import user from '../reducers/userReducer';
import devices from '../reducers/devicesReducer';
import reduxReset from 'redux-reset'


const rootReducer = combineReducers({
    user,
    devices,
    routing: routerReducer

});

const initialState = {};

export default function configureStore() {
    let store;

    if (module.hot) {
        store = createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(thunkMiddleware, logger,),
                reduxReset(),
                window.devToolsExtension ? window.devToolsExtension() : f => f
            )
        );
    } else {
        store = createStore(
            rootReducer,
            initialState,
            compose(applyMiddleware(thunkMiddleware), reduxReset(), f => f),

        );
    }

    return store;
}