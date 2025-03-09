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

    logger.info(`Buscando banco ID: ${req.params.id} para o usuário ID: ${req.usuarioId}`)
    const banco = await Banco.findOne({
      where: {
        BancoID: req.params.id,
        UsuarioID: req.usuarioId,
      },
    })

    if (banco) {
      logger.info(`Banco ID: ${req.params.id} encontrado`)
      res.json(banco)
    } else {
      logger.warn(`Banco ID: ${req.params.id} não encontrado para o usuário ID: ${req.usuarioId}`)
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

    logger.info(`Atualizando banco ID: ${req.params.id} para o usuário ID: ${req.usuarioId}`)
    const banco = await Banco.findOne({
      where: {
        BancoID: req.params.id,
        UsuarioID: req.usuarioId,
      },
    })

    if (banco) {
      await banco.update(req.body)
      logger.info(`Banco ID: ${req.params.id} atualizado com sucesso`)
      res.json(banco)
    } else {
      logger.warn(`Banco ID: ${req.params.id} não encontrado para o usuário ID: ${req.usuarioId}`)
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

    logger.info(`Excluindo banco ID: ${req.params.id} para o usuário ID: ${req.usuarioId}`)
    const banco = await Banco.findOne({
      where: {
        BancoID: req.params.id,
        UsuarioID: req.usuarioId,
      },
    })

    if (banco) {
      await banco.destroy()
      logger.info(`Banco ID: ${req.params.id} excluído com sucesso`)
      res.json({ message: "Banco excluído com sucesso" })
    } else {
      logger.warn(`Banco ID: ${req.params.id} não encontrado para o usuário ID: ${req.usuarioId}`)
      res.status(404).json({ message: "Banco não encontrado" })
    }
  } catch (error) {
    logger.error(`Erro ao excluir banco: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

