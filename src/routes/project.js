const express = require("express");
const ProjectApi = require("../api/project");

const router = express.Router();

router.post("/", ProjectApi.criarProjeto);
router.put("/:id", ProjectApi.alterarProjeto);
router.delete("/:id", ProjectApi.deletarProjeto);
router.get("/", ProjectApi.listarProjetos);

module.exports = router;
