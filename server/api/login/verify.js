// TODO: use env vars to specify possible logins instead of a hardcoded string

export default function verify (username, password) {
  return (username === 'asdf' && password === 'asdf')
}
