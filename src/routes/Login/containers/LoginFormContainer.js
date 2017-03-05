import { reduxForm } from 'redux-form'
import LoginForm from '../components/LoginForm'
import { login } from '../modules/login'

const fields = [
  'password',
]

const mapStateToProps = (state) => ({
  authenticating: state.login.authenticating,
  attempted: state.login.attempted,
})

const mapDispatchToProps = (dispatch) => ({
  login: (password) => dispatch(login(password)),
})

export default reduxForm({
  form: 'login',
  fields,
},
mapStateToProps,
mapDispatchToProps
)(LoginForm)
