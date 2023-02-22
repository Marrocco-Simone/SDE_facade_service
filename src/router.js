require("dotenv").config();
const express = require("express");
const { authenticateToken } = require("./middleware");

const data_service_url = process.env.DATA_SERVICE_URL;
const create_content_service_url = process.env.CREATE_CONTENT_SERVICE_URL;

const router = express.Router();

function apiCall(url, method, body, token) {
  const headers = token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : null;

  const json = fetch(url, {
    method,
    headers,
    body,
  })
    .then((result) => result.json().then((json) => json))
    .catch((err) => {
      return { error: err.message };
    });

  return json;
}

// * data layer routes
router.post("/login", async (req, res) => {});
router.get("/get", authenticateToken, async (req, res) => {});
router.get("/get/:contentId", authenticateToken, async (req, res) => {});
router.put("/update/:contentId", authenticateToken, async (req, res) => {});

// * create content layer routes
router.post("/prompt", authenticateToken, async (req, res) => {});

module.exports = { router };
