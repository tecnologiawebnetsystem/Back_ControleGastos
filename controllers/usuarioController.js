const { Usuario } = require("../models")
const logger = require("../config/logger")

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.obterUsuario = async (req, res) => {
  try {
    // Verificar se o ID é um valor especial
    if (req.params.id === "me" || req.params.id === "current") {
      return this.obterUsuarioAtual(req, res)
    }

    const usuarioId = Number.parseInt(req.params.id, 10)
    if (isNaN(usuarioId)) {
      logger.warn(`ID de usuário inválido: ${req.params.id}`)
      return res.status(400).json({ message: "ID de usuário inválido" })
    }

    const usuario = await Usuario.findByPk(usuarioId)
    if (usuario) {
      res.json(usuario)
    } else {
      res.status(404).json({ message: "Usuário não encontrado" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.obterUsuarioAtual = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId, {
      attributes: ["UsuarioID", "nome", "email", "adm", "ativo"],
    })

    if (!usuario) {
      logger.warn(`Usuário ID: ${req.usuarioId} não encontrado`)
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    if (!usuario.ativo) {
      logger.warn(`Usuário ID: ${req.usuarioId} está inativo`)
      return res.status(403).json({ message: "Usuário inativo" })
    }

    logger.info(`Dados do usuário ID: ${req.usuarioId} retornados com sucesso`)
    res.json(usuario)
  } catch (error) {
    logger.error(`Erro ao obter dados do usuário: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

exports.criarUsuario = async (req, res) => {
  try {
    const novoUsuario = await Usuario.create(req.body)
    res.status(201).json(novoUsuario)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarUsuario = async (req, res) => {
  try {
    // Verificar se o ID é um valor especial
    if (req.params.id === "me" || req.params.id === "current") {
      req.params.id = req.usuarioId
    }

    const usuarioId = Number.parseInt(req.params.id, 10)
    if (isNaN(usuarioId)) {
      logger.warn(`ID de usuário inválido: ${req.params.id}`)
      return res.status(400).json({ message: "ID de usuário inválido" })
    }

    const usuario = await Usuario.findByPk(usuarioId)
    if (usuario) {
      await usuario.update(req.body)
      res.json(usuario)
    } else {
      res.status(404).json({ message: "Usuário não encontrado" })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.excluirUsuario = async (req, res) => {
  try {
    // Verificar se o ID é um valor especial
    if (req.params.id === "me" || req.params.id === "current") {
      logger.warn(`Tentativa de excluir o próprio usuário: ${req.usuarioId}`)
      return res.status(400).json({ message: "Não é possível excluir o próprio usuário" })
    }

    const usuarioId = Number.parseInt(req.params.id, 10)
    if (isNaN(usuarioId)) {
      logger.warn(`ID de usuário inválido: ${req.params.id}`)
      return res.status(400).json({ message: "ID de usuário inválido" })
    }

    const usuario = await Usuario.findByPk(usuarioId)
    if (usuario) {
      await usuario.destroy()
      res.json({ message: "Usuário excluído com sucesso" })
    } else {
      res.status(404).json({ message: "Usuário não encontrado" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

