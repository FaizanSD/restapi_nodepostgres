const { db } = require("../index.js");
const createProductsTable = require("./create_products_table.js");

const dbMigration = async () => {
  console.log("BEGIN TRANSACTION"); //  begin trnsaction

  // use single client for transactions
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    await client.query(createProductsTable);

    await client.query("COMMIT"); // commit transaction

    console.log("END DB MIGRATION");
  } catch (err) {
    await client.query("ROLLBACK"); // rollback

    console.log("DB MIGRATION FAILED");

    throw err;
  } finally {
    client.release();
  }
};

module.exports = dbMigration;
