require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { router } = require("./router");
const { requestLogger, pageNotFound } = require("./middleware");
const { serverOnline } = require("./controllers");

// Set up the server
const app = express();
app.use(express.json({ limit: "16mb" }));
app.use(cors({ origin: true }));

app.use(requestLogger);
app.get("/", serverOnline);
app.use("/api", router);

// * swagger endpoint
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const file = fs.readFileSync("./docs.yml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(pageNotFound);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
