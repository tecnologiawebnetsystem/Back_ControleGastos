const express = require("express")
const router = express.Router()
const cartaoCreditoController = require("../controllers/cartaoCreditoController")

router.get("/", cartaoCreditoController.listarCartoesCredito)
router.get("/:id", cartaoCreditoController.obterCartaoCredito)
router.post("/", cartaoCreditoController.criarCartaoCredito)
router.put("/:id", cartaoCreditoController.atualizarCartaoCredito)
router.delete("/:id", cartaoCreditoController.excluirCartaoCredito)

module.exports = router

