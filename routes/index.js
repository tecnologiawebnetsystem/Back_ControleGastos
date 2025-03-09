const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddleware")
const { logAllEndpoints } = require("../utils/endpointLogger")

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
const statusPagamentoRoutes = require("./statusPagamentoRoutes")

// Rota para listar todos os endpoints (apenas para desenvolvimento)
if (process.env.NODE_ENV !== "production") {
  router.get("/endpoints", (req, res) => {
    const endpoints = {}

    // Lê todos os controladores e seus métodos
    const controllersDir = require("path").join(__dirname, "../controllers")
    require("fs")
      .readdirSync(controllersDir)
      .forEach((file) => {
        if (file.endsWith("Controller.js")) {
          const controllerName = file.replace(".js", "")
          const controller = require(`../controllers/${file}`)
          endpoints[controllerName] = Object.keys(controller).filter(
            (method) => typeof controller[method] === "function",
          )
        }
      })

    res.json(endpoints)
  })
}

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
router.use("/status-pagamento", authMiddleware, statusPagamentoRoutes)

module.exports = router

