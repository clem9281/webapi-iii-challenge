const express = require("express");
const userDb = require("../data/helpers/userDb");

const router = express.Router();

// middleware for user post route only
const capitalizeName = require("../customMiddleware");

router
  .route("/")
  // get all users
  .get(async (req, res) => {
    try {
      const users = await userDb.get();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Sorry, we couldn't find the users" });
    }
  })
  // add new user
  .post(capitalizeName, async (req, res) => {
    try {
      const newPost = await userDb.insert(req.body);
      const posts = await userDb.get();
      res.status(201).json(posts);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't add a user at this time" });
    }
  });
//   .put(capitalizeName, async (req, res) => {
//     try {
//       const newUser = await userDb.
//     } catch (error) {}
//   });

module.exports = router;
