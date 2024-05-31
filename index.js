require("dotenv/config");

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const dbMigration = require("./db/migration/index.js");

const express = require("express");
const app = express(); // Corrected variable name
const productsRouter = require("./router/productsRouter.js");

app.use(express.json());
app.use(productsRouter);

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  console.log(`Worker ${process.pid} started`);

  async function startServer() {
    await dbMigration();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Listening on port: ${port}....`);
    });
  }

  startServer(); // Corrected function call
}
