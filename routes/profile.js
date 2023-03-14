const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const profileController = require("../controllers/profile");
const { ensureAuth } = require("../middleware/auth");

// Change Users Information
router.get("/:id", ensureAuth, profileController.getUserProfile);
router.put("/changeInfo/:id", profileController.changeInfo);
// router.put("/changeInfo/:id", upload.single("file"), profileController.changeInfo);

// // Change Users Motto
// router.put("/changeMotto/:id", profileController.changeMotto);

// // Change Users Profile Picture
// router.put("/changePicture/:id", profileController.changePicture);

module.exports = router;