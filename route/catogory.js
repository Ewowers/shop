const { Router } = require("express");
const Product = require("./Product");
const router = Router();
router.get("/:id", async (req, res) => {
  let product = await Product.find({ type: req.params.id }).lean();
  res.render("category", {
    isCategory: true,
    title: "Одежда",
    product,
  });
});

module.exports = router;
