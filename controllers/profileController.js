const { Profile, User } = require("../db/models");

// *fetch profile to update*/
exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};

/*get list of profiles*/
exports.profilesList = async (req, res, next) => {
  // do you need a profile list?
  try {
    const profiles = await Profile.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    });
    // console.log("Profiles", profiles);
    res.json(profiles);
  } catch (err) {
    next(err);
  }
};
/*update profile*/
exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.user.id === req.profile.userId) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      await req.profile.update(req.body);
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
