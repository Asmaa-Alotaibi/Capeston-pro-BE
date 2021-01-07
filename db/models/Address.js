module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    block: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avenue: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    house: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flat: {
      type: DataTypes.STRING,
    },
  });
  return Address;
};
