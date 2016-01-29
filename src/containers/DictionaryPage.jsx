import React, {Component} from 'react';
import {Map} from 'immutable';
import {DictionaryList} from '../components/DictionaryList'

// redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as serverActions from '../redux/reducers/server'


/* create container as stateless function to indicate pure component */
export class DictionaryPage extends Component {

	render() {
		return (
			<div> Hi, welcome to your personal dictionary. 
      <br/>    
        {this.props.user &&
        <DictionaryList actions={this.props.actions} PhrasePairs={this.props.user.PhrasePairs} />
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

export const DictionaryPageContainer = connect(mapStateToProps, mapDispatchToProps)(DictionaryPage)