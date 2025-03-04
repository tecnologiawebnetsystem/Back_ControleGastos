const { TipoContratacao } = require("../models")

exports.listarTiposContratacao = async (req, res) => {
  try {
    const tiposContratacao = await TipoContratacao.findAll()
    console.log(`${tiposContratacao.length} tipos de contratação encontrados`)
    res.json(tiposContratacao)
  } catch (error) {
    console.error("Erro ao listar tipos de contratação:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterTipoContratacao = async (req, res) => {
  try {
    const tipoContratacao = await TipoContratacao.findByPk(req.params.id)
    if (tipoContratacao) {
      res.json(tipoContratacao)
    } else {
      res.status(404).json({ message: "Tipo de contratação não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao obter tipo de contratação:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.criarTipoContratacao = async (req, res) => {
  try {
    const novoTipoContratacao = await TipoContratacao.create(req.body)
    res.status(201).json(novoTipoContratacao)
  } catch (error) {
    console.error("Erro ao criar tipo de contratação:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarTipoContratacao = async (req, res) => {
  try {
    const tipoContratacao = await TipoContratacao.findByPk(req.params.id)
    if (tipoContratacao) {
      await tipoContratacao.update(req.body)
      res.json(tipoContratacao)
    } else {
      res.status(404).json({ message: "Tipo de contratação não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao atualizar tipo de contratação:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirTipoContratacao = async (req, res) => {
  try {
    const tipoContratacao = await TipoContratacao.findByPk(req.params.id)
    if (tipoContratacao) {
      await tipoContratacao.destroy()
      res.json({ message: "Tipo de contratação excluído com sucesso" })
    } else {
      res.status(404).json({ message: "Tipo de contratação não encontrado" })
    }
  } catch (error) {
    console.error("Erro ao excluir tipo de contratação:", error)
    res.status(500).json({ message: error.message })
  }
}

