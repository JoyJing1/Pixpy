import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { DATA_FETCH_PROTECTED_DATA_REQUEST, DATA_RECEIVE_PROTECTED_DATA, DATA_FETCH_ALBUMS_REQUEST, DATA_RECEIVE_ALBUMS } from '../constants';
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
    console.log("static/actions/data.js dataReceiveAlbums(data)");
    console.log(data);
    return {
        type: DATA_RECEIVE_ALBUMS,
        payload: {
            data
        }
    };
}

export function dataFetchAlbumsRequest() {
    console.log("static/actions/data.js dataFetchAlbumsRequest()");
    return {
        type: DATA_FETCH_ALBUMS_REQUEST
    };
}

export function dataFetchProtectedData(token) {
    console.log('actions/data.js token:');
    console.log(token);
    return (dispatch, state) => {
        console.log('about to run dispatch(dataFetchProtectedDataRequest()); in dataFetchProtectedData');
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
    // dispatch(dataFetchAlbumsRequest());
    // return fetch(`${SERVER_URL}/api/v1/getalbums/`, {
    //     credentials: 'include',
    //     headers: {
    //         Accept: 'application/json'
    //     }
    // })



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
