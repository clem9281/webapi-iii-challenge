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

router
  .route("/:id")
  // update user
  .put(capitalizeName, async (req, res) => {
    try {
      const newUser = await userDb.update(req.params.id, req.body);
      if (newUser === 0) {
        return res
          .status(404)
          .json({ error: "There is no user with that id number" });
      }
      const users = await userDb.get();
      res.status(201).json(users);
    } catch (error) {
      res.status(500).json({ error: "Sorry, we couldn't update that user" });
    }
  })
  // delete user
  .delete(async (req, res) => {
    try {
      const deleted = await userDb.remove(req.params.id);
      if (deleted === 0) {
        return res
          .status(404)
          .json({ error: "There is no user with that id number" });
      }
      const users = await userDb.get();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Sorry, we couldn't delete that user" });
    }
  });

module.exports = router;
