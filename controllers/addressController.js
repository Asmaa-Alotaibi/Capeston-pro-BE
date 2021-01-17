const { Address, Profile } = require("../db/models");

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
      include: {
        model: Profile,
        as: "profile",
        attributes: ["firstName", "lastName"],
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
    if (req.user.id === req.address.userId) {
      await req.address.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
/* update address*/

exports.addressUpdate = async (req, res, next) => {
  try {
    if (req.address.userId === req.user.id) {
      await req.address.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
