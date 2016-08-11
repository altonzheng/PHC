import Q from 'q'
import jsforce from 'jsforce'

const fetchAccountsQuery = "SELECT Id, FirstName, LastName FROM Account"

export function fetchAccounts(connection) {
  const deferred = Q.defer()
  const records = []

  connection.bulk.query(fetchAccountsQuery)
    .on('record', (record) => {
      console.log(record)
      records.push(record)
    })
    .on('end', () => {
      console.log("Finished fetching records.")
      deferred.resolve({
        message: "Successfully fetched " + records.length + " records!",
        records: records
      })
    })
    .on('error', (err) => {
      deferred.reject({
        message: "Error fetching records.",
        error: err
      })
    })

  return deferred.promise
}

export function getAccount(connection, id) {
  if (connection.limitInfo.apiUsage) {
    console.log("API Limit: " + connection.limitInfo.apiUsage.limit);
    console.log("API Used: " + connection.limitInfo.apiUsage.used);
  }

  const deferred = Q.defer()

  connection.sobject("Account").retrieve(id, function(err, account) {
    if (err) {
      deferred.reject({
        message: `Error fetching account ${id}.`,
        error: err
      })
    }

    deferred.resolve({
      message: `Successfully retrieved account ${id}`,
      account: account
    })
  })

  return deferred.promise
}
