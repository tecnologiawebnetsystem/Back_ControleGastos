const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { Usuario } = require("../models")
const logger = require("../config/logger")

exports.login = async (req, res) => {
  logger.info("Login endpoint chamado")
  try {
    const { email, senha } = req.body
    logger.info(`Tentativa de login para o email: ${email}`)

    const usuario = await Usuario.findOne({ where: { email } })

    if (!usuario) {
      logger.warn(`Usuário não encontrado para o email: ${email}`)
      return res.status(401).json({ message: "Credenciais inválidas" })
    }

    logger.info(`Usuário encontrado: ${usuario.nome}`)

    const senhaValida = await bcrypt.compare(senha, usuario.senha)

    if (!senhaValida) {
      logger.warn(`Senha inválida para o usuário: ${usuario.nome}`)
      return res.status(401).json({ message: "Credenciais inválidas" })
    }

    if (!usuario.ativo) {
      logger.warn(`Tentativa de login de usuário inativo: ${usuario.nome}`)
      return res.status(401).json({ message: "Usuário inativo" })
    }

    const token = jwt.sign({ id: usuario.UsuarioID, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: "1h" })

    logger.info(`Login bem-sucedido para: ${usuario.nome} (ID: ${usuario.UsuarioID})`)

    res.json({
      message: "Login bem-sucedido",
      token,
      usuario: {
        id: usuario.UsuarioID,
        nome: usuario.nome,
        email: usuario.email,
      },
    })
  } catch (error) {
    logger.error("Erro no processo de login:", error)
    res.status(500).json({ message: "Erro interno do servidor" })
  }
}

