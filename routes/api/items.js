const express = require("express");
const router = express.Router();

const Item = require("../../models/item");

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    post: req.body.post,
    receiver: req.body.receiver,
  });

  newItem.save().then((item) => res.json(item));
});

router.delete("/", (req, res) => {
  Item.findById(req.body.id)
    .then((items) => items.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
