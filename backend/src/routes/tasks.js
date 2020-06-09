const { Router } = require("express");
const router = Router();

const {getTasks, createTask, getTask} = require("../controllers/tasks_controller");

router.route("/").get(getTasks).post(createTask);;

router.route("/:id").get(getTask);

module.exports = router;
