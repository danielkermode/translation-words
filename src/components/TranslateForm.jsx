import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {SelectLanguageContainer} from './SelectLanguage'

export const fields = ['fromLanguage', 'toLanguage','word'];

class TranslateForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    serverError: PropTypes.string
  };

  componentDidMount() {
    this.props.actions.resetStatus();
    this.props.actions.resetError();
  };

  translate = () => {
    this.props.actions.resetTranslate()
    this.props.actions.translateWord(this.props.values.word, this.props.values.fromLanguage, this.props.values.toLanguage);
  };

  onEnter = (e) => {
    if(e.keyCode === 13){
      //13 is enter
      this.translate()
    }
  };

  render() {
    const {
      fields: {fromLanguage, toLanguage, word},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;
    return (<div>
        <fieldset className="form-group">
          <label>From Language</label>
          <div>
            <SelectLanguageContainer field={'fromLanguage'} />
          </div>
        </fieldset>
        <fieldset className="form-group">
          <label>To Language</label>
          <div>
            <SelectLanguageContainer initialLang={'it'} field={'toLanguage'} />
          </div>
        </fieldset>
        <fieldset className="form-group">
          <label>Word/Phrase</label>
          <div>
            <input className="form-control" onKeyDown={this.onEnter} type="text" placeholder="Enter word to translate" {...word}/>
          </div>
        </fieldset>
        <button className="btn btn-primary" onClick={this.translate}>
         Translate!
        </button>
        <hr/>
        {this.props.serverError? <div className="alert alert-danger"> Translation failed. 
        <br/>
        <b>Error:&nbsp;&nbsp;</b><i>{this.props.serverError}</i> </div> : <div></div>}
      </div>
    );
  }
}

export default reduxForm({
  form: 'translateForm',
  fields
})(TranslateForm);