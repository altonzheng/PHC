import Q from 'q'
import jsforce from 'jsforce'

export default function fetchAccounts(connection) {
  const deferred = Q.defer();
  const records = [];

  connection.bulk.query("Select Id, FirstName, LastName FROM Account")
    .on('record', (record) => {
      console.log(record);
      records.push(record);
    })
    .on('end', () => {
      console.log("Finished fetching records.");
      deferred.resolve({
        message: "Successfully fetched " + records.length + " records!",
        records: records
      });
    })
    .on('error', (err) => {
      console.log("Error fetching records.");
      deferred.reject({
        message: "Error fetching records.",
        error: err
      });
    });

  return deferred.promise;
}
