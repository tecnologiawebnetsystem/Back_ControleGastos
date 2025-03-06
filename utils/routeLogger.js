/**
 * Utilitário para listar todas as rotas registradas no Express
 */
function listAllRoutes(app) {
  const routes = []

  // Função para extrair rotas de uma camada
  function extractRoutes(layer, basePath = "") {
    if (layer.route) {
      // É uma rota
      const path = basePath + (layer.route.path || "")
      const methods = Object.keys(layer.route.methods)
        .filter((method) => layer.route.methods[method])
        .map((method) => method.toUpperCase())

      routes.push({
        path,
        methods,
        middleware: layer.route.stack.map((handler) => handler.name || "anonymous"),
      })
    } else if (layer.name === "router" && layer.handle.stack) {
      // É um router
      const routerPath = basePath + (layer.regexp.toString().match(/^\/\^\\(\/?[^/]*)/)?.[1] || "")
      layer.handle.stack.forEach((stackItem) => {
        extractRoutes(stackItem, routerPath)
      })
    } else if (layer.name === "bound dispatch" && layer.handle.stack) {
      // É um sub-app ou um router montado
      layer.handle.stack.forEach((stackItem) => {
        extractRoutes(stackItem, basePath + (layer.regexp.toString().match(/^\/\^\\(\/?[^/]*)/)?.[1] || ""))
      })
    }
  }

  // Percorrer todas as camadas do app
  app._router.stack.forEach((layer) => {
    extractRoutes(layer)
  })

  return routes
}

/**
 * Imprime todas as rotas no console de forma organizada
 */
function printRoutes(app) {
  const routes = listAllRoutes(app)

  console.log("\n=== ROTAS REGISTRADAS ===")

  // Agrupar rotas por caminho base
  const routesByBase = {}
  routes.forEach((route) => {
    const basePath = route.path.split("/")[1] || "root"
    if (!routesByBase[basePath]) {
      routesByBase[basePath] = []
    }
    routesByBase[basePath].push(route)
  })

  // Imprimir rotas agrupadas
  Object.keys(routesByBase)
    .sort()
    .forEach((basePath) => {
      console.log(`\n[${basePath.toUpperCase()}]`)
      routesByBase[basePath].forEach((route) => {
        console.log(`  ${route.methods.join(", ")} ${route.path}`)
      })
    })

  console.log("\nTotal de rotas:", routes.length)
  console.log("========================\n")

  return routes
}

module.exports = { listAllRoutes, printRoutes }

