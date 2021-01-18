const { object } = require("underscore");
const { Item, User } = require("../db/models");

exports.fetchItems = async (itemId, next) => {
  try {
    const item = await Item.findByPk(itemId);
    return item;
  } catch (error) {
    next(error);
  }
};

exports.itemList = async (req, res, next) => {
  try {
    const items = await Item.findAll({
      include: {
        model: User,
        as: "owner",
        attributes: ["username", "phone"],
      },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.ownerId = req.user.id;
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.log("sorry the item couldn't be added");
    next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    if (req.item.ownerId === req.user.id) {
      await req.item.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    if (req.item.ownerId === req.user.id) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      await req.item.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

// Request an item

exports.requestItem = async (req, res, next) => {
  try {
    const item = req.item;
    if (!item.booked) {
      await item.update({
        ...item,
        booked: !item.booked,
        recipientId: req.user.id,
      });
      res.status(204).end(); // Meshary said clever! << well done Abduallah :)
    } else if (item.recipientId === req.user.id) {
      await item.update({
        ...item,
        booked: !item.booked,
        recipientId: null,
        needDelivery: null,
        QRvalue: null,
      });
      res.status(204).end();
    } else {
      const err = new Error("Item is not available");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

// the driver can choose to book and item to deliver it !!

exports.deliverItem = async (req, res, next) => {
  try {
    const item = req.item;
    // the item must be booked and has item.needDelivery to be true
    if (!item.driverId && item.needDelivery) {
      await item.update({ ...item, driverId: req.user.id });
      res.status(201).end();
    } else if (item.driverId === req.user.id) {
      await item.update({ ...item, driverId: null });
      res.status(201).end();
    } else if (!item.needDelivery) {
      const err = new Error("This item is not assiagned to be delivered");
      err.status = 404;
      next(err);
    } else {
      const err = new Error(
        "This item has already been scheduled to be delivered, Thanks"
      );
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

// need Delivery
exports.needDelivery = async (req, res, next) => {
  try {
    const item = req.item;
    if (!item.needDelivery) {
      await item.update({ ...item, needDelivery: !item.needDelivery });
      res.status(201).end();
    } else {
      await item.update({ ...item, needDelivery: !item.needDelivery });
      res.status(201).end();
    }
  } catch (error) {
    next(error);
  }
};

// mark an item to be gone!

exports.goneItem = async (req, res, next) => {
  try {
    const item = req.item;
    await item.update({ ...item, gone: !item.gone });
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};
