const express = require("express")
const router = express.Router()
const tipoOperacaoController = require("../controllers/tipoOperacaoController")

// Removida a necessidade de autenticação para rotas de tipo de operação
router.get("/", tipoOperacaoController.listarTiposOperacao)
router.get("/:id", tipoOperacaoController.obterTipoOperacao)
router.post("/", tipoOperacaoController.criarTipoOperacao)
router.put("/:id", tipoOperacaoController.atualizarTipoOperacao)
router.delete("/:id", tipoOperacaoController.excluirTipoOperacao)

module.exports = router

