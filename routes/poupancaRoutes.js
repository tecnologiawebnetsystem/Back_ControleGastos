const express = require("express")
const router = express.Router()
const poupancaController = require("../controllers/poupancaController")

router.get("/", poupancaController.listarPoupancas)
router.get("/:id", poupancaController.obterPoupanca)
router.post("/", poupancaController.criarPoupanca)
router.put("/:id", poupancaController.atualizarPoupanca)
router.delete("/:id", poupancaController.excluirPoupanca)

module.exports = router

