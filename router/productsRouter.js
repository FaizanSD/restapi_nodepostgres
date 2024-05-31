const router = require("express").Router();

const {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/productsController.js");

// Define routes
router.get("/api/products", getProducts);
router.get("/api/products/:id", getProductById);
router.post("/api/products", addProduct);
router.put("/api/products/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);

module.exports = router;
