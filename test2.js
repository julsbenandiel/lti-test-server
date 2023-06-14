const crypto = require("node:crypto")
const Lti = require('ims-lti');
const oauthSignature = require('oauth-signature');

// const HMAC_SHA1 = require('./node_modules/ims-lti/lib/hmac-sha1.js')
const express = require('express');

// const consumerKey = crypto.randomBytes(32).toString('hex');
// const consumerSecret = crypto.randomBytes(32).toString('hex');

const consumerKey = "cf3f73b96a60478b56fc51d699439022b808a609a025202fb333c0485cc760d9"
const consumerSecret = "b0e685ff6badbcffe9a906f1a93a4ff0cb48b7fe7fbab92c48c966128328f628";


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/launch', (req, res) => {

  // Simple in-memory nonce store 
  const nonceStore = new Lti.Stores.MemoryStore();
  const provider = new Lti.Provider(consumerKey, consumerSecret, nonceStore);

  // const signer = new HMAC_SHA1()
  // const generated = signer.build_signature(req, req.body, consumerSecret)

  // console.log({ generatedOutside: generated })
  
  const requestUrl = "http://localhost:3000/launch"
  const requestMethod = "POST"

  // Add the oauth_signature to the request parameters
  req.body.oauth_timestamp = Math.floor(Date.now() / 1000);
  req.body.oauth_nonce = nonceStore

  const signature = oauthSignature.generate(
    requestMethod,
    requestUrl,
    req.body,
    consumerSecret,
    null,
    { encodeSignature: false }
  );

  req.body.oauth_signature = signature;

  console.log({ signature })

  provider.valid_request(req, (err, isValid) => {
    console.log({ err, isValid })
    if (err || !isValid) {
      res.status(400).send('Invalid LTI request');
      return;
    }

    const userId = provider.body.user_id;
    const contextId = provider.body.context_id;
    // ... additional processing ...
    console.log({ userId, contextId })
    res.send('LTI launch successful');
  });
});

const port = 3000; // Choose an appropriate port number
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});