const express = require("express")
const router = express.Router()
const statusPagamentoController = require("../controllers/statusPagamentoController")

router.get("/", statusPagamentoController.listarStatusPagamento)
router.get("/:id", statusPagamentoController.obterStatusPagamento)
router.post("/", statusPagamentoController.criarStatusPagamento)
router.put("/:id", statusPagamentoController.atualizarStatusPagamento)
router.delete("/:id", statusPagamentoController.excluirStatusPagamento)

module.exports = router

