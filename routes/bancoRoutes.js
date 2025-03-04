const express = require("express")
const router = express.Router()
const bancoController = require("../controllers/bancoController")

router.get("/", bancoController.listarBancos)
router.get("/:id", bancoController.obterBanco)
router.post("/", bancoController.criarBanco)
router.put("/:id", bancoController.atualizarBanco)
router.delete("/:id", bancoController.excluirBanco)

module.exports = router

