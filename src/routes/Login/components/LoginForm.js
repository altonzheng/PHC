import React, { PropTypes } from 'react'
import classes from './LoginForm.scss'

export const LoginForm = (props) => {
  let {
    fields: {
      username,
      password,
    },
    handleSubmit,
    submitting,
    login,
  } = props

  const _onSubmit = () => {
    if (
      username.touched
        && username.value
        && password.touched
        && password.value
    ) {
      login(username.value, password.value)
    }
  }

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(_onSubmit)}
    >
      <div className={classes.inputGroup}>
        <label className={classes.inputLabel}>Username</label>
        <input className={classes.loginTextInput} type="text" {...username} />
      </div>

      <div className={classes.inputGroup}>
        <label className={classes.inputLabel}>Password</label>
          <input className={classes.loginTextInput} type="password" {...password} />
      </div>

      <div className={classes.footer}>
        <button
          className="button button--large button--success"
          type="submit"
          disabled={submitting}
        >
          Login
        </button>
      </div>

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
