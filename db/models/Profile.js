module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  return Profile;
};
