const { Usuario } = require("../models")

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()
    res.json(usuarios)
  } catch (error) {
    console.error("Erro ao listar usuários:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (usuario) {
      res.json(usuario)
    } else {
      res.status(404).json({ message: "Usuário não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao obter usuário:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.criarUsuario = async (req, res) => {
  try {
    const novoUsuario = await Usuario.create(req.body)
    res.status(201).json(novoUsuario)
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (usuario) {
      await usuario.update(req.body)
      res.json(usuario)
    } else {
      res.status(404).json({ message: "Usuário não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (usuario) {
      await usuario.destroy()
      res.json({ message: "Usuário excluído com sucesso" })
    } else {
      res.status(404).json({ message: "Usuário não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao excluir usuário:", error)
    res.status(500).json({ message: error.message })
  }
}

