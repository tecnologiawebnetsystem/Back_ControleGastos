const fs = require("fs")
const path = require("path")
const logger = require("../config/logger")

/**
 * Lista todos os métodos exportados de um controlador
 * @param {Object} controller - O objeto controlador
 * @returns {Array} - Array com os nomes dos métodos
 */
function getControllerMethods(controller) {
  return Object.keys(controller).filter((method) => typeof controller[method] === "function")
}

/**
 * Lê todos os arquivos de controladores e lista seus métodos
 */
function logAllEndpoints() {
  logger.info("=== ENDPOINTS DISPONÍVEIS ===")

  const controllersDir = path.join(__dirname, "../controllers")

  // Lê todos os arquivos no diretório de controladores
  fs.readdirSync(controllersDir).forEach((file) => {
    if (file.endsWith("Controller.js")) {
      const controllerName = file.replace(".js", "")
      const controllerPath = path.join(controllersDir, file)

      try {
        // Importa o controlador
        const controller = require(controllerPath)

        // Obtém os métodos do controlador
        const methods = getControllerMethods(controller)

        // Loga os métodos
        logger.info(`Métodos do ${controllerName}: ${JSON.stringify(methods, null, 2)}`)
      } catch (error) {
        logger.error(`Erro ao carregar controlador ${controllerName}: ${error.message}`)
      }
    }
  })

  logger.info("==============================")
}

module.exports = { logAllEndpoints }

