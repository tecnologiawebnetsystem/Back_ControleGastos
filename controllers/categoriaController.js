const { Categoria } = require("../models")

exports.listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll()
    console.log(`${categorias.length} categorias encontradas`)
    res.json(categorias)
  } catch (error) {
    console.error("Erro ao listar categorias:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id)
    if (categoria) {
      res.json(categoria)
    } else {
      res.status(404).json({ message: "Categoria não encontrada" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.criarCategoria = async (req, res) => {
  try {
    const novaCategoria = await Categoria.create(req.body)
    res.status(201).json(novaCategoria)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id)
    if (categoria) {
      await categoria.update(req.body)
      res.json(categoria)
    } else {
      res.status(404).json({ message: "Categoria não encontrada" })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.excluirCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id)
    if (categoria) {
      await categoria.destroy()
      res.json({ message: "Categoria excluída com sucesso" })
    } else {
      res.status(404).json({ message: "Categoria não encontrada" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Removida a função listarTodasCategorias, pois agora todas as categorias são listadas por padrão

