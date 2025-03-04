const rateLimit = require("express-rate-limit")

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // limite de 5 tentativas por janela
  message: "Muitas tentativas de login. Por favor, tente novamente mais tarde.",
  standardHeaders: true,
  legacyHeaders: false,
})

module.exports = { loginLimiter }

