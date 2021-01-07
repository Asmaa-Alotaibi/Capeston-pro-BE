const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/models");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const userRoutes = require("./routes/users");
const allusersRoutes = require("./routes/allusers");
//const addressRoutes = require("./routes/addresses"); // not done yet
const path = require("path");

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(userRoutes);

// routes
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/allusers", allusersRoutes);
//app.use("/address", addressRoutes);

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

//Import Routers
const itemRoutes = require("./routes/items");

//Routes
app.use("/items", itemRoutes);

// if path is not found 404 status
app.use((req, res, nex) => {
  res.status(404).json({
    message: err.message || "Page Not Found",
  });
});

run();
