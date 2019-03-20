const express = require("express");
const postDb = require("../data/helpers/postDb");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Sorry, we couldn't find the posts" });
  }
});

module.exports = router;
