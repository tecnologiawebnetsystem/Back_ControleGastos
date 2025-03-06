const express = require("express")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")
const routes = require("./routes")
const { sequelize } = require("./models")
const logger = require("./config/logger")
const corsMiddleware = require("./middleware")
const { printRoutes } = require("./utils/routeLogger")

const app = express()
const PORT = process.env.PORT || 3000

// Aplicar o middleware CORS personalizado ANTES de qualquer outro middleware
app.use(corsMiddleware)

// Ainda mantemos o cors padrão como fallback
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  }),
)

// Middleware para lidar com requisições OPTIONS
app.options("*", (req, res) => {
  res.status(200).end()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rota de teste simples na raiz
app.get("/", (req, res) => {
  res.json({ message: "API está funcionando!" })
})

// Rotas da API
app.use("/api", routes)

// Documentação Swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack)
  res.status(500).json({
    status: "error",
    message: "Algo deu errado!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  })
})

// Conexão com o banco de dados e inicialização do servidor
sequelize
  .authenticate()
  .then(() => {
    logger.info("Conexão com o banco de dados estabelecida com sucesso.")
    app.listen(PORT, () => {
      logger.info(`Servidor rodando na porta ${PORT}`)

      // Listar todas as rotas registradas
      printRoutes(app)
    })
  })
  .catch((err) => {
    logger.error("Não foi possível conectar ao banco de dados:", err)
  })

module.exports = app

