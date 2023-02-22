require("dotenv").config();
const express = require("express");
const { forwardFromUrl, serverOnline } = require("./controllers");
const { authenticateToken } = require("./middleware");

const data_service_url = process.env.DATA_SERVICE_URL;
const create_content_service_url = process.env.CREATE_CONTENT_SERVICE_URL;

const router = express.Router();

router.get("/", serverOnline);

// * data layer routes
router.post("/login", forwardFromUrl(`${data_service_url}/db/login`));
router.get(
  "/get",
  authenticateToken,
  forwardFromUrl(`${data_service_url}/db/get`)
);
router.get(
  "/get/:contentId",
  authenticateToken,
  forwardFromUrl(`${data_service_url}/db/get/:contentId`, 'contentId')
);
router.put(
  "/update/:contentId",
  authenticateToken,
  forwardFromUrl(`${data_service_url}/db/update/:contentId`, 'contentId')
);

// * create content layer routes
router.post(
  "/prompt",
  authenticateToken,
  forwardFromUrl(`${create_content_service_url}/prompt`)
);

module.exports = { router };
