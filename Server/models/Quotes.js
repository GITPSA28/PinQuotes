const mongoose = require("mongoose");
const quotesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dpurl: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
});

const QuoteModel = mongoose.model("quotes", quotesSchema);
module.exports = QuoteModel;
