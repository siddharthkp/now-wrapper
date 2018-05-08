const { instance, alias } = require('../index')

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
  const deployment = await instance.deploy()
  if (deployment.error) console.error(deployment.error)

  /* test result */
  fetch(deployment.url)
    .then(res => res.text())
    .then(body => {
      const expected = fs.readFileSync('./index.html', 'utf8')
      if (body !== expected) {
        throw Error('Something is wrong here')
        process.exit(1)
      } else console.log('Step 1: Correctly deployed!')
    })

  /* set alias */
  await alias.set(deployment.url, TEST_URL)
  const aliasedDeployment = await alias.get('https://now-wrapper-testing.now.sh/')

  /* test result */

  if (aliasedDeployment.url !== deployment.url) {
    throw Error('Something is wrong here')
    process.exit(1)
  } else console.log('Step 2: Alias set and fetched correctly!')

  /* delete instance */
  await instance.remove(deployment.url)

  /* test result */
  const { status } = await fetch(TEST_URL)
  if (status === 404) console.log('Step 3: Instance deleted for good!')
  else {
    throw Error('Something is wrong here')
    process.exit(1)
  }
}

main()
