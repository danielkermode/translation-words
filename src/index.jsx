require("../node_modules/bootstrap/dist/css/bootstrap.min.css")
//containers

// import {LoginPageContainer} from './containers/LoginPage'
// import {ProfilePageContainer} from './containers/ProfilePage'
// import {RegisterPageContainer} from './containers/RegisterPage'
// import {TranslatePageContainer} from './containers/TranslatePage'
// import {DictionaryPageContainer} from './containers/DictionaryPage'
import React from 'react';
import ReactDOM from 'react-dom'
import { Router, Link } from 'react-router'

import { browserHistory } from 'react-router'
import routes from './routes'
import { createHistory } from "history";
import { syncReduxAndRouter } from 'redux-simple-router';

/* REDUX */
import {Provider} from 'react-redux'

import configureStore from './redux/store'

const store = configureStore(window.__INITIAL_STATE__);
delete window.__INITIAL_STATE__;
const history = createHistory();
syncReduxAndRouter(history, store);

/**
 * Fire-up React Router.
 */
const reactRoot = window.document.getElementById("app");

ReactDOM.render(
	<Provider store={store}>
		<Router routes={routes} history={browserHistory}>
		</Router>
	</Provider>,
	reactRoot
);

      // <Route path="/" component={AppContainer}>
      //   <Route path="/home" component={HomePageContainer} />
      //   <Route path="/login" component={LoginPageContainer} />
      //   <Route path="/register" component={RegisterPageContainer} />
      //   <Route path="/profile" component={ProfilePageContainer} />
      //   <Route path="/translate" component={TranslatePageContainer} />
      //   <Route path="/dictionary" component={DictionaryPageContainer} />
      // </Route>