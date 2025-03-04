const { StatusPagamento } = require("../models")

exports.listarStatusPagamento = async (req, res) => {
  try {
    const statusPagamentos = await StatusPagamento.findAll()
    res.json(statusPagamentos)
  } catch (error) {
    console.error("Erro ao listar status de pagamento:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterStatusPagamento = async (req, res) => {
  try {
    const statusPagamento = await StatusPagamento.findByPk(req.params.id)
    if (statusPagamento) {
      res.json(statusPagamento)
    } else {
      res.status(404).json({ message: "Status de pagamento não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao obter status de pagamento:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.criarStatusPagamento = async (req, res) => {
  try {
    const novoStatusPagamento = await StatusPagamento.create(req.body)
    res.status(201).json(novoStatusPagamento)
  } catch (error) {
    console.error("Erro ao criar status de pagamento:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarStatusPagamento = async (req, res) => {
  try {
    const statusPagamento = await StatusPagamento.findByPk(req.params.id)
    if (statusPagamento) {
      await statusPagamento.update(req.body)
      res.json(statusPagamento)
    } else {
      res.status(404).json({ message: "Status de pagamento não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao atualizar status de pagamento:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirStatusPagamento = async (req, res) => {
  try {
    const statusPagamento = await StatusPagamento.findByPk(req.params.id)
    if (statusPagamento) {
      await statusPagamento.destroy()
      res.json({ message: "Status de pagamento excluído com sucesso" })
    } else {
      res.status(404).json({ message: "Status de pagamento não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao excluir status de pagamento:", error)
    res.status(500).json({ message: error.message })
  }
}

