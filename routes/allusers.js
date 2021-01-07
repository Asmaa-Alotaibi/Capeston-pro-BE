const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  usersList,
  userUpdate,
  fetchUser,
} = require("../controllers/userController");

router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUser(userId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("User Not Found");
    err.status = 404;
    next(err);
  }
});

/*get list of users*/
router.get("/", usersList);

/* Update user*/
router.put("/:userId", upload.single("image"), userUpdate);

module.exports = router;
