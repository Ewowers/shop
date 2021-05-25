let { Router } = require("express");
let Product = require("./Product");
let router = Router();
router.get("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  res.status(200).json(product);
});

module.exports = router;
