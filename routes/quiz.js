var express = require("express");
const Quiz = require("../model/quiz");
const QuizLink = require("../model/quizLink");
var router = express.Router();

/* GET home page. */
router.get("/get-all-quiz", async function (req, res) {
  try {
    const quizes = await Quiz.find();
    res.json(quizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create", async function (req, res, next) {
  try {
    const quiz = new Quiz({
      title: req.body.title,
    });
    await quiz.save();
    res.json({ message: "Quiz created successfully", quizId: quiz._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/attend-quiz/:quizId", async function (req, res, next) {
  try {
    const quiz = await Quiz.findById(
      { _id: req.params.quizId },
      {
        "questions.options.isCorrect": 0,
        "questions.options.mark": 0,
      }
    );
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/submit-quiz/:quizId", async function (req, res, next) {
  try {
    const quiz = await Quiz.findById({ _id: req.params.quizId });
    let totalMark = 0;
    req.body.answers.forEach((item) => {
      const question = quiz.questions.id(item.questionId);
      const option = question.options.id(item.optionId);
      if (option.isCorrect) {
        totalMark += option.mark;
      }
    });

    // Form the full response with question, option, and correct answer
    const response = req.body.answers.map((item) => {
      const question = quiz.questions.id(item.questionId);
      const option = question.options.id(item.optionId);
      return {
        questionId: question._id,
        selectedOptionId: option._id,
        isCorrect: option.isCorrect,
      };
    });

    const quizLink = new QuizLink({
        quizId: req.params.quizId,
      score: totalMark,
      response,
    });
    await quizLink.save();

    res.json({ score: totalMark, response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
