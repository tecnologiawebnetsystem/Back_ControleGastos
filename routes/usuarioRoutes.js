const express = require("express")
const router = express.Router()
const usuarioController = require("../controllers/usuarioController")

// Rota para obter o usuário atual
router.get("/me", usuarioController.obterUsuarioAtual)

router.get("/", usuarioController.listarUsuarios)
router.get("/:id", usuarioController.obterUsuario)
router.post("/", usuarioController.criarUsuario)
router.put("/:id", usuarioController.atualizarUsuario)
router.delete("/:id", usuarioController.excluirUsuario)

module.exports = router

