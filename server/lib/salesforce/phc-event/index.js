import Q from 'q'

import {
  PhcEvent,
  PHC_EVENT_ID,
} from './constants'

// Fetch the services enabled for an event by the PHC_EVENT_ID env var
export function getAvailableServices (connection) {
  const deferred = Q.defer()

  connection.sobject(PhcEvent)
    .find({Id: PHC_EVENT_ID})
    .execute((err, records) => {
      if (records.length !== 1) {
        deferred.reject({
          message: `Did not find a valid event PHC event with id ${PHC_EVENT_ID}`,
          error: err,
        })
      }

      const currentPhcEvent = records[0]

      deferred.resolve(currentPhcEvent)
    })

  return deferred.promise
}
