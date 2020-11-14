const cred = require('./credentials.json')
const {
  Client
} = require('pg')
const client = new Client({
  user: cred.PGUSER,
  host: cred.PGHOST,
  database: cred.PGDATABASE,
  password: cred.PGPASSWORD,
  port: cred.PGPORT
})

const createTable = (name) => {
  return new Promise((res, rej) => {
    client.query(`CREATE TABLE IF NOT EXISTS ${name} (
       id INT UNIQUE NOT NULL,
       title VARCHAR (50)  NOT NULL,
       description VARCHAR (2000) NOT NULL,
       url VARCHAR (255) UNIQUE NOT NULL,
       language VARCHAR (50) NOT NULL,
       stars INT NOT NULL,
       insights INT NOT NULL,
       periodstars INT NOT NULL
     )`)
      .then(() => res())
      .catch(err => {
        client.end()
        rej({
          msg: err
        })
      })
  })
}

const insert = (prop) => {
  let table = prop.table
  let data = prop.data
  return new Promise((res, rej) => {
    Object.values(data).forEach((val, index) => {
      client
        .query({
          text: `INSERT INTO ${table} (id,title,description,url,language,stars,insights,periodstars)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT (id) DO UPDATE
          SET title = excluded.title, description = excluded.description, url = excluded.url,
          language = excluded.language, stars = excluded.stars, insights = excluded.insights,
           periodstars = excluded.periodstars`,
          values: Object.values(val)
        })
        .then(() => {
          if (Object.keys(data).length == index + 1) {
            res()
          }
        })
        .catch(err => rej({
          msg: `${err}`
        }))
    })
  })
}

const getAllFromTable = (table, callback) => {
  client
    .query(`SELECT * FROM ${table}`)
    .then(response => {
      callback(response.rows)
    })
}

module.exports = {
   client,
  insert,
  getAllFromTable,
  createTable
}
