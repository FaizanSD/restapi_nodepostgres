const { db } = require("../db/index.js");
const getProducts = async (req, res) => {
  try {
    const query = `SELECT * FROM products;`;
    const result = await db.query(query);
    res.send(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getProductById = async (req, res) => {
  try {
    const query = `SELECT * FROM products WHERE id = $1`;
    const result = await db.query(query, [req.params.id]);
    res.send(result.rows);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).send("Internal Server Error");
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const query = `
      INSERT INTO products (name, description, price, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await db.query(query, [name, description, price, quantity]);
    res.send(result.rows[0]);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateProduct = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const query = `DELETE FROM products WHERE id = $1`;
    const result = await db.query(query, [req.params.id]);
    res.send("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getProductById,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
