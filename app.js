const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
//DataBase
const db = require("./db/models");
//Import Routers
const itemRoutes = require("./routes/items");
//middleware
const path = require("path");
//app
app.use(bodyParser.json());
app.use(cors());
//Routes
app.use("/items", itemRoutes);
//middleware multer
app.use("/media", express.static(path.join(__dirname, "media")));

// if path is not found 404 status
app.use((req, res, nex) => {
  res.status(404).json({
    message: err.message || "Page Not Found",
  });
});

//Error Handeling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Error With The Server",
  });
});

const run = async () => {
  try {
    await db.sequelize.sync({ force: true });
    app.listen(8000, () => {
      console.log("The App is Successfuly Worling");
    });
  } catch (error) {
    console.error(error);
  }
};
run();
