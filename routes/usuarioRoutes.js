const express = require("express")
const router = express.Router()
const usuarioController = require("../controllers/usuarioController")

// Verificar se todos os métodos do controlador existem e estão sendo importados corretamente
console.log("Métodos do usuarioController:", Object.keys(usuarioController))

router.get("/", usuarioController.listarUsuarios)
router.get("/:id", usuarioController.obterUsuario)
router.post("/", usuarioController.criarUsuario)
router.put("/:id", usuarioController.atualizarUsuario)
router.delete("/:id", usuarioController.excluirUsuario)

module.exports = router

