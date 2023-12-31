const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categories);
  } catch (err) { 
  // be sure to include its associated Products
  res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try { 
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    
    if (!category) {
      res.status(404).json({message:` ID provided not found`});
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({message: `Failed to create a new Category`});
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: { id: req.params.id},
    });
  } catch (err) {
    res.status(500).json({message: `Failed to update!`});
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {id: req.params.id},
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
