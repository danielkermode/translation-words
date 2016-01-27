import React, {Component} from 'react';
import {Map} from 'immutable';

//components
import TranslateForm from '../components/TranslateForm'

// redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as serverActions from '../redux/reducers/server'
import * as wordsActions from '../redux/reducers/words'

/* create container as stateless function to indicate pure component */
export class TranslatePage extends Component {

	resetError = () => {
		this.props.actions.resetStatus(); this.props.actions.resetError()
	};

	render() {
		return (
			<div>
			  <TranslateForm actions={this.props.actions} serverError={this.props.server.serverError}/>
			  {this.props.words.result.translation && 
			  <span>Translation: {this.props.words.result.translation}</span>}
			  {this.props.words.wordError && 
			  <div className="alert alert-danger" >Error: {this.props.words.wordError}</div>}
			</div>
		);
	}
}

/* NOTE: Add <DevTools /> in before the last div to debug with Redux Devtools */

function mapStateToProps(state) {
  return {
      server: state.server,
      words: state.words
  };
}

//actions are array for mapDispatchToProps
const actions = [serverActions, wordsActions];

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

export const TranslatePageContainer = connect(mapStateToProps, mapDispatchToProps)(TranslatePage)