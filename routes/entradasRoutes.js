const express = require("express")
const router = express.Router()
const entradasController = require("../controllers/entradasController")

router.get("/", entradasController.listarEntradas)
router.get("/:id", entradasController.obterEntrada)
router.post("/", entradasController.criarEntrada)
router.put("/:id", entradasController.atualizarEntrada)
router.delete("/:id", entradasController.excluirEntrada)

module.exports = router

