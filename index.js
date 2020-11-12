const app = require('./src')
const grab = flag =>{
  let indexAfterFlag = process.argv.indexOf(flag) + 1
  return process.argv[indexAfterFlag]
}
const time = grab("--time")

if(time === 'today'){
  console.log(`Your choose is ${time}`)
  app.insertData(time)
  .then(() =>{
    app.importData({tableName: `${time}`, close: true},res =>{
      console.log(res);
    })
  })

}
else if (time === 'weak') {
  console.log(`Your choose is ${time} a wait please`)
  app.insertData(time)
  .then(() =>{
    app.importData({tableName: `${time}`, close: true},res =>{
      console.log(res);
    })
  })

}
else if (time === 'mounth') {
  console.log(`Your choose is ${time} a wait please`)
  app.insertData(time)
  .then(() =>{
    app.importData({tableName: `${time}`, close: true},res =>{
      console.log(res);
    })
  })

}
else if (time === 'all') {
  console.log(`Your choose is ${time} a wait please`)
  app.updateAll()
  .then(()=>{
    app.importData({tableName: 'today', close: false},(today) => {
     console.log('Articles for today =>',today)
     app.importData({tableName: 'weak', close: false},(weak) => {
      console.log('Articles for weak => ', weak);
      app.importData({tableName: 'mounth', close: true},(mounth) => {
       console.log('Articles for mounth =>', mounth);
     })
    })
   })
  })
}
else {
  console.log(`You didn't choose anything. Setup default: today`)
  app.insertData('today')
  .then(() =>{
    app.importData({tableName: 'today', close: true},res =>{
      console.log(res)
    })
  })
}
