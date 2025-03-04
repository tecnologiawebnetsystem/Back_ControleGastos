const express = require("express")
const router = express.Router()
const categoriaController = require("../controllers/categoriaController")

// Removida a necessidade de autenticação para rotas de categoria
router.get("/", categoriaController.listarCategorias)
router.get("/:id", categoriaController.obterCategoria)
router.post("/", categoriaController.criarCategoria)
router.put("/:id", categoriaController.atualizarCategoria)
router.delete("/:id", categoriaController.excluirCategoria)

module.exports = router

