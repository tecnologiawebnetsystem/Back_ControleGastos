const { StatusPagamento, Usuario } = require("../models")
const logger = require("../config/logger")

exports.listarStatusPagamento = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    logger.info(`Listando status de pagamento para o usuário ID: ${req.usuarioId}`)
    const statusPagamentos = await StatusPagamento.findAll({
      order: [["Descricao", "ASC"]],
    })

    res.json(statusPagamentos)
  } catch (error) {
    logger.error(`Erro ao listar status de pagamento: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

exports.obterStatusPagamento = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    const id = Number.parseInt(req.params.id)
    logger.info(`Buscando status de pagamento com ID: ${id} para o usuário ID: ${req.usuarioId}`)

    const statusPagamento = await StatusPagamento.findByPk(id)

    if (statusPagamento) {
      res.json(statusPagamento)
    } else {
      logger.warn(`Status de pagamento com ID ${id} não encontrado`)
      res.status(404).json({ message: "Status de pagamento não encontrado" })
    }
  } catch (error) {
    logger.error(`Erro ao obter status de pagamento: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

exports.criarStatusPagamento = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    if (!usuario.adm) {
      return res.status(403).json({ message: "Apenas administradores podem criar status de pagamento" })
    }

    logger.info(`Criando novo status de pagamento pelo usuário ID: ${req.usuarioId}`)
    const novoStatusPagamento = await StatusPagamento.create(req.body)

    logger.info(`Status de pagamento criado com ID: ${novoStatusPagamento.StatusPagamentoID}`)
    res.status(201).json(novoStatusPagamento)
  } catch (error) {
    logger.error(`Erro ao criar status de pagamento: ${error.message}`)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarStatusPagamento = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    if (!usuario.adm) {
      return res.status(403).json({ message: "Apenas administradores podem atualizar status de pagamento" })
    }

    const id = Number.parseInt(req.params.id)
    logger.info(`Atualizando status de pagamento com ID: ${id} pelo usuário ID: ${req.usuarioId}`)

    const statusPagamento = await StatusPagamento.findByPk(id)

    if (statusPagamento) {
      await statusPagamento.update(req.body)
      logger.info(`Status de pagamento ID: ${id} atualizado com sucesso`)
      res.json(statusPagamento)
    } else {
      logger.warn(`Status de pagamento com ID ${id} não encontrado`)
      res.status(404).json({ message: "Status de pagamento não encontrado" })
    }
  } catch (error) {
    logger.error(`Erro ao atualizar status de pagamento: ${error.message}`)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirStatusPagamento = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    if (!usuario.adm) {
      return res.status(403).json({ message: "Apenas administradores podem excluir status de pagamento" })
    }

    const id = Number.parseInt(req.params.id)
    logger.info(`Excluindo status de pagamento com ID: ${id} pelo usuário ID: ${req.usuarioId}`)

    const statusPagamento = await StatusPagamento.findByPk(id)

    if (statusPagamento) {
      await statusPagamento.destroy()
      logger.info(`Status de pagamento ID: ${id} excluído com sucesso`)
      res.json({ message: "Status de pagamento excluído com sucesso" })
    } else {
      logger.warn(`Status de pagamento com ID ${id} não encontrado`)
      res.status(404).json({ message: "Status de pagamento não encontrado" })
    }
  } catch (error) {
    logger.error(`Erro ao excluir status de pagamento: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

