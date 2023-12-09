const router = require("express").Router();
const storerPassword = require("../Controller/storerPassword");
const auth = require("../Middleware/auth");

router.get("/", auth, storerPassword.gettingAllData);
router.get("/:passwordId", auth, storerPassword.gettingOne);
router.post("/", auth, storerPassword.postingData);
router.patch("/:passwordId", auth, storerPassword.updatingData);
router.delete("/:passwordId", auth, storerPassword.deletingData);

module.exports = router;
