const express = require("express")
const router = express.Router()
const bancoController = require("../controllers/bancoController")
const authMiddleware = require("../middlewares/authMiddleware")

// Apply authentication middleware to all bank routes
router.use(authMiddleware)

// Routes for banks
router.get("/", bancoController.listarBancos)
router.post("/", bancoController.criarBanco)
router.get("/:id", bancoController.obterBanco)
router.put("/:id", bancoController.atualizarBanco)
router.delete("/:id", bancoController.excluirBanco)

module.exports = router

