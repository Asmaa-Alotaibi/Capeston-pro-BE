const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  profilesList,
  profileUpdate,
  fetchProfile,
} = require("../controllers/profileController");
const passport = require("passport");

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    const err = new Error("Profile Not Found");
    err.status = 404;
    next(err);
  }
});

/*get list of profiles*/
router.get("/", profilesList);

/* Update profile*/
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileUpdate
);

module.exports = router;
