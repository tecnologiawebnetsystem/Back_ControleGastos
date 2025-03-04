const jwt = require("jsonwebtoken")
const { Usuario } = require("../models")

module.exports = async (req, res, next) => {
  try {
    console.log("Iniciando middleware de autenticação")
    const authHeader = req.headers.authorization
    console.log("Auth Header:", authHeader)

    if (!authHeader) {
      console.log("Token não fornecido")
      return res.status(401).json({
        status: "error",
        message: "Token não fornecido",
      })
    }

    const [, token] = authHeader.split(" ")
    console.log("Token extraído:", token)

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("Token decodificado:", decoded)

    const usuario = await Usuario.findByPk(decoded.id)
    console.log("Usuário encontrado:", usuario ? usuario.toJSON() : null)

    if (!usuario) {
      console.log("Usuário não encontrado")
      return res.status(401).json({
        status: "error",
        message: "Usuário não encontrado",
      })
    }

    if (!usuario.ativo) {
      console.log("Usuário inativo")
      return res.status(401).json({
        status: "error",
        message: "Usuário inativo",
      })
    }

    req.usuarioId = usuario.UsuarioID
    req.usuario = usuario
    console.log("req.usuarioId definido como:", req.usuarioId)
    return next()
  } catch (error) {
    console.error("Erro na autenticação:", error)
    return res.status(401).json({
      status: "error",
      message: "Token inválido",
    })
  }
}

