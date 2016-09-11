const {
  LOGIN_PASSWORD
} = process.env

export default function verify (password) {
  console.log(password);
  console.log(LOGIN_PASSWORD);
  return (password === LOGIN_PASSWORD)
}
