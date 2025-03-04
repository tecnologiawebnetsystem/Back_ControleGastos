const { Poupanca, Usuario } = require("../models")

exports.listarPoupancas = async (req, res) => {
  try {
    console.log("Listando poupanças para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario) {
      console.log("Não existem registros a serem exibidos")
      return res.status(404).json({ message: "Não existem registros a serem exibidos" })
    }

    if (!usuario.ativo) {
      console.log("Usuário inativo")
      return res.status(403).json({ message: "Usuário inativo" })
    }

    const poupancas = await Poupanca.findAll({ where: { UsuarioID: req.usuarioId } })
    console.log(`${poupancas.length} poupanças encontradas`)
    res.json(poupancas)
  } catch (error) {
    console.error("Erro ao listar poupanças:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterPoupanca = async (req, res) => {
  try {
    console.log(`Obtendo poupança ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const poupanca = await Poupanca.findOne({
      where: { PoupancaID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (poupanca) {
      res.json(poupanca)
    } else {
      res.status(404).json({ message: "Poupança não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao obter poupança:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.criarPoupanca = async (req, res) => {
  try {
    console.log("Criando nova poupança para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const novaPoupanca = await Poupanca.create({
      ...req.body,
      UsuarioID: req.usuarioId,
    })
    res.status(201).json(novaPoupanca)
  } catch (error) {
    console.error("Erro ao criar poupança:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarPoupanca = async (req, res) => {
  try {
    console.log(`Atualizando poupança ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const poupanca = await Poupanca.findOne({
      where: { PoupancaID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (poupanca) {
      await poupanca.update(req.body)
      res.json(poupanca)
    } else {
      res.status(404).json({ message: "Poupança não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao atualizar poupança:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirPoupanca = async (req, res) => {
  try {
    console.log(`Excluindo poupança ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const poupanca = await Poupanca.findOne({
      where: { PoupancaID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (poupanca) {
      await poupanca.destroy()
      res.json({ message: "Poupança excluída com sucesso" })
    } else {
      res.status(404).json({ message: "Poupança não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao excluir poupança:", error)
    res.status(500).json({ message: error.message })
  }
}

