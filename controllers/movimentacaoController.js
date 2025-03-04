const { Movimentacao, Usuario, Sequelize } = require("../models")
const Op = Sequelize.Op

exports.listarMovimentacoes = async (req, res) => {
  try {
    console.log("Listando movimentações para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario) {
      console.log("Usuário não encontrado")
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    if (!usuario.ativo) {
      console.log("Usuário inativo")
      return res.status(403).json({ message: "Usuário inativo" })
    }

    const { dataInicio, dataFim, tipo } = req.query
    const whereClause = { UsuarioID: req.usuarioId }

    if (dataInicio && dataFim) {
      whereClause.Data = {
        [Op.between]: [new Date(dataInicio), new Date(dataFim)],
      }
    }

    if (tipo) {
      whereClause.Tipo = tipo
    }

    const movimentacoes = await Movimentacao.findAll({
      where: whereClause,
      order: [["Data", "DESC"]],
    })
    console.log(`${movimentacoes.length} movimentações encontradas`)
    res.json(movimentacoes)
  } catch (error) {
    console.error("Erro ao listar movimentações:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterMovimentacao = async (req, res) => {
  try {
    console.log(`Obtendo movimentação ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const movimentacao = await Movimentacao.findOne({
      where: { MovimentacaoID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (movimentacao) {
      res.json(movimentacao)
    } else {
      res.status(404).json({ message: "Movimentação não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao obter movimentação:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.criarMovimentacao = async (req, res) => {
  try {
    console.log("Criando nova movimentação para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const novaMovimentacao = await Movimentacao.create({
      ...req.body,
      UsuarioID: req.usuarioId,
    })
    res.status(201).json(novaMovimentacao)
  } catch (error) {
    console.error("Erro ao criar movimentação:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarMovimentacao = async (req, res) => {
  try {
    console.log(`Atualizando movimentação ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const movimentacao = await Movimentacao.findOne({
      where: { MovimentacaoID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (movimentacao) {
      await movimentacao.update(req.body)
      res.json(movimentacao)
    } else {
      res.status(404).json({ message: "Movimentação não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao atualizar movimentação:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirMovimentacao = async (req, res) => {
  try {
    console.log(`Excluindo movimentação ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const movimentacao = await Movimentacao.findOne({
      where: { MovimentacaoID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (movimentacao) {
      await movimentacao.destroy()
      res.json({ message: "Movimentação excluída com sucesso" })
    } else {
      res.status(404).json({ message: "Movimentação não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao excluir movimentação:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterResumoMovimentacoes = async (req, res) => {
  try {
    console.log("Obtendo resumo de movimentações para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const { dataInicio, dataFim } = req.query
    const whereClause = { UsuarioID: req.usuarioId }

    if (dataInicio && dataFim) {
      whereClause.Data = {
        [Op.between]: [new Date(dataInicio), new Date(dataFim)],
      }
    }

    const resumo = await Movimentacao.findAll({
      where: whereClause,
      attributes: [
        "Tipo",
        [Sequelize.fn("SUM", Sequelize.col("Valor")), "Total"],
        [Sequelize.fn("COUNT", Sequelize.col("MovimentacaoID")), "Quantidade"],
      ],
      group: ["Tipo"],
    })

    const totalEntradas = resumo.find((item) => item.Tipo === "Entrada")?.dataValues.Total || 0
    const totalDespesas = resumo.find((item) => item.Tipo === "Despesa")?.dataValues.Total || 0
    const saldo = totalEntradas - totalDespesas

    res.json({
      resumo,
      saldo,
    })
  } catch (error) {
    console.error("Erro ao obter resumo de movimentações:", error)
    res.status(500).json({ message: error.message })
  }
}

