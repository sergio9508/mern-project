const { Router } = require("express");
const router = Router();

const {
  getUser,
  createUser,
  getUsers,
} = require("../controllers/users_controller");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser);

module.exports = router;
