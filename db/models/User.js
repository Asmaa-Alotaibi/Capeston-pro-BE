module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    donater: {
      type: DataTypes.BOOLEAN,
    },
    recipient: {
      type: DataTypes.BOOLEAN,
    },
    driver: {
      type: DataTypes.BOOLEAN,
    },
  });
  return User;
};
