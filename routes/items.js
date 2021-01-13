const express = require("express");
const passport = require("passport");
const {
  createItem,
  itemList,
  fetchItems,
  deleteItem,
  updateItem,
  requestItem,
  deliverItem,
  goneItem,
  needDelivery,
} = require("../controllers/itemController");
const router = express.Router();
const upload = require("../middleware/multer");

//ItemList
router.get("/", itemList);
//create Item
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createItem
);

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
router.delete(
  "/:itemId",
  passport.authenticate("jwt", { session: false }),
  deleteItem
);

//update Item
router.put(
  "/:itemId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateItem
);

//request and item
router.put(
  "/request/:itemId",
  passport.authenticate("jwt", { session: false }),
  requestItem
);
// driver route
router.put(
  "/delivery/:itemId",
  passport.authenticate("jwt", { session: false }),
  deliverItem
);
router.put(
  "/needDelivery/:itemId",
  passport.authenticate("jwt", { session: false }),
  needDelivery
);
// gone Item
router.put(
  "/gone/:itemId",
  passport.authenticate("jwt", { session: false }),
  goneItem
);

module.exports = router;
