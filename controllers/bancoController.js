const { Banco, Usuario } = require("../models")
const logger = require("../config/logger")

exports.listarBancos = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    logger.info(`Listando bancos para o usuário ID: ${req.usuarioId}`)
    const bancos = await Banco.findAll({
      where: { UsuarioID: req.usuarioId },
      order: [["Nome", "ASC"]], // Ordenar por nome
    })

    logger.info(`${bancos.length} bancos encontrados para o usuário ID: ${req.usuarioId}`)
    res.json(bancos)
  } catch (error) {
    logger.error(`Erro ao listar bancos: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

exports.obterBanco = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    // Verificar se o ID é um valor especial
    if (req.params.id === "me" || req.params.id === "current") {
      logger.info(
        `Redirecionando solicitação de banco 'me' para listar todos os bancos do usuário ID: ${req.usuarioId}`,
      )
      return this.listarBancos(req, res)
    }

    const bancoId = Number.parseInt(req.params.id, 10)
    if (isNaN(bancoId)) {
      logger.warn(`ID de banco inválido: ${req.params.id}`)
      return res.status(400).json({ message: "ID de banco inválido" })
    }

    logger.info(`Buscando banco ID: ${bancoId} para o usuário ID: ${req.usuarioId}`)
    const banco = await Banco.findOne({
      where: {
        BancoID: bancoId,
        UsuarioID: req.usuarioId,
      },
    })

    if (banco) {
      logger.info(`Banco ID: ${bancoId} encontrado`)
      res.json(banco)
    } else {
      logger.warn(`Banco ID: ${bancoId} não encontrado para o usuário ID: ${req.usuarioId}`)
      res.status(404).json({ message: "Banco não encontrado" })
    }
  } catch (error) {
    logger.error(`Erro ao obter banco: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

exports.criarBanco = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    logger.info(`Criando novo banco para o usuário ID: ${req.usuarioId}`)
    const novoBanco = await Banco.create({
      ...req.body,
      UsuarioID: req.usuarioId,
    })

    logger.info(`Banco ID: ${novoBanco.BancoID} criado com sucesso`)
    res.status(201).json(novoBanco)
  } catch (error) {
    logger.error(`Erro ao criar banco: ${error.message}`)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarBanco = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    // Verificar se o ID é um valor especial
    if (req.params.id === "me" || req.params.id === "current") {
      logger.warn(`Tentativa de atualizar banco com ID especial: ${req.params.id}`)
      return res.status(400).json({ message: "ID de banco inválido" })
    }

    const bancoId = Number.parseInt(req.params.id, 10)
    if (isNaN(bancoId)) {
      logger.warn(`ID de banco inválido: ${req.params.id}`)
      return res.status(400).json({ message: "ID de banco inválido" })
    }

    logger.info(`Atualizando banco ID: ${bancoId} para o usuário ID: ${req.usuarioId}`)
    const banco = await Banco.findOne({
      where: {
        BancoID: bancoId,
        UsuarioID: req.usuarioId,
      },
    })

    if (banco) {
      await banco.update(req.body)
      logger.info(`Banco ID: ${bancoId} atualizado com sucesso`)
      res.json(banco)
    } else {
      logger.warn(`Banco ID: ${bancoId} não encontrado para o usuário ID: ${req.usuarioId}`)
      res.status(404).json({ message: "Banco não encontrado" })
    }
  } catch (error) {
    logger.error(`Erro ao atualizar banco: ${error.message}`)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirBanco = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    // Verificar se o ID é um valor especial
    if (req.params.id === "me" || req.params.id === "current") {
      logger.warn(`Tentativa de excluir banco com ID especial: ${req.params.id}`)
      return res.status(400).json({ message: "ID de banco inválido" })
    }

    const bancoId = Number.parseInt(req.params.id, 10)
    if (isNaN(bancoId)) {
      logger.warn(`ID de banco inválido: ${req.params.id}`)
      return res.status(400).json({ message: "ID de banco inválido" })
    }

    logger.info(`Excluindo banco ID: ${bancoId} para o usuário ID: ${req.usuarioId}`)
    const banco = await Banco.findOne({
      where: {
        BancoID: bancoId,
        UsuarioID: req.usuarioId,
      },
    })

    if (banco) {
      await banco.destroy()
      logger.info(`Banco ID: ${bancoId} excluído com sucesso`)
      res.json({ message: "Banco excluído com sucesso" })
    } else {
      logger.warn(`Banco ID: ${bancoId} não encontrado para o usuário ID: ${req.usuarioId}`)
      res.status(404).json({ message: "Banco não encontrado" })
    }
  } catch (error) {
    logger.error(`Erro ao excluir banco: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

// Adicionar um endpoint para obter o usuário atual
exports.obterUsuarioAtual = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId, {
      attributes: ["UsuarioID", "nome", "email", "adm", "ativo"],
    })

    if (!usuario) {
      logger.warn(`Usuário ID: ${req.usuarioId} não encontrado`)
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    if (!usuario.ativo) {
      logger.warn(`Usuário ID: ${req.usuarioId} está inativo`)
      return res.status(403).json({ message: "Usuário inativo" })
    }

    logger.info(`Dados do usuário ID: ${req.usuarioId} retornados com sucesso`)
    res.json(usuario)
  } catch (error) {
    logger.error(`Erro ao obter dados do usuário: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

