import { Router } from 'express'

import yelp from './yelp'

const router = Router()

// Add USERS Routes
router.use(yelp)

export default router
