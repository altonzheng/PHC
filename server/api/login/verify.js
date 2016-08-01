const {
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
} = process.env

export default function verify (username, password) {
  return (username === LOGIN_USERNAME && password === LOGIN_PASSWORD)
}
