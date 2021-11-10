const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tagData = await Tag.findAll({
  // be sure to include its associated Product data
  include: [{ model: Product }]
});
res.json(tagData)
});

router.get('/:id', async (req, res) => {
  
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
  // be sure to include its associated Product data
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});


  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Book.update( req.body, {
    where: {
      book_id: req.params.book_id,
    },
  })
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});


  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
    Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
