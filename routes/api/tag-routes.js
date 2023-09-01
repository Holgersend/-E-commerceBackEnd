const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll ({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json({ message: 'No tags found!'});
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try { 
    const allTags = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!allTags) {
      res.status(404).json({message: 'No Tag found with this ID!'});
      return;
    }
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await newTag.create(
      req.body
    );
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const allTags = await allTags.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!allTags) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
