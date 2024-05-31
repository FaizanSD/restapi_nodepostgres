const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(500),
        price NUMERIC NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1
    )
`;

module.exports = createProductsTable;
