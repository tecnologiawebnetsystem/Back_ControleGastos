const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const corsMiddleware = require("../middleware") // Importar o middleware personalizado

// Aplicar o middleware CORS especificamente para a rota de login
router.options("/login", corsMiddleware)
router.post("/login", corsMiddleware, authController.login)

module.exports = router

