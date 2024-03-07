const express = require("express");
const app = express();
const mongoose = require("mongoose");
const QuotesModel = require("./models/Quotes");
const UserModel = require("./models/User");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./.env" });
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_URL2 = process.env.MONGODB_URL2;
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:".concat(
    MONGODB_URL,
    "@cluster0.",
    MONGODB_URL2,
    ".mongodb.net/PinQuote?retryWrites=true&w=majority&appName=Cluster0"
  )
);

app.get("/getQuotes", async (req, res) => {
  try {
    // Find all quotes
    const quotes = await QuotesModel.find({});

    // Create an array to store promises for finding user verification status
    const userPromises = quotes.map((quote) =>
      UserModel.findOne({ email: quote.email }).select("verified")
    );

    // Wait for all promises to resolve
    const users = await Promise.all(userPromises);

    // Combine quotes with user's verified status
    const result = quotes.map((quote, index) => ({
      ...quote.toObject(),
      verified: users[index].verified,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// app.get("/getQuotes", (req, res) => {
//   QuotesModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });
app.get("/getQuotes/:user", async (req, res) => {
  try {
    // Find the user
    const user = await UserModel.findOne({ email: req.params.user }).select(
      "verified"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find quotes associated with the user
    const quotes = await QuotesModel.find({ email: req.params.user });

    // Combine user's verified status with quotes
    const result = quotes.map((quote) => ({
      ...quote.toObject(),
      verified: user.verified,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// app.get("/getQuotes/:user", (req, res) => {
//   QuotesModel.find({ email: req.params.user }, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });
app.get("/getUser/:user", (req, res) => {
  UserModel.findOne({ username: req.params.user }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
app.post("/createQuote", async (req, res) => {
  const quoteData = req.body;
  const newQuote = new QuotesModel(quoteData);
  await newQuote.save();
  res.json(quoteData);
});

app.post("/createUser", async (req, res) => {
  const userData = req.body;
  const userExists = await UserModel.exists({ email: userData.email });
  if (userExists) {
    //res.sendStatus(409).json({ error: "User exists" });
  } else {
    const newUser = new UserModel(userData);
    await newUser.save();
    res.json(userData);
  }
});

app.delete("/deleteQuote/:id", async (req, res) => {
  const id = req.params.id;
  await QuotesModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("server run syper");
});
