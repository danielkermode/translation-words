import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const fields = ['username', 'password'];

class LoginForm extends Component {
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

  login = () => {
    this.props.actions.resetStatus();
    this.props.actions.resetError();
    this.props.actions.login(this.props.values.username, this.props.values.password); 
  };

  onEnter = (e) => {
    if(e.keyCode === 13){
      //13 is enter
      this.login() 
    }
  };

  render() {
    const {
      fields: {username, password},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;
    return (<div>
        <fieldset className="form-group">
          <label>Username</label>
          <div>
            <input className="form-control" onKeyDown={this.onEnter} type="text" placeholder="Username" {...username}/>
          </div>
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <div>
            <input className="form-control" onKeyDown={this.onEnter} type="password" placeholder="Password" {...password}/>
          </div>
        </fieldset>
        <button className="btn btn-primary" onClick={this.login}>
         Login
        </button>
        <hr/>
        {this.props.serverError? <div className="alert alert-danger"> Login failed. 
        <br/>
        <b>Error:&nbsp;&nbsp;</b><i>{this.props.serverError}</i> </div> : <div></div>}
      </div>
    );
  }
}

export default reduxForm({
  form: 'simple',
  fields
})(LoginForm);
