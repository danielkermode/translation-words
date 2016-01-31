//require("../node_modules/bootstrap/dist/css/bootstrap.min.css")
import React, {Component} from 'react';
import {Map} from 'immutable';

//containers
import {HomePageContainer} from './containers/HomePage'
// import {LoginPageContainer} from './containers/LoginPage'
// import {ProfilePageContainer} from './containers/ProfilePage'
// import {RegisterPageContainer} from './containers/RegisterPage'
// import {TranslatePageContainer} from './containers/TranslatePage'
// import {DictionaryPageContainer} from './containers/DictionaryPage'

import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import {Nav, NavItem, Navbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

/* REDUX */
import {Provider} from 'react-redux'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as serverActions from './redux/reducers/server'
import {store} from './redux/store'

export class App extends Component {

	logout = () => {
	  this.props.actions.resetStatus();
	  this.props.actions.resetError();
	  this.props.actions.logout(); 
	};

  render() {
    return (
      <div>
        <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <LinkContainer to="/home">
                  <a href='#'>Personal Dictionary</a>
                </LinkContainer>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav bsStyle="tabs">
              {!this.props.user && 
              <Nav bsStyle="tabs">
	              <LinkContainer to="/register">
	                <NavItem href="#">Register</NavItem>
	              </LinkContainer>
	              <LinkContainer to="/login">
	                <NavItem href="#">Login</NavItem>
	              </LinkContainer>             
              </Nav>}
              {this.props.user && 
              <Nav bsStyle="tabs">
                <LinkContainer to="/translate">
                  <NavItem href="#">Translate</NavItem>
                </LinkContainer>  
                <LinkContainer to="/dictionary">
                  <NavItem href="#">Dictionary</NavItem>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <NavItem href="#">Profile</NavItem>
                </LinkContainer>
	              	<NavItem onClick={this.logout} href="#">Logout</NavItem>
	              <p className="navbar-text">Welcome, {this.props.user.username}!</p> 
              </Nav>}
            </Nav>
        </Navbar>
        {this.props.location.pathname==="/" && <HomePageContainer/>}
        {this.props.children}
      </div>
    )
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

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)


//routes
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
		  
		</Router>
	</Provider>,
	document.querySelector("#app")
);
