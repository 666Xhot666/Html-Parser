const app = require('./app')
const grab = flag =>{
  let indexAfterFlag = process.argv.indexOf(flag) + 1
  return process.argv[indexAfterFlag].toLowerCase()
}
const time = grab("--time")
const update = process.argv.includes('--update')
const variants = ['today','weak','mounth','all']

if(variants.includes(time)){
  console.log(`You choose ${time}`)
    app({time:time, update:update})
}
else{
  console.log(`You choose nothing set default <<today>> \n
    If you want to choose another period of time. \n
    Please start application whith flag --time [today,weak,mounth,all] `)
    app({time:'today', update:update})
}
