const express = require("express")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")
const routes = require("./routes")
const { sequelize } = require("./models")
const logger = require("./config/logger")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rotas
app.use("/api", routes)

// Documentação Swagger - Garantir que seja acessível sem autenticação
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  logger.error(err.stack)
  res.status(500).json({
    status: "error",
    message: "Algo deu errado!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  })
})

// Função para iniciar o servidor com fallback de porta
const startServer = (port) => {
  const server = app
    .listen(port, () => {
      logger.info(`Servidor rodando na porta ${port}`)
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        logger.warn(`Porta ${port} já está em uso, tentando porta ${port + 1}`)
        startServer(port + 1)
      } else {
        logger.error(`Erro ao iniciar servidor: ${err.message}`)
      }
    })
}

// Conexão com o banco de dados e inicialização do servidor
sequelize
  .authenticate()
  .then(() => {
    logger.info("Conexão com o banco de dados estabelecida com sucesso.")
    startServer(PORT)
  })
  .catch((err) => {
    logger.error(`Não foi possível conectar ao banco de dados: ${err.message}`)
  })

module.exports = app

