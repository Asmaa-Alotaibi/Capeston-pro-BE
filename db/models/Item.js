module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
      allwaNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allwaNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allwaNull: false,
    },
  });
  return Item;
};
