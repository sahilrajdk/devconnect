const express = require("express");
const router = express.Router();

// @route GET api/profile/test
// @desc tests profile route
// Access Public
router.get("/test", (req, res) =>
  res.json({ message: "Profile endpoint works" })
);

module.exports = router;
