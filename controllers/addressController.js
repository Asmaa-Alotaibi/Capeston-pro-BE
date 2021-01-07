const { Address, User } = require("../db/models");

exports.fetchAddress = async (addressId, next) => {
  try {
    const address = await Address.findByPk(addressId);
    return address;
  } catch (error) {
    next(error);
  }
};

/*get list of addresses*/

exports.addressesList = async (req, res, next) => {
  try {
    const adresses = await Address.findAll({
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      include: {
        model: User,
        as: "user",
        attributes: ["name"],
      },
    });
    console.log("adresses", adresses);
    res.json(adresses);
  } catch (err) {
    next(err);
  }
};

/* create  address*/

exports.addressCreate = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const newAddress = await Address.create(req.body);
    res.status(201).json(newAddress);
  } catch (err) {
    next(err);
  }
};

/* delete address*/

exports.addressDelete = async (req, res, next) => {
  try {
    await req.address.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
/* update address*/

exports.addressUpdate = async (req, res, next) => {
  try {
    await req.address.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
