import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { DATA_FETCH_PHOTOS_REQUEST, DATA_RECEIVE_PHOTOS, DATA_CREATE_PHOTO_REQUEST, DATA_RECEIVE_SINGLE_PHOTO } from '../constants';
import { authLoginUserFailure } from './auth';


export function dataReceivePhotos(data) {
  // console.log("static/actions/photo.js dataReceivePhotos(data)");
  return {
    type: DATA_RECEIVE_PHOTOS,
    payload: {
      photos: data.photos,
      curr_album: data.curr_album
    }
  };
}

export function dataFetchPhotosRequest() {
  // console.log("static/actions/photo.js dataFetchPhotosRequest()");
  return {
    type: DATA_FETCH_PHOTOS_REQUEST
  };
}

export function dataFetchPhotos(token, albumId) {
  // console.log("static/actions/photo.js dataFetchPhotos()");

  return (dispatch, state) => {
    // console.log('about to run dispatch(dataFetchPhotosRequest()); in static/actions/photo.js');

    dispatch(dataFetchPhotosRequest());
    return fetch(`${SERVER_URL}/api/v1/getalbums/${albumId}/`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`
      },
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      // console.log("response within static/actions/photo.js");
      dispatch(dataReceivePhotos(response));
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(authLoginUserFailure(error));
        dispatch(push('/login'));
      }
    });
  };
}

export function dataReceiveSinglePhoto(data) {
  // console.log("static/actions/photo.js dataReceiveSinglePhoto(data)");
  return {
    type: DATA_RECEIVE_SINGLE_PHOTO,
    payload: {
      photo: data.photo
    }
  };
}

export function dataCreatePhotoRequest() {
  return {
    type: DATA_CREATE_PHOTO_REQUEST
  };
}

export function dataCreatePhoto(token, photo) {

  return (dispatch, state) => {
    dispatch(dataCreatePhotoRequest());
    return fetch(`${SERVER_URL}/api/v1/getalbums/${photo.album_id}/createphoto/`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(photo),
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`
      },
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      dispatch(dataReceiveSinglePhoto(response));
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(authLoginUserFailure(error));
        dispatch(push('/login'));
      }
    });
  };
}
