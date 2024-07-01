const express = require("express");
const TaskApi = require("../api/task");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(auth.handle);
router.post("/", TaskApi.criarTask);
router.put("/:id", TaskApi.alterarTask);
router.delete("/:id", TaskApi.deletarTask);
router.get("/", TaskApi.listarTasks);

module.exports = router;
