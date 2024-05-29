const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games");
const authController = require("../controllers/auth");
const { ensureAuth } = require("../middleware/auth");

router.get("/survival", ensureAuth, gamesController.getSurvival);
// router.put("/survival", gamesController.threeLives);
router.get("/timeTrial", ensureAuth, gamesController.getTimeTrial);
router.get("/hardMode", ensureAuth, gamesController.getHardMode);
router.get("/gameOver", ensureAuth, gamesController.getGameOver);

// router.get("/gameOver", gamesController.gameOver);

router.put("/survival/survivalScore", gamesController.survivalScore)
// router.put("/survival/survivalLives", gamesController.survivalLives)

module.exports = router;