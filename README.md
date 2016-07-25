# Pixpy

[Pixpy live][live]

[live]: http://www.pixpy.tech/

Pixpy is a full-stack photo-sharing web application. It utilizes Django on the backend, a PostgreSQL database, and React.js with a Redux architectural framework on the frontend.

The project began with a [boilerplate project][boilerplate] used for all Seedstars Labs applications. We build on the shoulders of giants with the following technologies:

[boilerplate]: https://github.com/Seedstars/django-react-redux-jwt-base

**Frontend**

* [React](https://github.com/facebook/react)
* [React Router](https://github.com/rackt/react-router)
* [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) JSON Web Token for API authentication
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Redux](https://github.com/rackt/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* [Redux Dev Tools](https://github.com/rackt/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs)
* [Redux Thunk](https://github.com/gaearon/redux-thunk) Thunk middleware for Redux - used in async actions
* [React Router Redux](https://github.com/rackt/react-router-redux) Ruthlessly simple bindings to keep react-router and redux in sync
* [fetch](https://github.com/github/fetch) A window.fetch JavaScript polyfill
* [style-loader](https://github.com/webpack/style-loader), [sass-loader](https://github.com/jtangelder/sass-loader) and [less-loader](https://github.com/webpack/less-loader) to allow import of stylesheets in plain css, sass and less,
* [font-awesome-webpack](https://github.com/gowravshekar/font-awesome-webpack) to customize FontAwesome
* [foundation-sites](https://github.com/zurb/foundation-sites) for the grid
* [ESLint](http://eslint.org), [Airbnb Javascript/React Styleguide](https://github.com/airbnb/javascript), [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css) to maintain a consistent code style and [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) to make sure all imports are correct
* [mocha](https://mochajs.org/) to allow writing unit tests for the project
* [Enzyme](http://airbnb.io/enzyme/) JavaScript Testing utilities for React
* [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store) a mock store for your testing your redux async action creators and middleware
* [expect](https://github.com/mjackson/expect) Write better assertions
* [Nock](https://github.com/pgte/nock) HTTP mocking and expectations library
* [istanbul](https://github.com/gotwarlost/istanbul) to generate coverage when running mocha

**Backend**

* [Django](https://www.djangoproject.com/)
* [Django REST framework](http://www.django-rest-framework.org/) Django REST framework is a powerful and flexible toolkit for building Web APIs
* [Django REST framework JSON Web Token](http://getblimp.github.io/django-rest-framework-jwt/) JSON Web Token Authentication support for Django REST Framework
* [WhiteNoise](http://whitenoise.evans.io/en/latest/django.html) to serve files efficiently from Django
* [Prospector](http://prospector.landscape.io/en/master/) a complete Python static analysis tool
* [Bandit](https://github.com/openstack/bandit) a security linter from OpenStack Security
* [pytest](http://pytest.org/latest/) a mature full-featured Python testing tool
* [Mock](http://www.voidspace.org.uk/python/mock/) mocking and testing Library
* [Responses](https://github.com/getsentry/responses) a utility for mocking out the Python Requests library

## Features & Implementation

### Single-Page App

Pixpy is a single-page app; all content is delivered on one static page. Sensitive information is kept out of the frontend of the app. The UI is designed to be elegant and intuitive with a straightforward layout.

### Albums

Users can see and create photo `Album`s from the `AlbumView` page.

<img src="./screenshots/new-album.png"/ width=400>

New albums show a default "empty album" cover photo. The first photo uploaded to an album is automatically set as the new album cover photo on the backend.

<img src="./screenshots/album-view.png"/ width=400>

When a new album is created, the user is immediately directed to the `AlbumDetailView` where they can upload photos to the album. All albums belong to a user via `user_id`. Only the user who initially created an album can upload photos to that album.

<img src="./screenshots/album-detail.png"/ width=400>

### Photos

Users can see and add `Photo`s from the `AlbumDetailView`. Photos are hosted on Cloudinary, and hold a foreign key to the `album_id` they belong to. When a photo is uploaded, a modal pops up displaying the photo and asks for an optional `caption`. Focus is automatically placed on the caption input field, which can be submitted either using the Enter key or by clicking the return button.

<img src="./screenshots/add-caption.png"/ width=400>

From the `AlbumDetailView`, when a user clicks on a photo, it opens in a modal displaying both the image and caption. Clicking anywhere off of the modal closes the modal.

<img src="./screenshots/photo-detail.png"/ width=400>

Users can browse and view all albums and photos, but can only add photos to their albums. This restriction is reinforced both on the frontend (the button is not displayed) as well as the backend (the photo will not be saved if the current user is not the creator of the album).

### User Authentication

<img src="./screenshots/login.png"/ width=400>
