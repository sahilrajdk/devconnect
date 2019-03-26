const express = require("express");
const router = express.Router();

// @route GET api/posts/test
// @desc tests Posts route
// Access Public
router.get("/test", (req, res) =>
  res.json({ message: "Posts endpoint works" })
);

module.exports = router;
