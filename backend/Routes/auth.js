const express = require("express");
// simply use router to handle all the routes
const router = express.Router();
router.get("/:message", (req, res) => {
  res.send(req.params.message);
});

module.exports = router;
