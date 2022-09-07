const
  express = require('express'),
  router = express.Router(),
  {
    createThought,
    deleteThought,
    getThought,
    getThoughts,
    updateThought
  } = require('../controllers/thoughtsControllers')

const {protect} = require('../middleware/authMiddleware')

router.post('/',protect,createThought)
router.delete('/:id',protect,deleteThought)
router.get('/:id',protect,getThought)
router.get('/',protect,getThoughts)
router.put('/:id',protect,updateThought)

module.exports = router