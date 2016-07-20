import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import albumsReducer from './albums';

export default combineReducers({
    auth: authReducer,
    albums: albumsReducer,
    data: dataReducer,
    routing: routerReducer
});
