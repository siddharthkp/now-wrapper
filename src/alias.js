const run = require('./command')

const set = async (instanceURL, aliasURL) => {
  const result = await run(`now alias set ${instanceURL} ${aliasURL}`)
  if (result.stderr) return { error: result.stderr }
  else return { url: aliasURL }
}

const get = async aliasURL => {
  const result = await run(`now alias ls`)
  if (result.stderr) return { error: result.stderr }
  else if (result.stdout) {
    // format: url.now.sh   alias.now.sh    time
    const urlToMatch = aliasURL.replace('https://', '').replace('/', '')
    const aliasRow = result.stdout.split('\n').filter(u => u.includes(urlToMatch))[0]
    /* format it properly */
    const url = 'https://' + aliasRow.split('.now.sh')[0].trim() + '.now.sh'

    return { url }
  } else {
    return { error: 404 }
  }
}

module.exports = { set, get }
