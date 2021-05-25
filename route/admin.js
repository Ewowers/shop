const { Router } = require("express");
const Product = require("./Product");
const router = Router();
router.get("/", async (req, res) => {
  let product = await Product.find({});

  res.render("admin");
});
router.post("/", async (req, res) => {
  let product = new Product({
    name: req.body.name,
    prise: parseInt(req.body.prise),
    type: req.body.type,
    que: req.body.que,
    img: "/upload/" + req.file.filename,
  });
  await product.save();
  res.redirect("/admin");
});
module.exports = router;
