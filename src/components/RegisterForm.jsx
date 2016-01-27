import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
export const fields = ['username', 'email', 'password', 'repeatPassword'];

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required.';
  } else if (values.username.length > 15) {
    errors.username = 'Username must be 15 characters or less.';
  } else if (values.username.length < 4) {
    errors.username = 'Username must be at least 4 characters.';
  }

  if (!values.email) {
    errors.email = 'Required.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address.';
  }

  if (!values.password) {
    errors.password = 'Required.';
  } else if (values.password.length < 5) {
    errors.password = 'Password must be at least 5 characters.';
  } else if (values.username.length > 20) {
    errors.password = 'Password must be 20 characters or less.';
  }

  if (!values.repeatPassword) {
    errors.repeatPassword = 'Required.';
  } else if (values.repeatPassword !== values.password) {
    errors.repeatPassword = 'Passwords do not match.';
  } 
  return errors;
};

class RegisterForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
    // resetForm: PropTypes.func.isRequired,
    // submitting: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.actions.resetStatus();
    this.props.actions.resetError();
  };

  sendSubmit = () => {
    this.props.actions.resetStatus();
    this.props.actions.resetError();
    this.props.actions.register(this.props.values.email, this.props.values.username, this.props.values.password); 
  };

  render() {
    console.log(this.props.error)
    const {fields: {username, email, password, repeatPassword}, resetForm, submitting} = this.props;
    return (<div>
            <fieldset className="form-group">
              <label>Username</label>
              <div>
                <input className="form-control" type="text" placeholder="Username" {...username}/>
              </div>
              {username.touched && username.error && <div style={{color:'red'}}>{username.error}</div>}
            </fieldset>
            <fieldset className="form-group">
              <label>Email</label>
              <div>
                <input className="form-control" type="text" placeholder="Email" {...email}/>
              </div>
              {email.touched && email.error && <div style={{color:'red'}}>{email.error}</div>}
            </fieldset>
            <fieldset className="form-group">
              <label>Password</label>
              <div>
                <input className="form-control" type="password" placeholder="Password" {...password}/>
              </div>
              {password.touched && password.error && <div style={{color:'red'}}>{password.error}</div>}
            </fieldset>
            <fieldset className="form-group">
              <label>Repeat Password</label>
              <div>
                <input className="form-control" type="password" placeholder=" Repeat Password" {...repeatPassword}/>
              </div>
              {repeatPassword.touched && repeatPassword.error && <div style={{color:'red'}}>{repeatPassword.error}</div>}
            </fieldset>
            <div>
              <button className="btn btn-primary" disabled={submitting || username.error || email.error || password.error || repeatPassword.error} 
              onClick={this.sendSubmit}>
               Register
              </button>
            </div>
            <hr/>
            {this.props.serverError? <div className="alert alert-danger"> Register failed. 
            <br/>
            <b>Error:&nbsp;&nbsp;</b><i>{this.props.serverError}</i> </div> : <div></div>}
      </div>
    );
  }
}

export default reduxForm({
  form: 'registerForm',
  fields,
  validate
})(RegisterForm);