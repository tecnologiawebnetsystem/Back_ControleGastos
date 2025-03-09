const logger = require("../config/logger")

exports.verificarStatus = async (req, res) => {
  try {
    logger.info("Verificação de status da API")
    res.json({
      status: "online",
      timestamp: new Date().toISOString(),
      message: "API está funcionando corretamente",
    })
  } catch (error) {
    logger.error(`Erro ao verificar status: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

