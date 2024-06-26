const express = require("express");
const UserApi = require("../api/user");

const router = express.Router();

router.post("/", UserApi.criarUsuario);
router.put("/:id", UserApi.alterarUsuario);
router.delete("/:id", UserApi.deletarUsuario);
router.get("/", UserApi.listarUsuario);

module.exports = router;
