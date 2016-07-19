import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { DATA_FETCH_PROTECTED_DATA_REQUEST, DATA_RECEIVE_PROTECTED_DATA } from '../constants';
import { authLoginUserFailure } from './auth';


export function dataReceiveProtectedData(data) {
    return {
        type: DATA_RECEIVE_PROTECTED_DATA,
        payload: {
            data
        }
    };
}

export function dataFetchProtectedDataRequest() {
    return {
        type: DATA_FETCH_PROTECTED_DATA_REQUEST
    };
}

export function dataReceiveAlbums(data) {
    return {
        type: DATA_RECEIVE_ALBUMS,
        payload: {
            data
        }
    };
}

export function dataFetchAlbumsRequest() {
    return {
        type: DATA_FETCH_ALBUMS
    };
}

export function dataFetchProtectedData(token) {
    console.log('actions/data.js token:');
    console.log(token);
    return (dispatch, state) => {
        dispatch(dataFetchProtectedDataRequest());
        return fetch(`${SERVER_URL}/api/v1/getdata/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `JWT ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(dataReceiveProtectedData(response.data));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(authLoginUserFailure(error));
                    dispatch(push('/login'));
                }
            });
    };
}

// Check that this works
// Authorization: `JWT ${token}`
export function dataFetchAlbums() {
    console.log("static/actions/data.js dataFetchAlbums()");
    return (dispatch, state) => {
        console.log('about to run dispatch(dataFetchAlbumsRequest()); in static/actions/data.js');
        console.log(dispatch);
        console.log(state);

        dispatch(dataFetchAlbumsRequest());
        return fetch(`${SERVER_URL}/api/v1/getalbums/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(dataReceiveAlbums(response.albums));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(authLoginUserFailure(error));
                    dispatch(push('/login'));
                }
            });
    };
}
