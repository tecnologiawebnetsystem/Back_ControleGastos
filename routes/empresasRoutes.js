const express = require("express")
const router = express.Router()
const empresasController = require("../controllers/empresasController")

router.get("/", empresasController.listarEmpresas)
router.get("/:id", empresasController.obterEmpresa)
router.post("/", empresasController.criarEmpresa)
router.put("/:id", empresasController.atualizarEmpresa)
router.delete("/:id", empresasController.excluirEmpresa)

module.exports = router

