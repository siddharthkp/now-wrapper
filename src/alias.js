const exec = require('execa')

const alias = async (instanceURL, aliasURL) => {
  const result = await exec.shell(`now alias set ${instanceURL} ${aliasURL}`)
  if (result.stderr) return { error: result.stderr }
  else return { url: aliasURL }
}

module.exports = alias
