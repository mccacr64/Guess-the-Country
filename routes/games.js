const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games");
const authController = require("../controllers/auth");
const { ensureAuth } = require("../middleware/auth");

router.get("/survival", gamesController.getSurvival);
// router.put("/survival", gamesController.threeLives);
router.get("/timeTrial", gamesController.getTimeTrial);
router.get("/hardMode", gamesController.getHardMode);
router.get("/gameOver", gamesController.getGameOver);

// router.get("/gameOver", gamesController.gameOver);

router.put("/survival/survivalScore", gamesController.survivalScore)
// router.put("/survival/survivalLives", gamesController.survivalLives)

module.exports = router;