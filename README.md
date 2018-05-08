<p align="center">
  <img src="https://cdn.rawgit.com/siddharthkp/now-wrapper/master/logo.png" height="200px"/>
  <br><br>
  <b>A programmatic API around now CLI</b>
  <br><br>
</p>

&nbsp;

[![Build Status](https://travis-ci.org/siddharthkp/now-wrapper.svg?branch=master)](https://travis-ci.org/siddharthkp/now-wrapper)

#### setup

1.  install

    ```sh
    npm install now-wrapper --save-dev
    ```

2.  now API token

    `now-wrapper` looks for `process.env.NOW_TOKEN` You can generate a token from [account/tokens](https://zeit.co/account/tokens)

&nbsp;

#### usage

Run your script in the directory you want to deploy

```js
const { instance, alias } = require('now-wrapper')

const doStuff = async () => {
  /* we just made an app, let's deploy that baby */
  const deployment = await instance.deploy()
  if (!deployment.error) console.log(deployment.url)

  /* set alias */
  await alias.set(deployment.url, 'https://production-url.now.sh')

  /* instant regret, let's delete that thing */
  await instance.remove(deployment.url)
}
```

&nbsp;

#### like it?

:star: this repo

&nbsp;

#### license

MIT © [siddharthkp](https://github.com/siddharthkp)
