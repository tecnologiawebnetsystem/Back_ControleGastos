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
const movimentacaoRoutes = require("./movimentacaoRoutes")
const cartaoCreditoRoutes = require("./cartaoCreditoRoutes")
const statusPagamentoRoutes = require("./statusPagamentoRoutes")

// Rotas públicas (sem autenticação)
router.use("/auth", authRoutes)

// Middleware de autenticação para rotas protegidas
router.use(authMiddleware)

// Rotas protegidas
router.use("/usuarios", usuarioRoutes)
router.use("/categorias", categoriaRoutes)
router.use("/bancos", bancoRoutes)
router.use("/despesas", despesasRoutes)
router.use("/tipos-contratacao", tipoContratacaoRoutes)
router.use("/empresas", empresasRoutes)
router.use("/entradas", entradasRoutes)
router.use("/tipos-operacao", tipoOperacaoRoutes)
router.use("/poupancas", poupancaRoutes)
router.use("/movimentacoes", movimentacaoRoutes)
router.use("/cartoes-credito", cartaoCreditoRoutes)
router.use("/status-pagamento", statusPagamentoRoutes)

module.exports = router

