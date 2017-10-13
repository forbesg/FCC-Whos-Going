import { Router } from 'express'
import axios from 'axios'
import qs from 'qs'

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

/* GET city by ID. */
router.get('/yelp/:city', function (req, res, next) {
  const cityName = req.params.city
  getAccessToken().then(response => {
    if (response.data.error) throw newError(response.data.error)
    // return response.data
    const url = `${yelpUrl}/search?location=${cityName}&term=bar`
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${response.data.access_token}`
      }
    }).then(results => {
      res.send(results.data.businesses)
    }).catch(err => {
      console.log(err);
      res.send({
        Error: err
      })
    })
  }).catch(err => {
    console.log(err.response.data.error)
    res.send({
      Error: err.response.data.error
    })
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
      res.send({err})
    })
  }).catch(err => {
    console.log(err)
  })
})

export default router
