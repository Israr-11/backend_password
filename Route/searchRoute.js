const router = require("express").Router();
const searchApi = require("../Controller/searchApi");
const auth = require("../Middleware/auth");

router.get("/search", auth, searchApi.searchData);

module.exports = router;
