var express = require("express");
const QuizLink = require("../model/quizLink");
var router = express.Router();

/* GET users listing. */
router.get("/get-all-links", async function (req, res, next) {
  try {
    const quizLinks = await QuizLink.find({}, { score: 1 }).populate({
      path: "quizId",
      select: {
        title: 1,
      },
    });
    res.json(quizLinks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/link/:linkId", async function (req, res, next) {
  try {
    const quizLinks = await QuizLink.findOne(
      { _id: req.params.linkId }
    ).populate({
        path : "quizId",
    });
    res.json(quizLinks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
