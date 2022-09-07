const
  express = require('express'),
  router = express.Router(),
  {
    createUser,
    getUser,
    getUsers,
    loginUser,
  } = require('../controllers/usersControllers')

const {protect} = require('../middleware/authMiddleware')

router.post('/',createUser)
router.get('/:id',protect,getUser)
router.get('/',protect,getUsers)
router.post('/login',loginUser)

module.exports = router