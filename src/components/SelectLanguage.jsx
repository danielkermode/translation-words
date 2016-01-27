import React, {Component} from 'react';
import {languagePairs} from '../redux/languagePairs'

// redux
import {connect} from 'react-redux'
import {change} from 'redux-form'

import Combobox from 'react-widgets/lib/Combobox'

//clean language pairs to react-select options format
let cleanedLanguagePairs = []
for(let i=0; i < languagePairs.length; ++i)
{
  cleanedLanguagePairs.push({value: languagePairs[i][0], label: languagePairs[i][1]})
}

export class SelectLanguage extends Component{

	constructor(props) {
	    super(props);
	  }

	componentDidMount() {
	  this.props.dispatch(change('translateForm', this.props.field, this.props.initialLang))
	};

	updateMainForm = (valuePair) => {
		//arg has value (2 letters, eg. en) and label (name of language, eg. english). we want to dispatch value
		this.props.dispatch(change('translateForm', this.props.field, valuePair.value)); 
	};

	render() {
		return (
			<Combobox
			  onSelect={value => this.updateMainForm(value)}
			  onChange={value => this.updateMainForm(value)}
		    valueField='value' textField='label'
		    data={cleanedLanguagePairs}
		    defaultValue={this.props.initialLang}/>
		)
	}
}

SelectLanguage.defaultProps = { initialLang: 'en' };


export const SelectLanguageContainer = connect()(SelectLanguage)