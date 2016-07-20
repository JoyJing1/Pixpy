import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { DATA_FETCH_ALBUMS, DATA_RECEIVE_ALBUMS } from '../constants';
import { authLoginUserFailure } from './auth';


export function dataReceiveAlbums(albums) {
    return {
        type: DATA_RECEIVE_ALBUMS,
        payload: {
            albums
        }
    };
}

export function dataFetchAlbumsRequest() {
    return {
        type: DATA_FETCH_ALBUMS
    };
}

export function dataFetchAlbums(token) {
    return (dispatch, state) => {
        dispatch(dataFetchAlbumsRequest());
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
