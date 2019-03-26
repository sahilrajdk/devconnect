const express = require("express");
const router = express.Router();

// @route GET api/users/test
// @desc tests users route
// Access Public
router.get("/test", (req, res) =>
  res.json({ message: "Users endpoint works" })
);

module.exports = router;
