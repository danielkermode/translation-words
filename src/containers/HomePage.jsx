import React, {Component} from 'react';
import {Map} from 'immutable';
import { LinkContainer } from 'react-router-bootstrap';

// redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as serverActions from '../redux/reducers/server'

/* create container as stateless function to indicate pure component */
export class HomePage extends Component {

  logout = () => {
    this.props.actions.resetStatus();
    this.props.actions.resetError();
    this.props.actions.logout(); 
  };

	render() {
		return (
			<div> Hi, welcome to your personal dictionary. 
      <br/>    
        {!this.props.user?
        <div>
          <LinkContainer to="/register">
          <button className="btn btn-primary"> Register </button>
        </LinkContainer>
        &nbsp;&nbsp; or &nbsp;&nbsp;
        <LinkContainer to="/login">
          <button className="btn btn-primary"> Login </button>
        </LinkContainer>
        </div> :
        <button onClick={this.logout}className="btn btn-primary"> Logout </button>
      }
      </div>
		);
	}
}

function mapStateToProps(state) {
  return {
      //as in app container, don't use ...state when we use react-redux-router as we never want all the state.
      user: state.server.user
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

export const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage)