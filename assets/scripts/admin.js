/**
 *  The Admin bundle for Streetmix
 *
 */
import Raven from 'raven-js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// Polyfills
import 'babel-polyfill'
import 'whatwg-fetch' // fetch API
import 'handjs' // microsoft's pointer events / touch-action spec
import './vendor/canvas-toBlob.js'
import './vendor/Blob.js'
import './vendor/modernizr-custom'
import './vendor/polyfills/customevent' // customEvent in IE
import './vendor/polyfills/Number.isInteger' // for IE
import './vendor/polyfills/Element.closest'
import './vendor/polyfills/Element.remove'

// Redux
import store from './store'

// Admin object
import Admin from './admin/Admin'

// Error tracking
// Load this before all other modules. Only load when run in production.
if (window.location.hostname === 'streetmix.net' || window.location.hostname === 'www.streetmix.net') {
  Raven.config('https://fac2c23600414d2fb78c128cdbdeaf6f@app.getsentry.com/82756', {
    whitelistUrls: [/streetmix\.net/, /www\.streetmix\.net/]
  }).install()
}

// Mount React components
ReactDOM.render(
  <Provider store={store}>
    <Admin />
  </Provider>, document.getElementById('admin-app'))
