const mongoose = require("mongoose");

const quizLinkSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  score: {
    type: Number,
  },
  response: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
      selectedOptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
      isCorrect: {
        type: Boolean,
      },
    },
  ],
});

const QuizLink = mongoose.model("QuizLink", quizLinkSchema);

module.exports = QuizLink;
