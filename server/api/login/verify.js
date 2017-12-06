import config from '../../../config'

export default function verify (password) {
  return (password === config.login_password)
}
