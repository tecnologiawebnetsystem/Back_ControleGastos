const express = require("express")
const router = express.Router()
const movimentacaoController = require("../controllers/movimentacaoController")

router.get("/", movimentacaoController.listarMovimentacoes)
router.get("/resumo", movimentacaoController.obterResumoMovimentacoes)
router.get("/:id", movimentacaoController.obterMovimentacao)
router.post("/", movimentacaoController.criarMovimentacao)
router.put("/:id", movimentacaoController.atualizarMovimentacao)
router.delete("/:id", movimentacaoController.excluirMovimentacao)

module.exports = router

