const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  addressesList,
  addressCreate,
  addressUpdate,
  addressDelete,
  fetchAddress,
} = require("../controllers/addressController");

// adressId from Param
router.param("addressId", async (req, res, next, addressId) => {
  console.log(`this is address id: ${addressId}`);
  const address = await fetchAddress(addressId, next);
  if (address) {
    req.address = address;
    next();
  } else {
    const err = new Error("address Not Found");
    err.status = 404;
    next(err);
  }
});

/*get list of addresses not sure of athunticate !*/
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  addressesList
);

/* create addrress*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addressCreate
);
/* Update address*/
router.put(
  "/:addressId",
  passport.authenticate("jwt", { session: false }),
  addressUpdate
);

/* delete address*/
router.delete(
  "/:addressId",
  passport.authenticate("jwt", { session: false }),
  addressDelete
);

module.exports = router;