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
  // the update needs a post id, not a user id. the id endpoint below is for the user id. i wasn't sure if i should make a new endpoint for post id, or just send the post id in the body. i ended up sending it in the body, but idk what has the better user experience
  .put(async (req, res) => {
    try {
      const { text, id } = req.body;
      if (!text || !id) {
        return res.status(400).json({
          error: "You must include text content and post id for your post."
        });
      }
      const updated = await postDb.update(id, {
        text: text
      });
      if (updated === 0) {
        return res
          .status(404)
          .json({ error: "The post you are trying to update does not exist" });
      }
      const posts = await postDb.get();
      res.status(201).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Sorry, we can't update that post" });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const userPosts = await userDb.getUserPosts(req.params.id);
      res.status(200).json(userPosts);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we can't find any posts for that user" });
    }
  })
  .post(async (req, res) => {
    try {
      // if there isn't a text property on the req body return 400
      if (!req.body.text) {
        return res
          .status(400)
          .json({ error: "You must include text content for your post." });
      }
      //   if the user_id passed in doesn't match an existing user id return 404 --- it occured to me after I wrote this it might not be necessary?
      const user = await userDb.getById(req.params.id);
      if (!user) {
        return res.status(404).json({
          error: "You are an invalid user, we could not add that post"
        });
      }
      const newPost = await postDb.insert({
        text: req.body.text,
        user_id: req.params.id
      });
      const posts = await postDb.get();
      res.status(201).json(posts);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry, we couldn't add a post right now" });
    }
  });

module.exports = router;
