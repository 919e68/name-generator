const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')
 
var options = {
  uri: 'https://www.behindthename.com/random/random.php?number=2&gender=both&surname=&all=no&usage_eng=1',
  transform: function (body) {
    return cheerio.load(body)
  }
}
 
 
let run = async () => {
  let count = 100
  let names = []
  
  fs.writeFileSync('./exported/names.csv', "FirstName,LastName\n")
  
  try {
    for (let i = 0; i < count; i++) {
      await rp(options).then(($) => {
      
        let firstName = $($('.heavyhuge > a')[0]).html()
        let lastName = $($('.heavyhuge > a')[1]).html()
        
        names.push({
          firstName: firstName,
          lastName: lastName
        })
        
        fs.appendFileSync('./exported/names.csv', `${firstName},${lastName}` + "\n")
      })
    }
    
    console.log('generating names done.')
    process.exit()
    

  } catch (err) {
    console.log(err)
  }
}


run()