const { TipoOperacao } = require("../models")

exports.listarTiposOperacao = async (req, res) => {
  try {
    const tiposOperacao = await TipoOperacao.findAll()
    console.log(`${tiposOperacao.length} tipos de operação encontrados`)
    res.json(tiposOperacao)
  } catch (error) {
    console.error("Erro ao listar tipos de operação:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterTipoOperacao = async (req, res) => {
  try {
    const tipoOperacao = await TipoOperacao.findByPk(req.params.id)
    if (tipoOperacao) {
      res.json(tipoOperacao)
    } else {
      res.status(404).json({ message: "Tipo de operação não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao obter tipo de operação:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.criarTipoOperacao = async (req, res) => {
  try {
    const novoTipoOperacao = await TipoOperacao.create(req.body)
    res.status(201).json(novoTipoOperacao)
  } catch (error) {
    console.error("Erro ao criar tipo de operação:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarTipoOperacao = async (req, res) => {
  try {
    const tipoOperacao = await TipoOperacao.findByPk(req.params.id)
    if (tipoOperacao) {
      await tipoOperacao.update(req.body)
      res.json(tipoOperacao)
    } else {
      res.status(404).json({ message: "Tipo de operação não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao atualizar tipo de operação:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirTipoOperacao = async (req, res) => {
  try {
    const tipoOperacao = await TipoOperacao.findByPk(req.params.id)
    if (tipoOperacao) {
      await tipoOperacao.destroy()
      res.json({ message: "Tipo de operação excluído com sucesso" })
    } else {
      res.status(404).json({ message: "Tipo de operação não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao excluir tipo de operação:", error)
    res.status(500).json({ message: error.message })
  }
}

