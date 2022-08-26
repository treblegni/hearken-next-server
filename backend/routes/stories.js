const
  express = require('express'),
  router = express.Router(),
  {
    createStory,
    deleteStory,
    getStories,
    getStory,
    updateStory
  } = require('../controllers/storiesControllers')

router.get('/',getStories)
router.get('/:id',getStory)
router.post('/',createStory)
router.put('/:id',updateStory)
router.delete('/:id',deleteStory)

module.exports = router