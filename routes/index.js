const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware")

const authRoutes = require("./authRoutes")
const usuarioRoutes = require("./usuarioRoutes")
const categoriaRoutes = require("./categoriaRoutes")
const bancoRoutes = require("./bancoRoutes")
const despesasRoutes = require("./despesasRoutes")
const tipoContratacaoRoutes = require("./tipoContratacaoRoutes")
const empresasRoutes = require("./empresasRoutes")
const entradasRoutes = require("./entradasRoutes")
const tipoOperacaoRoutes = require("./tipoOperacaoRoutes")
const poupancaRoutes = require("./poupancaRoutes")

// Rotas que não requerem autenticação
router.use("/auth", authRoutes)

// Aplicar middleware de autenticação às rotas protegidas
router.use("/usuarios", authMiddleware, usuarioRoutes)
router.use("/categorias", authMiddleware, categoriaRoutes)
router.use("/bancos", authMiddleware, bancoRoutes)
router.use("/despesas", authMiddleware, despesasRoutes)
router.use("/tipos-contratacao", authMiddleware, tipoContratacaoRoutes)
router.use("/empresas", authMiddleware, empresasRoutes)
router.use("/entradas", authMiddleware, entradasRoutes)
router.use("/tipos-operacao", authMiddleware, tipoOperacaoRoutes)
router.use("/poupancas", authMiddleware, poupancaRoutes)

module.exports = router

