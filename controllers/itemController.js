const { object } = require("underscore");
const { Item } = require("../db/models");

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
    const items = await Item.findAll();
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
    if (!item.gone) {
      await item.update({
        ...item,
        gone: !item.gone,
        recipientId: req.user.id,
      });
      res.status(204).end();
    } else if (item.recipientId === req.user.id) {
      await item.update({
        ...item,
        gone: !item.gone,
        recipientId: null,
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
