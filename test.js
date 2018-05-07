const { deploy, remove } = require('./src/instance')
const alias = require('./src/alias')

const fetch = require('node-fetch')
const fs = require('fs')

const TEST_URL = 'https://now-wrapper-testing.now.sh'

const main = async () => {
  /* setup test */
  const random = Math.random()
    .toString(36)
    .substring(7)
  fs.writeFileSync('./index.html', random, 'utf8')

  /* deploy instance */
  const instance = await deploy()
  if (instance.error) console.error(instance.error)

  /* set alias */
  const { url } = await alias(instance.url, TEST_URL)

  /* test result */
  fetch(TEST_URL)
    .then(res => res.text())
    .then(body => {
      const expected = fs.readFileSync('./index.html', 'utf8')
      if (body !== expected) throw Error('Something is wrong here')
      else console.log('Looks good!')
    })
}

main()
