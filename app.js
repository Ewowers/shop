const exprees = require("express");
const exphbs = require("express-handlebars");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const app = exprees();
// router start
const RouteHome = require("./route/home");
const admin = require("./route/admin");
const category = require("./route/catogory");
const api = require("./route/api");
const order = require("./route/order");
// router end
// midelwart start
// кто читает тот лох p.s мне было скучно
app.use(exprees.static(path.join(__dirname, "public")));
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.use(exprees.urlencoded({ extended: true }));
app.use(exprees.json());
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public", "upload"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.use(multer({ storage: storageConfig }).single("filedata"));
// midelware end
app.use("/", RouteHome);
app.use("/admin", admin);
app.use("/catogory", category);
app.use("/api", api);
app.use("/orders", order);
async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://Ewower:0H07JJt6GOqjV7cH@cluster0.x615l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        //0H07JJt6GOqjV7cH
      }
    );
    const port = process.env.PORT_APP || 8080;
    app.listen(port, () => console.log(`http://localhost:${port}`));
  } catch (e) {
    console.log("mongoose error pzd");
    console.log(e);
  }
}
start();
