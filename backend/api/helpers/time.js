import moment from 'moment-timezone'

const eventsToDateTime = (events) => {
  return events.map(event => {
    const eventResult = {
      ...event
    }
    if (event.eventDate && event.timezone) {
      // Assuming storedDateTime is the UTC time retrieved from MongoDB
      // const userTimeZone = 'user-input-timezone'; // Replace with the user's timezone
      const convertedDateTime = moment.tz(event.eventDate, event.timezone).format();
      let [date, time] = convertedDateTime.split('T')
      time = time.split(':')
      time = [time[0],time[1]].join(':')
      eventResult.date = date
      eventResult.time = time
    }

    return eventResult
  })
}

const eventsToUTC = (events) => {
  return events.map(event => {
    const eventResult = {
      ...event
    }
    if (event.date && event.time) {
      const inputDateTime = `${event.date} ${event.time}`;
      eventResult.eventDate = moment.tz(inputDateTime, event.timezone).utc().format();
    }
    return eventResult
  })
}


export default {
  eventsToDateTime,
  eventsToUTC,
}

