const { ExpectationFailed } = require("http-errors");
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

exports.creatItem = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.log("sorry the item couldn't be added");
    next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    await req.item.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.item.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
