// middleware.js - Middleware personalizado para lidar com CORS
module.exports = (req, res, next) => {
  // Permitir qualquer origem
  res.setHeader("Access-Control-Allow-Origin", "*")

  // Métodos HTTP permitidos
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")

  // Headers permitidos
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization,Accept")

  // Permitir cookies
  res.setHeader("Access-Control-Allow-Credentials", "true")

  // Cache para preflight
  res.setHeader("Access-Control-Max-Age", "86400")

  // Responder imediatamente às requisições OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  // Passar para o próximo middleware
  return next()
}

