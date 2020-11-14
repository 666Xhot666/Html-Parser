const parser = require('./parseFromHtml')
const {
  insert,
  createTable
} = require('../database')

const insertToTable = (table) => {
  return new Promise((res, rej) => {
    createTable(table)
      .then(() => {
        parser(table)
          .then((data) => {
            insert({
                table: table,
                data: data
              })
              .then(() => {
                console.log(`Update data in table ${table} succes`);
                res()
              })
              .catch(rej)
          })
      })
      .catch(rej)
  })
}

const main = () => {
  return new Promise((res, rej) => {

    Promise.all([insertToTable('today'), insertToTable('weak'), insertToTable('mounth')])
      .then(() => {
        console.log('update all tables succes')
        res()
      })
      .catch(rej)

  })
}

module.exports = main
