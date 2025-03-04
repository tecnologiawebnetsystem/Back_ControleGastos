const { Banco, Usuario } = require("../models")

exports.listarBancos = async (req, res) => {
  try {
    console.log("Listando bancos para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario) {
      console.log("Usuário não encontrado")
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    if (!usuario.ativo) {
      console.log("Usuário inativo")
      return res.status(403).json({ message: "Usuário inativo" })
    }

    const bancos = await Banco.findAll({ where: { UsuarioID: req.usuarioId } })
    console.log(`${bancos.length} bancos encontrados`)
    res.json(bancos)
  } catch (error) {
    console.error("Erro ao listar bancos:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterBanco = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }
    const banco = await Banco.findOne({
      where: {
        BancoID: req.params.id,
        UsuarioID: req.usuarioId,
      },
    })
    if (banco) {
      res.json(banco)
    } else {
      res.status(404).json({ message: "Banco não encontrado" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.criarBanco = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }
    const novoBanco = await Banco.create({
      ...req.body,
      UsuarioID: req.usuarioId,
    })
    res.status(201).json(novoBanco)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarBanco = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }
    const banco = await Banco.findOne({
      where: {
        BancoID: req.params.id,
        UsuarioID: req.usuarioId,
      },
    })
    if (banco) {
      await banco.update(req.body)
      res.json(banco)
    } else {
      res.status(404).json({ message: "Banco não encontrado" })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.excluirBanco = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }
    const banco = await Banco.findOne({
      where: {
        BancoID: req.params.id,
        UsuarioID: req.usuarioId,
      },
    })
    if (banco) {
      await banco.destroy()
      res.json({ message: "Banco excluído com sucesso" })
    } else {
      res.status(404).json({ message: "Banco não encontrado" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

