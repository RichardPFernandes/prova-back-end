const express = require("express");
const UserApi = require("../api/user");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", UserApi.criarUsuario);
router.post("/login", UserApi.login);
router.put("/:id", auth.handle, UserApi.alterarUsuario);
router.delete("/:id", auth.handle, UserApi.deletarUsuario);

module.exports = router;
