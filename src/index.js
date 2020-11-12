const getData = require('./getData'),
  Base = require('../data'),
  db = new Base()

db.connect()

const insertData = (timeInterval) => { // today, weak, mounth
  return new Promise(resolve => {
    db.createTable(timeInterval)
      .then(() => {
        getData(timeInterval)
          .then(data => {
            db.insert({
                table: timeInterval,
                data: data
              })
              .then(res => {
                resolve()
                console.log(res.msg);
              })
              .catch(err => {
                console.error(err.msg)
                db.disconect()
              })
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  })
}


const importData = (prop, callback) => {
  db.get({
    table: prop.tableName,
    close: prop.close
  }, (response) => callback(response))
}

const updateAll = () => {
  return new Promise(res => {
    insertData('today')
      .then(() => {
        insertData('weak')
          .then(() => {
            insertData('mounth')
              .then(() => {
                res()
              })
          })
      })
  })
}

module.exports = {
  importData,
  insertData,
  updateAll
}
