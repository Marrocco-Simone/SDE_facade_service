require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router");
const { requestLogger } = require("./middleware");
const { serverOnline } = require("./controllers");

// Set up the server
const app = express();
app.use(express.json());
app.use(cors());

app.use(requestLogger);
app.get("/", serverOnline);
app.use("/api", router);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
