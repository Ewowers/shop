const { Router } = require("express");
const Product = require("./Product");
const router = Router();
function arr(clothes, accessories, figurines, backpacks) {}
router.get("/", async (req, res) => {
  let product = await Product.find().lean();
  let backpacks = await Product.find({ type: "backpacks" }).lean();
  let figurines = await Product.find({ type: "figurines" }).lean();
  let accessories = await Product.find({ type: "accessories" }).lean();
  let clothes = await Product.find({ type: "clothes" }).lean();

  clothes = await clothes.filter((item, i) => {
    if (i < 4) return item;
  });
  accessories = accessories.filter((item, i) => {
    if (i < 4) return item;
  });
  figurines = figurines.filter((item, i) => {
    if (i < 4) return item;
  });
  backpacks = backpacks.filter((item, i) => {
    if (i < 4) return item;
  });
  product = [...clothes, ...accessories, ...figurines, ...backpacks];
  res.render("home", {
    isHome: true,
    arr: product,
  });
});

module.exports = router;
