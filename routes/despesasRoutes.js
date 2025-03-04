const express = require("express")
const router = express.Router()
const despesasController = require("../controllers/despesasController")

router.get("/", despesasController.listarDespesas)
router.get("/:id", despesasController.obterDespesa)
router.post("/", despesasController.criarDespesa)
router.put("/:id", despesasController.atualizarDespesa)
router.delete("/:id", despesasController.excluirDespesa)

module.exports = router

