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
    const aliasRow = result.stdout.split('\n').filter(u => u.includes(aliasURL))[0]
    const url = aliasRow.split('.now.sh')[0].trim()
    info('NOW CD', `Found previous deployment instance: ${url}`)
    resolve({ url })
  } else {
    return { error: 404 }
  }
}

module.exports = { set, get }
