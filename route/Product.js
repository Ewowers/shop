const { Schema, model } = require("mongoose");

const shema = new Schema({
  name: String,
  prise: Number,
  type: String,
  que: Number,
  img: String,
});
module.exports = model("geekProduct", shema);
