require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Set up the server
const app = express();
app.use(express.json());
app.use(cors());

// log the requets I get
function requestLogger(req, res, next) {
  console.log(`requested ${req.method} ${req.url}`);
  next();
}
app.use(requestLogger);

// basic api to tell that we're online
app.get("/", (req, res) => {
  res.send({ online: true });
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
