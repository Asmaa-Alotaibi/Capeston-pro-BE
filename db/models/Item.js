module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    booked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    needDelivery: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    QRvalue: {
      type: DataTypes.STRING,
    },
  });
  return Item;
};
