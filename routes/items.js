const express = require("express");
const {
  creatItem,
  itemList,
  fetchItems,
  deleteItem,
  updateItem,
} = require("../controllers/itemController");
const router = express.Router();
const upload = require("../middleware/multer");

//ItemList
router.get("/", itemList);
//create Item
router.post("/", upload.single("image"), creatItem);

//fetchItem
router.param("itemId", async (req, res, next, itemId) => {
  const item = await fetchItems(itemId, next);
  if (item) {
    req.item = item;
    next();
  } else {
    const err = new Error("Sorry Item not Found");
    err.status = 404;
    next(err);
  }
});
//delete Item
router.delete("/:itemId", deleteItem);

//update Item
router.put("/:itemId", upload.single("image"), updateItem);
module.exports = router;
