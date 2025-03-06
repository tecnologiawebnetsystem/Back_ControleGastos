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

// Importar todos os controladores para listar seus métodos
const usuarioController = require("../controllers/usuarioController")
const authController = require("../controllers/authController")
const categoriaController = require("../controllers/categoriaController")
const bancoController = require("../controllers/bancoController")
const despesasController = require("../controllers/despesasController")
const tipoContratacaoController = require("../controllers/tipoContratacaoController")
const empresasController = require("../controllers/empresasController")
const entradasController = require("../controllers/entradasController")
const tipoOperacaoController = require("../controllers/tipoOperacaoController")
const poupancaController = require("../controllers/poupancaController")
const movimentacaoController = require("../controllers/movimentacaoController")
const cartaoCreditoController = require("../controllers/cartaoCreditoController")
const statusPagamentoController = require("../controllers/statusPagamentoController")

// Listar métodos de todos os controladores
console.log("\n=== MÉTODOS DOS CONTROLADORES ===")
console.log("Métodos do usuarioController:", Object.keys(usuarioController))
console.log("Métodos do authController:", Object.keys(authController))
console.log("Métodos do categoriaController:", Object.keys(categoriaController))
console.log("Métodos do bancoController:", Object.keys(bancoController))
console.log("Métodos do despesasController:", Object.keys(despesasController))
console.log("Métodos do tipoContratacaoController:", Object.keys(tipoContratacaoController))
console.log("Métodos do empresasController:", Object.keys(empresasController))
console.log("Métodos do entradasController:", Object.keys(entradasController))
console.log("Métodos do tipoOperacaoController:", Object.keys(tipoOperacaoController))
console.log("Métodos do poupancaController:", Object.keys(poupancaController))
console.log("Métodos do movimentacaoController:", Object.keys(movimentacaoController))
console.log("Métodos do cartaoCreditoController:", Object.keys(cartaoCreditoController))
console.log("Métodos do statusPagamentoController:", Object.keys(statusPagamentoController))
console.log("===================================\n")

// Adicione esta rota no início do arquivo, antes das outras rotas
router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API está funcionando!" })
})

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

