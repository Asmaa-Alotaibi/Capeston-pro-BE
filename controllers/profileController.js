const { Profile, User, Address } = require("../db/models");

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
// to be removed if it not used !
exports.profilesList = async (req, res, next) => {
  try {
    const profiles = await Profile.findAll({

      include: {
        model: User,
        as: "user",
        attributes: ["username", "phone"],
        include: {

          model: Address,
          as: "addresses",
        },
      ],
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
