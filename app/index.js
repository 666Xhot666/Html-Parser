const insertORUpdate = require('./insertToBase')
const {
  client,
  getAllFromTable
} = require('../database')

const view = (time) => {
  if (time === 'all') {
    getAllFromTable('today', data => {
      console.log(`Data for Period: today \n`, data)

      getAllFromTable('weak', data => {
        console.log(`Data for Period: weak \n`, data)

        getAllFromTable('mounth', data => {
          console.log(`Data for Period: mounth \n`, data)
          client.end()
        })
      })
    })
  } else {
    getAllFromTable(time, data => {
      console.log(data)
      client.end()
    })
  }
}

const main = (prop) => {
  client.connect()
    .then(() => {
      if (prop.update) {

        insertORUpdate()
          .then(() => {
            console.log('Update succes')
            view(prop.time)
          })
          .catch(err => {
            console.log(err)
            client.end()
          })
      } else {
        view(prop.time)
      }
    })
}

module.exports = main
