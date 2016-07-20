import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import albumsReducer from './albums';
import photosReducer from './photos';

export default combineReducers({
    auth: authReducer,
    albums: albumsReducer,
    photos: photosReducer,
    data: dataReducer,
    routing: routerReducer
});
