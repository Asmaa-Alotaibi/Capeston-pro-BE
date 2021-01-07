module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
      allawNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allawNull: false,
    },
    gone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    category: {
      type: DataTypes.STRING,
      allawNull: false,
    },
  });
  return Item;
};
