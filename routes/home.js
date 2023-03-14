const express = require("express");
const router = express.Router();
// const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
// const postsController = require("../controllers/posts");
// const { ensureAuth } = require("../middleware/auth");

router.get("/home", homeController.getHome);

module.exports = router;