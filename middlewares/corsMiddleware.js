const cors = require("cors")
const logger = require("../config/logger")

// Configuração CORS para rotas específicas
const corsWithOptions = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)

    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:8080",
      "https://seu-frontend.vercel.app", // Substitua pelo seu domínio frontend
      /\.render\.com$/,
    ]

    const allowed = allowedOrigins.some((allowedOrigin) => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin)
      }
      return allowedOrigin === origin
    })

    if (allowed) {
      callback(null, true)
    } else {
      logger.warn(`Tentativa de acesso bloqueada por CORS: ${origin}`)
      callback(new Error(`Origem ${origin} não permitida por CORS`))
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
})

module.exports = { corsWithOptions }

