import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import store from '../store'
import session from 'express-session'
import passport from './auth/passport'

import api from './api'

require('./models/db')

const app = express()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

app.set('port', port)

app.use(session({
  name: '_whosgoing',
  secret: 'keyboard cat',
  resave: false,
  // saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 24 Hours 
  }
}))

// Initialise passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Import API Routes
app.use('/api', api)

app.get('/auth/twitter', function (req, res, next) {
  console.log('Auth Twitter')
  next()
}, passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/test' // This route doesn't exist
}));

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
