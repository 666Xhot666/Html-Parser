const cred = require('./credentials.json'),
  {
    Client
  } = require('pg')

class Base {
  constructor() {
    this.client = new Client({
      user: cred.PGUSER,
      host: cred.PGHOST,
      database: cred.PGDATABASE,
      password: cred.PGPASSWORD,
      port: cred.PGPORT
    })
  }

  connect() {
    return new Promise((res, rej) => {
      this.client
        .connect()
        .then(() => res({
          msg: '[DATABASE] Database has been connected'
        }))
        .catch(err => rej({
          msg: `[DATABASE] Databse connection error: ${err}`
        }))
    })
  }

  disconect() {
    console.log(this.client);
      this.client.end()
  }

  createTable(name) {
    return new Promise((res) => {
      if (name) {
        this.tableName = name.toString()
        this.client.query(`CREATE TABLE IF NOT EXISTS ${this.tableName} (
           id INT UNIQUE NOT NULL,
           title VARCHAR (50) UNIQUE NOT NULL,
           description VARCHAR (2000) NOT NULL,
           url VARCHAR (255) UNIQUE NOT NULL,
           language VARCHAR (50) NOT NULL,
           stars INT NOT NULL,
           insights INT NOT NULL,
           periodstars INT NOT NULL
         )`)
          .then(() => res() )
          .catch(err => {
            console.log(`[CREATE TABLE] ERROR : ${err}`)
            this.client.end()
          })
      }
    })
  }

  insert(prop) {
    this.table = prop.table
    this.data = prop.data
    return new Promise((resolve, reject) => {
      Object.values(this.data).forEach((val, index) => {
        this.client
          .query({
            text: `INSERT INTO ${this.table} (id,title,description,url,language,stars,insights,periodstars)
              VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT (id) DO UPDATE
              SET title = excluded.title, description = excluded.description, url = excluded.url,
              language = excluded.language, stars = excluded.stars, insights = excluded.insights,
               periodstars = excluded.periodstars`,
            values: Object.values(val)
          })
          .then(res => {
            if (Object.keys(this.data).length == index + 1) {
              resolve({
                msg: `[INSERT] Insert has canceled successfull`
              })
            }
          })
          .catch(err => reject({
            msg: `${err}`
          }))
      })
    })
  }

  get(prop, callback) {
    this.table = prop.table
    this.client
      .query(`SELECT * FROM ${this.table}`)
      .then(response => {
        callback(response.rows)
        if(prop.close) this.client.end()
      })
  }

}

module.exports = Base
