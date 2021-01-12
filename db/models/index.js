"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// one-to-many relation
db.User.hasMany(db.Address, { as: "addresses", foreignKey: "userId" });
db.Address.belongsTo(db.User, { as: "user" });

// three relation to item (one-to-many)
db.User.hasMany(db.Item, { as: "itemOffered", foreignKey: "ownerId" });
db.Item.belongsTo(db.User, { as: "owner" });

db.User.hasMany(db.Item, { as: "itemRequested", foreignKey: "recipientId" });
db.Item.belongsTo(db.User, { as: "recipient" });

db.User.hasMany(db.Item, { as: "itemDelivered", foreignKey: "driverId" });
db.Item.belongsTo(db.User, { as: "driver" });

//One user has one profile
db.User.hasOne(db.Profile, { as: "profile", foreignKey: "userId" });
// one profile belongs to one user
db.Profile.belongsTo(db.User, { as: "user" });

// one-to-many relation
db.Address.hasMany(db.Item, { as: "items", foreignKey: "addressId" });
db.Item.belongsTo(db.Address, { as: "address" });

module.exports = db;
