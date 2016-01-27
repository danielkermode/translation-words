import React, {Component} from 'react';
import {Map} from 'immutable';

//components
import LoginForm from '../components/LoginForm'

// redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as serverActions from '../redux/reducers/server'

/* create container as stateless function to indicate pure component */
export class LoginPage extends Component {

	render() {
		return (
			<LoginForm actions={this.props.actions} serverError={this.props.server.serverError} />
		);
	}
}

/* NOTE: Add <DevTools /> in before the last div to debug with Redux Devtools */

function mapStateToProps(state) {
  return {
  		//as in app container, don't use ...state when we use react-redux-router as we never want all the state.
      server: state.server
  };
}

//actions are array for mapDispatchToProps
const actions = [serverActions];

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage)