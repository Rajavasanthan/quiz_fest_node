const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
      },
      options: [
        {
          value: {
            type: String,
          },
          isCorrect: {
            type: Boolean,
          },
          mark: {
            type: Number,
          },
        },
      ],
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
