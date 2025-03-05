const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

// Adicionar middleware para lidar com requisições OPTIONS
router.options("/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  res.sendStatus(200)
})

router.post("/login", authController.login)

module.exports = router

