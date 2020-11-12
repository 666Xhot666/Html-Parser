const needle = require('needle'),
  cheerio = require('cheerio'),
  {
    promisify
  } = require('util'),
  URL = {
    today: 'https://github.com/trending?since=daily',
    weak: 'https://github.com/trending?since=weekly',
    mounth:'https://github.com/trending?since=monthly'
  },
  getSource = promisify(needle.get),
  pData = {},
  getData = (timeInterval) => {

      return new Promise((res, rej) => {
      getSource(`${URL[timeInterval]}`)
        .then((data) => {
          const $ = cheerio.load(data.body)
          $('article').each(function(i, elem) {
            const $article = cheerio.load($(elem).html())

            this.name = `${$article('h1 a').attr('href')}`
            pData[this.name] = {
              id: i + 1,
              title: this.name,
              description: `${$article('p').text().replace(/\s+/g,' ')}`,
              url: `${`https://github.com${$article('h1 a').attr('href')}`}`,
              language: $article('div span span').attr('itemprop', 'programmingLanguage').slice(1).eq(0).text(),
              stars: parseInt($article('div a').eq(1).text().replace(/[\s.,%]/g, '').match(/\d+/)),
              // timeInterval: parseInt($article('div span ').eq(-1).text().replace(/[\s.,%]/g, '').match(/\d+/)),
              insights: parseInt($article('div a').eq(2).text().replace(/[\s.,%]/g, '').match(/\d+/))
            }
            pData[this.name][`stars${timeInterval}`] = parseInt($article('div span ').eq(-1).text().replace(/[\s.,%]/g, '').match(/\d+/))
          })
        })
        .then(() => {
          console.log(`[PARSER] Data from ${timeInterval} has download and prepare`)
          res(pData)
        })
        .catch(err => {
          rej({
            msg: `[PARSER] Error with get data: ${err}`
          })
        })
    })
  }


module.exports = getData
