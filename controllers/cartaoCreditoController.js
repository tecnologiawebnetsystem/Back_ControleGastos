const { CartaoCredito, Usuario } = require("../models")

exports.listarCartoesCredito = async (req, res) => {
  try {
    console.log("Listando cartões de crédito para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario) {
      console.log("Usuário não encontrado")
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    if (!usuario.ativo) {
      console.log("Usuário inativo")
      return res.status(403).json({ message: "Usuário inativo" })
    }

    const cartoesCredito = await CartaoCredito.findAll({ where: { UsuarioID: req.usuarioId } })
    console.log(`${cartoesCredito.length} cartões de crédito encontrados`)
    res.json(cartoesCredito)
  } catch (error) {
    console.error("Erro ao listar cartões de crédito:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterCartaoCredito = async (req, res) => {
  try {
    console.log(`Obtendo cartão de crédito ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const cartaoCredito = await CartaoCredito.findOne({
      where: { CartaoCreditoID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (cartaoCredito) {
      res.json(cartaoCredito)
    } else {
      res.status(404).json({ message: "Cartão de crédito não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao obter cartão de crédito:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.criarCartaoCredito = async (req, res) => {
  try {
    console.log("Criando novo cartão de crédito para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const novoCartaoCredito = await CartaoCredito.create({
      ...req.body,
      UsuarioID: req.usuarioId,
    })
    res.status(201).json(novoCartaoCredito)
  } catch (error) {
    console.error("Erro ao criar cartão de crédito:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarCartaoCredito = async (req, res) => {
  try {
    console.log(`Atualizando cartão de crédito ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const cartaoCredito = await CartaoCredito.findOne({
      where: { CartaoCreditoID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (cartaoCredito) {
      await cartaoCredito.update(req.body)
      res.json(cartaoCredito)
    } else {
      res.status(404).json({ message: "Cartão de crédito não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao atualizar cartão de crédito:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirCartaoCredito = async (req, res) => {
  try {
    console.log(`Excluindo cartão de crédito ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const cartaoCredito = await CartaoCredito.findOne({
      where: { CartaoCreditoID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (cartaoCredito) {
      await cartaoCredito.destroy()
      res.json({ message: "Cartão de crédito excluído com sucesso" })
    } else {
      res.status(404).json({ message: "Cartão de crédito não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao excluir cartão de crédito:", error)
    res.status(500).json({ message: error.message })
  }
}

