const lti = require('ltijs').Provider;

// Generate a new consumer key
const consumerKey = lti.generateKeyPair();
console.log('Consumer Key:', consumerKey);
