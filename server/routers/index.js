const router = require('express').Router()
const authentication = require('../middlewares/authentications')
// const errorHandler = require('../middlewares/errorHandler')
const AuthController = require('../controllers/authController')
const Controller = require('../controllers/controller')
// const errorHandler = require('../middlewares/errorHandler')


//no auth needed
router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/google-login', AuthController.googleLogin)
router.use(authentication)
router.get('/api/recommendations', Controller.handleRecommendation)
router.post('/api/recommendations', Controller.handleRecommendation)
router.post('/my-trips', Controller.saveTrip)
router.get('/tripList', Controller.readMyTrip)
// router.get('/recommendations', Controller.handleRecommendation)


// Error handler


module.exports = router
