import { Router } from 'express'
import axios from 'axios'
import qs from 'qs'
import bodyParser from 'body-parser'
import CurrentBars from '../models/currentBars'
import CurrentLocation from '../models/currentLocation'

const router = Router()

const key = ""
const clientID = 'lfQN5QSEPMr4ng0eW3lvEA'
const clientSecret = 'ktPD8JT2S3nn1wDjLlHaRNgNd1gQKbxhmPnxZ4kf8eM1D4OyfpddsCHOLDP5KNj6'
const yelpUrl = 'https://api.yelp.com/v3/businesses'

// Request Access Token from Yelp
function getAccessToken () {
  return axios({
    method: 'POST',
    url: 'https://api.yelp.com/oauth2/token',
    data: qs.stringify({
      'grant_type': 'client_credentials',
      'client_id': clientID,
      'client_secret': clientSecret
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

router.get('/location', (req, res) => {
  CurrentLocation.findOne({}).then(location => {
    if (location) {
      return res.send(location)
    }
    res.send(null)
  })
})

/* GET city by ID. */
router.get('/yelp/:city', function (req, res, next) {
  const cityName = req.params.city
  
  CurrentBars.findOne({city: cityName}).then(bars => {
    // if city search is not in the DB, request from Yelp, save to DB and return
    if (!bars) {
      getAccessToken().then(response => {
        if (response.data.error) throw newError(response.data.error)
        const url = `${yelpUrl}/search?location=${cityName}&term=bar`
        axios.get(url, {
          headers: {
            'Authorization': `Bearer ${response.data.access_token}`
          }
        }).then(results => {
          // Save search to MongoDB to access when redirected back to app after authentication
          let search = {
            city: cityName,
            bars: results.data.businesses.map(bar => {
              bar.going = []
              bar.display_address = bar.location.display_address
              return bar
            })
          }

          req.session.currentLocation = cityName
          CurrentBars.create(search, (err, doc) => {
            console.log('creating DB listing')
            if (err) {
              console.log(err)
              throw new Error(err)
            }
            console.log('document created, returning newly created Document')
            return res.send(doc)
          })
        }).catch(err => {
          console.log(err);
          if (err.response.status === 400) {
            return res.send({error: 'City not found'})
          }
          res.send(error.response)
        })
      }).catch(err => {
        console.log(err.response.data.error)
        res.send({
          Error: err.response.data.error
        })
      })
    } else {
      // Save Current Location to the session
      req.session.currentLocation = cityName
      // Search has already been saved to DB - return data from MongoDB
      console.log('Listing returned from DB')
      return res.send(bars)
    }
  })
  
})

router.get('/reviews/:id', (req, res) => {
  const businessId = req.params.id
  getAccessToken().then(response => {
    if (response.data.error) throw newError(response.data.error)
    const url = `${yelpUrl}/${businessId}/reviews`
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${response.data.access_token}`
      }
    }).then(results => {
      // return the data from the response
      res.send(results.data.reviews)
    }).catch(err => {
      console.log(err.response.data)
      res.send({error: 'There was an error getting reviews from Yelp'})
    })
  }).catch(err => {
    console.log(err)
  })
})

router.post('/add-to-going/:barId', bodyParser.json(), (req, res) => {
  // Find collection based on city and query bar based on it's ObjectID
  CurrentBars.findOneAndUpdate(
    { city: req.body.city, "bars._id": req.params.barId },
    { $push: { 'bars.$.going': req.body.user }},
    { new: true },
    (err, doc) => {
      if (err) {
        console.log(err)
        return res.send({error: 'Error adding you to this bar.'})
      }
      res.send(doc)
    }
  )
})

router.delete('/add-to-going/:barId', bodyParser.json(), (req, res) => {
  // Find collection based on city and query bar based on it's ObjectID
  // Remove user from going list using Users ObjectID
  CurrentBars.findOneAndUpdate(
    { city: req.body.city, "bars._id": req.params.barId },
    { $pull: { 'bars.$.going': { '_id': req.body.user._id }} },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log(err)
        return res.send({error: 'Error removing you from this bar.'})
      }
      res.send(doc)
    }
  )
})

export default router
