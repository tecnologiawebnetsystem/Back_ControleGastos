const express = require("express")
const router = express.Router()
const tipoContratacaoController = require("../controllers/tipoContratacaoController")

// Removida a necessidade de autenticação para rotas de tipo de contratação
router.get("/", tipoContratacaoController.listarTiposContratacao)
router.get("/:id", tipoContratacaoController.obterTipoContratacao)
router.post("/", tipoContratacaoController.criarTipoContratacao)
router.put("/:id", tipoContratacaoController.atualizarTipoContratacao)
router.delete("/:id", tipoContratacaoController.excluirTipoContratacao)

module.exports = router

