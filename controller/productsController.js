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
    const product = await db.query("SELECT * FROM products WHERE id = $1", [
      parseInt(req.params.id),
    ]);

    if (product.rows.length === 0) {
      return res.status(404).send("Product not found!");
    }

    const name = req.body.name || product.rows[0].name;
    const description = req.body.description || product.rows[0].description;
    const price = req.body.price || product.rows[0].price;
    const quantity = req.body.quantity || product.rows[0].quantity;

    const query = `
        UPDATE products
        SET name = $1, description = $2, price = $3, quantity = $4
        WHERE id = $5
        RETURNING *;
    `;

    const result = await db.query(query, [
      name,
      description,
      price,
      quantity,
      parseInt(req.params.id),
    ]);

    res.send(result.rows[0]);
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
