const express = require("express")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")
const routes = require("./routes")
const { sequelize } = require("./models")
const logger = require("./config/logger")

const app = express()
const PORT = process.env.PORT || 3000

// Configuração CORS - permitir todas as origens
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
)

// Middleware para lidar com requisições OPTIONS
app.options("*", cors())

// Middleware para adicionar headers CORS em todas as respostas
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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
    })
  })
  .catch((err) => {
    logger.error("Não foi possível conectar ao banco de dados:", err)
  })

module.exports = app

