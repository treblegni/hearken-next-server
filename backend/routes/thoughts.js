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

router.post('/',createThought)
router.delete('/:id',deleteThought)
router.get('/:id',getThought)
router.get('/',getThoughts)
router.put('/:id',updateThought)

module.exports = router