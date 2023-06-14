const path = require('path')

// Require Provider 
const lti = require('ltijs').Provider

const ltiKey = ``;

// Setup provider
lti.setup("43a54e88-8352-489f-9eda-703634e9f7fa", // Key used to sign cookies and tokens
  { // Database configuration
    url: 'mongodb://localhost:27017/lti-demo',
    connection: {}
  },
  { // Options
    appRoute: '/', 
    loginRoute: '/login', // Optionally, specify some of the reserved routes
    cookies: {
      secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
      sameSite: '' // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
    },
    devMode: true // Set DevMode to false if running in a production environment with https
  }
)

// Set lti launch callback
lti.onConnect((token, req, res) => {
  console.log(token)
  return res.send('It\'s alive!')
})

const setup = async () => {
  // Deploy server and open connection to the database
  await lti.deploy({ port: 3000 }) // Specifying port. Defaults to 3000

  // Register platform
  await lti.registerPlatform({
    url: 'https://aiforfuture.krystal.education',
    name: 'Krystal Education',
    clientId: 'kep_client_id_test',
    authenticationEndpoint: 'https://aiforfuture.krystal.education?authfromlti=true',
    accesstokenEndpoint: 'https://aiforfuture.krystal.education?accesstokenfromli=true',
    authConfig: { method: 'JWK_SET', key: 'https://aiforfuture.krystal.education?keyset=true' }
  })
}

setup()