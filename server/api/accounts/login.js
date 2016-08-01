import Q from 'q'
import jsforce from 'jsforce'

// Storing the current connection locally so
// we don't need to authenticate multiple times. Might be a better
// place to put this.
let currentConnection

const {
  SALESFORCE_SANDBOX_HOST,
  SALESFORCE_SANDBOX_USER,
  SALESFORCE_SANDBOX_PASSWORD
} = process.env

// This class contains logic to login to Salesforce and returns a
// promise containining the connection, which can be used to query
// for rows.
export default function login() {
  const deferred = Q.defer()

  if (currentConnection) {
    deferred.resolve({
      message: "Already logged in.",
      connection: currentConnection,
    })
  } else {
    const conn = new jsforce.Connection({
      loginUrl : SALESFORCE_SANDBOX_HOST
    });

    conn.login(SALESFORCE_SANDBOX_USER, SALESFORCE_SANDBOX_PASSWORD, function(err, userInfo) {
      if (err) {
        deferred.reject({
          message: err,
        })
      } else {
        currentConnection = conn
        deferred.resolve({
          message: "Successfully authenticated to Salesforce.",
          connection: currentConnection,
        })
      }
    })
  }

  return deferred.promise
}
