var express = require("express");
const Quiz = require("../model/quiz");
var router = express.Router();

/* GET users listing. */
router.get("/get-question-by-id/:quizId", async function (req, res, next) {
  try {
    const questions = await Quiz.findById({ _id: req.params.quizId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add-question/:quizId", async function (req, res, next) {
  try {
    const quiz = await Quiz.findById({ _id: req.params.quizId });
    quiz.questions.push(req.body);
    await quiz.save();
    res.json({ message: "Question added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
