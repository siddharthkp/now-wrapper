const run = require('./command')

const alias = async (instanceURL, aliasURL) => {
  const result = await run(`now alias set ${instanceURL} ${aliasURL}`)
  if (result.stderr) return { error: result.stderr }
  else return { url: aliasURL }
}

module.exports = alias
