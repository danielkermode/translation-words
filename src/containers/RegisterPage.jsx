import React, {Component} from 'react';
import {Map} from 'immutable';

//components
import RegisterForm from '../components/RegisterForm'

// redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as serverActions from '../redux/reducers/server'

/* create container as stateless function to indicate pure component */
export class RegisterPage extends Component {

  render() {
    console.log(this.props.server.serverError)
    return (
      <div>
        <RegisterForm actions={this.props.actions} serverError={this.props.server.serverError} />
        <hr/>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  		//as in app container, don't use ...state when we use react-redux-router as we never want all the state.
      server: state.server,
      form: state.form.registerForm
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

export const RegisterPageContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterPage)