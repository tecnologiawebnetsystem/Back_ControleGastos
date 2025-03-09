const express = require("express")
const router = express.Router()
const logger = require("../config/logger")

// Rota de teste para verificar se o método DELETE está funcionando
router.delete("/test-delete", (req, res) => {
  logger.info("Teste de DELETE recebido com sucesso")
  res.json({ message: "Teste de DELETE bem-sucedido" })
})

module.exports = router

