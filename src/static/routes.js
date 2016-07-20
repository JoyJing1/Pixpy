import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomeView, LoginView, ProtectedView, NotFoundView, AlbumView, AlbumDetailView } from './containers';
import { requireAuthentication } from './utils/requireAuthentication';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="login" component={LoginView}/>
        <Route path="protected" component={requireAuthentication(ProtectedView)}/>
        <Route path="albums" component={requireAuthentication(AlbumView)}/>
        <Route path="albums/:id" component={requireAuthentication(AlbumDetailView)}/>
        <Route path="*" component={NotFoundView}/>
    </Route>
);
