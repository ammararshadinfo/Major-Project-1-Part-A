const express = require("express");
const router = express.Router();

//Index - Users
router.get("/", (req, res) => {
  res.send("Get for Users");
});

//Show - Users
router.get("/:id", (req, res) => {
  res.send("Get for Show User id");
});

//Post - Users
router.post("/", (req, res) => {
  res.send("Post for Users");
});

//Delete - users

router.delete("/:id", (req, res) => {
  res.send("Delete for User id");
});

module.exports = router;
