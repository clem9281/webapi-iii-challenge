const express = require("express");
const postDb = require("../data/helpers/postDb");
const userDb = require("../data/helpers/userDb");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    // get all the posts
    try {
      const posts = await postDb.get();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Sorry, we couldn't find the posts" });
    }
  })
  .post(async (req, res) => {
    try {
      console.log(req.body);
      //   if (!req.body.text) {
      //     return res
      //       .status(400)
      //       .json({ error: "You must include text content for your post." });
      //   }
      const newPost = await postDb.insert(req.body);
      console.log(newPost);
      const posts = await postDb.get();
      console.log(posts);
      res.status(201).json(posts);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't add a post right now" });
    }
  });

router.route("/:id").get(async (req, res) => {
  try {
    const userPosts = await userDb.getUserPosts(req.params.id);
    res.status(200).json(userPosts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Sorry, we can't find any posts for that user" });
  }
});

module.exports = router;
