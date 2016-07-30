import { reduxForm } from 'redux-form'
import LoginForm from '../components/LoginForm'
import { login } from '../modules/login'

const fields = [
  'username',
  'password',
]

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password))
})

export default reduxForm({
  form: 'login',
  fields,
},
mapStateToProps,
mapDispatchToProps
)(LoginForm)
