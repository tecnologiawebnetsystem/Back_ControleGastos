const express = require("express")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")
const routes = require("./routes")
const { sequelize } = require("./models")
const logger = require("./config/logger")

const app = express()
const PORT = process.env.PORT || 3000

// Configuração CORS mais detalhada
const corsOptions = {
  origin: (origin, callback) => {
    // Permitir requisições sem origin (como apps mobile ou curl)
    if (!origin) return callback(null, true)

    // Lista de origens permitidas
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173", // Vite padrão
      "http://localhost:8080",
      "https://seu-frontend.vercel.app", // Substitua pelo seu domínio frontend
      /\.render\.com$/, // Permite todos os domínios do Render
    ]

    // Verificar se a origem está na lista ou corresponde ao padrão regex
    const allowed = allowedOrigins.some((allowedOrigin) => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin)
      }
      return allowedOrigin === origin
    })

    if (allowed) {
      callback(null, true)
    } else {
      callback(new Error(`Origem ${origin} não permitida por CORS`))
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}

// Aplicar CORS
app.use(cors(corsOptions))

// Middleware para lidar com erros de CORS
app.use((err, req, res, next) => {
  if (err.message.includes("CORS")) {
    logger.error(`Erro de CORS: ${err.message}`)
    return res.status(403).json({
      status: "error",
      message: "Acesso não permitido por CORS",
      details: process.env.NODE_ENV === "development" ? err.message : {},
    })
  }
  next(err)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

