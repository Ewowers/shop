const { Router } = require("express");
const telegram = require("node-telegram-bot-api");
const router = Router();
const token = "1809956074:AAG4d_aYm0UulLX_kwYZ4JgT5oMymvWlOv8";
const bot = new telegram(token, { polling: true });
bot.on("message", (msg) => console.log(msg));
router.get("/", (req, res) => res.render("orders"));
router.post("/", (req, res) => {
  let str = `Имя: ${req.body.Name}\nТелефон: ${req.body.Phone}\nАдресс: ${req.body.Home}\nКоментарий: ${req.body.Comment}\nКорзина: \n`;
  let basket = req.body.basket;
  basket = basket.map((item) => {
    return ` Название: ${item.name},\n Цена: ${item.prise},\n количество: ${item.que}`;
  });
  str += basket.join("\n");
  bot.sendMessage("937257547", str);
  res.send(true);
});
module.exports = router;
