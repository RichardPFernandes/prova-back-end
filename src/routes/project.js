const express = require("express");
const ProjectApi = require("../api/project");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();
router.use(auth.handle);
router.post("/", ProjectApi.criarProjeto);
router.put("/:id", ProjectApi.alterarProjeto);
router.delete("/:id", ProjectApi.deletarProjeto);
router.get("/", ProjectApi.listarProjetos);

module.exports = router;
