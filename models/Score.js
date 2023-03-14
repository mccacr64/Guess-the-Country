const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  likes: {
    type: Number,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  survival: {
    type: Number,
    required: false,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  timeTrial: {
    type: Number,
    required: false,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  hardMode: {
    type: Number,
    required: false,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowercase plural of name 
module.exports = mongoose.model("Score", ScoreSchema);
