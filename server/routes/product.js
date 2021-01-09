const router = require("express").Router();
const Product = require("../models/product");
const upload = require("../middlewares/upload-photo")

router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    const product = new Product();
    product.title = req.body.title;
    product.price = req.body.price;
    product.category = req.body.category;
    product.photo = req.file.location;
    product.description = req.body.description;
    product.owner = req.body.owner;

    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    res.json({
      status: true,
      message: "Successfully Saved",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET a single product
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.json({
      success: true,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// PUT/update a single product
router.put("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          photo: req.body.photo,
          description: req.body.description,
          stockQuantity: req.body.stockQuantity,
          owner: req.body.ownerID,
        },
      },
      { upsert: true }
    );

    res.json({
      success: true,
      updatedProduct: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE a single product
router.delete("/products/:id", async (req, res) => {
  try {
    const deleteProduct = await Product.findOneAndDelete({ _id: req.params.id });
    if (deleteProduct) {
  res.json({
    status: true,
    message: "Successfully deleted",
  });
    }
  
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
