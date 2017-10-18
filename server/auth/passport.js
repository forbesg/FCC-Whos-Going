import passport from 'passport'
import { Strategy } from 'passport-twitter'
import User from '../models/users'

// Enable config import in development
// import config from './config'

const config = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: `${process.env.HOSTNAME}auth/twitter/callback`
}

passport.use(new Strategy(config, function (token, tokenSecret, profile, done) {
  User.findOne({id: profile.id}).then(user => {
    if (user) {
      return done(null, user)
    }
    let newUser = new User({
      id: profile.id,
      name: profile.displayName,
      username: profile.username
    })
    newUser.save(function (err) {
      if (err) {
        console.log(err)
      }
      done(null, newUser)
    })
  }).catch(err => {
    done(err, null)
  })
}))

export default passport