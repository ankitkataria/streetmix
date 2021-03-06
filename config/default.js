var fs = require('fs')
var path = require('path')
var envFile = path.join(__dirname, '/../.env')

if (fs.existsSync(envFile)) {
  var env = require('node-env-file')
  env(envFile)
}

var port = process.env.PORT || 8000
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  env: process.env.NODE_ENV,
  port: port,
  app_host_port: 'localhost:' + port,
  header_host_port: 'localhost:' + port,
  twitter: {
    oauth_request_token_api_uri: 'https://api.twitter.com/oauth/request_token',
    oauth_access_token_api_uri: 'https://api.twitter.com/oauth/access_token',
    oauth_authenticate_uri: 'https://twitter.com/oauth/authenticate?oauth_token=%s',
    oauth_consumer_key: process.env.TWITTER_OAUTH_CONSUMER_KEY,
    oauth_consumer_secret: process.env.TWITTER_OAUTH_CONSUMER_SECRET,
    oauth_version: '1.0A',
    oauth_callback_uri: '/twitter-sign-in-callback',
    oauth_signature_method: 'HMAC-SHA1',
    timeout_ms: 500
  },
  facebook_app_id: '204327799717656',
  cookie_session_secret: process.env.COOKIE_SESSION_SECRET || 'seger handrail',
  restapi_proxy_baseuri_rel: '/api',
  restapi: {
    port: port,
    protocol: 'http://',
    baseuri: '/api'
  },
  db: {
    url: process.env.MONGOHQ_URL || 'mongodb://localhost/streetmix'
  },
  email: {
    sendgrid: {
      username: process.env.SENDGRID_USERNAME,
      password: process.env.SENDGRID_PASSWORD
    },
    feedback_recipient: process.env.EMAIL_FEEDBACK_RECIPIENT || 'hello@streetmix.net',
    feedback_subject: 'Streetmix feedback',
    feedback_sender_default: 'noreply@streetmix.net'
  },
  log_level: 'debug',
  no_internet_mode: process.env.NO_INTERNET_MODE || false
}
