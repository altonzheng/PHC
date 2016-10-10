import React, { PropTypes } from 'react'
import classes from './LoginForm.scss'
import { Button } from 'react-bootstrap';

export const LoginForm = (props) => {
  let {
    fields: {
      password,
    },
    handleSubmit,
    submitting,
    login,
    attempted,
    authenticating,
  } = props

  const _onSubmit = () => {
    login(password.value)
  }

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(_onSubmit)}
    >
      <div className={classes.inputGroup}>
        <label className={classes.inputLabel}>Password</label>
          <input className={classes.loginTextInput} type="password" {...password} />
      </div>

      <div className={classes.footer}>
        <Button
          bsStyle="primary"
          type="submit"
          disabled={submitting || authenticating}
        >
          Login
        </Button>
      </div>

      {attempted ? <div>Wrong password!</div> : null}

    </form>
  )
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
}

export default LoginForm
