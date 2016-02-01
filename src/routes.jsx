import React     from 'react';
import { Route } from 'react-router';
//containers
import {AppContainer} from './containers/App'
import {HomePageContainer} from './containers/HomePage'
import {LoginPageContainer} from './containers/LoginPage'
import {ProfilePageContainer} from './containers/ProfilePage'
import {RegisterPageContainer} from './containers/RegisterPage'
import {TranslatePageContainer} from './containers/TranslatePage'
import {DictionaryPageContainer} from './containers/DictionaryPage'

export default (
  <Route path="/" component={AppContainer}>
    <Route path="/home" component={HomePageContainer} />
    <Route path="/login" component={LoginPageContainer} />
    <Route path="/register" component={RegisterPageContainer} />
    <Route path="/profile" component={ProfilePageContainer} />
    <Route path="/translate" component={TranslatePageContainer} />
	<Route path="/dictionary" component={DictionaryPageContainer} />
  </Route>
);



		  