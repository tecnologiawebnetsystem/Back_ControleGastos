const { Empresa, Usuario, TipoContratacao, Banco } = require("../models")
const logger = require("../config/logger")

exports.listarEmpresas = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    logger.info(`Listando empresas para o usuário ID: ${req.usuarioId}`)
    const empresas = await Empresa.findAll({
      where: { UsuarioID: req.usuarioId },
      include: [
        { model: TipoContratacao, attributes: ["Descricao"] },
        { model: Banco, attributes: ["Nome"] },
      ],
      order: [["Nome", "ASC"]],
    })

    logger.info(`${empresas.length} empresas encontradas para o usuário ID: ${req.usuarioId}`)
    res.json(empresas)
  } catch (error) {
    logger.error(`Erro ao listar empresas: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

exports.obterEmpresa = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    // Verificar se o ID é um valor especial
    if (req.params.id === "me" || req.params.id === "current") {
      logger.warn(`ID de empresa inválido: ${req.params.id}`)
      return res.status(400).json({ message: "ID de empresa inválido" })
    }

    const empresaId = Number.parseInt(req.params.id, 10)
    if (isNaN(empresaId)) {
      logger.warn(`ID de empresa inválido: ${req.params.id}`)
      return res.status(400).json({ message: "ID de empresa inválido" })
    }

    logger.info(`Buscando empresa ID: ${empresaId} para o usuário ID: ${req.usuarioId}`)
    const empresa = await Empresa.findOne({
      where: {
        EmpresaID: empresaId,
        UsuarioID: req.usuarioId,
      },
      include: [
        { model: TipoContratacao, attributes: ["Descricao"] },
        { model: Banco, attributes: ["Nome"] },
      ],
    })

    if (empresa) {
      logger.info(`Empresa ID: ${empresaId} encontrada`)
      res.json(empresa)
    } else {
      logger.warn(`Empresa ID: ${empresaId} não encontrada para o usuário ID: ${req.usuarioId}`)
      res.status(404).json({ message: "Empresa não encontrada" })
    }
  } catch (error) {
    logger.error(`Erro ao obter empresa: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

exports.criarEmpresa = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    // Validar BancoID se fornecido
    if (req.body.BancoID) {
      const bancoId = Number.parseInt(req.body.BancoID, 10)
      if (isNaN(bancoId)) {
        logger.warn(`ID de banco inválido: ${req.body.BancoID}`)
        return res.status(400).json({ message: "ID de banco inválido" })
      }

      const banco = await Banco.findOne({
        where: {
          BancoID: bancoId,
          UsuarioID: req.usuarioId,
        },
      })

      if (!banco) {
        logger.warn(`Banco ID: ${bancoId} não encontrado para o usuário ID: ${req.usuarioId}`)
        return res.status(404).json({ message: "Banco não encontrado" })
      }
    }

    // Validar DiaPagamento_1 e DiaPagamento_2 se fornecidos
    if (req.body.DiaPagamento_1) {
      const dia = Number.parseInt(req.body.DiaPagamento_1, 10)
      if (isNaN(dia) || dia < 1 || dia > 31) {
        logger.warn(`Dia de pagamento 1 inválido: ${req.body.DiaPagamento_1}`)
        return res.status(400).json({ message: "Dia de pagamento 1 deve ser um número entre 1 e 31" })
      }
    }

    if (req.body.DiaPagamento_2) {
      const dia = Number.parseInt(req.body.DiaPagamento_2, 10)
      if (isNaN(dia) || dia < 1 || dia > 31) {
        logger.warn(`Dia de pagamento 2 inválido: ${req.body.DiaPagamento_2}`)
        return res.status(400).json({ message: "Dia de pagamento 2 deve ser um número entre 1 e 31" })
      }
    }

    // Validar TipoContratacaoID
    const tipoContratacaoId = Number.parseInt(req.body.TipoContratacaoID, 10)
    if (isNaN(tipoContratacaoId)) {
      logger.warn(`ID de tipo de contratação inválido: ${req.body.TipoContratacaoID}`)
      return res.status(400).json({ message: "ID de tipo de contratação inválido" })
    }

    const tipoContratacao = await TipoContratacao.findOne({
      where: {
        TipoContratacaoID: tipoContratacaoId,
        UsuarioID: req.usuarioId,
      },
    })

    if (!tipoContratacao) {
      logger.warn(`Tipo de contratação ID: ${tipoContratacaoId} não encontrado para o usuário ID: ${req.usuarioId}`)
      return res.status(404).json({ message: "Tipo de contratação não encontrado" })
    }

    logger.info(`Criando nova empresa para o usuário ID: ${req.usuarioId}`)
    const novaEmpresa = await Empresa.create({
      ...req.body,
      UsuarioID: req.usuarioId,
    })

    logger.info(`Empresa ID: ${novaEmpresa.EmpresaID} criada com sucesso`)
    res.status(201).json(novaEmpresa)
  } catch (error) {
    logger.error(`Erro ao criar empresa: ${error.message}`)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarEmpresa = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    // Verificar se o ID é um valor especial
    if (req.params.id === "me" || req.params.id === "current") {
      logger.warn(`ID de empresa inválido: ${req.params.id}`)
      return res.status(400).json({ message: "ID de empresa inválido" })
    }

    const empresaId = Number.parseInt(req.params.id, 10)
    if (isNaN(empresaId)) {
      logger.warn(`ID de empresa inválido: ${req.params.id}`)
      return res.status(400).json({ message: "ID de empresa inválido" })
    }

    // Validar BancoID se fornecido
    if (req.body.BancoID) {
      const bancoId = Number.parseInt(req.body.BancoID, 10)
      if (isNaN(bancoId)) {
        logger.warn(`ID de banco inválido: ${req.body.BancoID}`)
        return res.status(400).json({ message: "ID de banco inválido" })
      }

      const banco = await Banco.findOne({
        where: {
          BancoID: bancoId,
          UsuarioID: req.usuarioId,
        },
      })

      if (!banco) {
        logger.warn(`Banco ID: ${bancoId} não encontrado para o usuário ID: ${req.usuarioId}`)
        return res.status(404).json({ message: "Banco não encontrado" })
      }
    }

    // Validar DiaPagamento_1 e DiaPagamento_2 se fornecidos
    if (req.body.DiaPagamento_1) {
      const dia = Number.parseInt(req.body.DiaPagamento_1, 10)
      if (isNaN(dia) || dia < 1 || dia > 31) {
        logger.warn(`Dia de pagamento 1 inválido: ${req.body.DiaPagamento_1}`)
        return res.status(400).json({ message: "Dia de pagamento 1 deve ser um número entre 1 e 31" })
      }
    }

    if (req.body.DiaPagamento_2) {
      const dia = Number.parseInt(req.body.DiaPagamento_2, 10)
      if (isNaN(dia) || dia < 1 || dia > 31) {
        logger.warn(`Dia de pagamento 2 inválido: ${req.body.DiaPagamento_2}`)
        return res.status(400).json({ message: "Dia de pagamento 2 deve ser um número entre 1 e 31" })
      }
    }

    // Validar TipoContratacaoID se fornecido
    if (req.body.TipoContratacaoID) {
      const tipoContratacaoId = Number.parseInt(req.body.TipoContratacaoID, 10)
      if (isNaN(tipoContratacaoId)) {
        logger.warn(`ID de tipo de contratação inválido: ${req.body.TipoContratacaoID}`)
        return res.status(400).json({ message: "ID de tipo de contratação inválido" })
      }

      const tipoContratacao = await TipoContratacao.findOne({
        where: {
          TipoContratacaoID: tipoContratacaoId,
          UsuarioID: req.usuarioId,
        },
      })

      if (!tipoContratacao) {
        logger.warn(`Tipo de contratação ID: ${tipoContratacaoId} não encontrado para o usuário ID: ${req.usuarioId}`)
        return res.status(404).json({ message: "Tipo de contratação não encontrado" })
      }
    }

    logger.info(`Atualizando empresa ID: ${empresaId} para o usuário ID: ${req.usuarioId}`)
    const empresa = await Empresa.findOne({
      where: {
        EmpresaID: empresaId,
        UsuarioID: req.usuarioId,
      },
    })

    if (empresa) {
      await empresa.update(req.body)
      logger.info(`Empresa ID: ${empresaId} atualizada com sucesso`)
      res.json(empresa)
    } else {
      logger.warn(`Empresa ID: ${empresaId} não encontrada para o usuário ID: ${req.usuarioId}`)
      res.status(404).json({ message: "Empresa não encontrada" })
    }
  } catch (error) {
    logger.error(`Erro ao atualizar empresa: ${error.message}`)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirEmpresa = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId)
    if (!usuario || !usuario.ativo) {
      return res.status(403).json({ message: "Usuário inativo ou não encontrado" })
    }

    // Verificar se o ID é um valor especial
    if (req.params.id === "me" || req.params.id === "current") {
      logger.warn(`ID de empresa inválido: ${req.params.id}`)
      return res.status(400).json({ message: "ID de empresa inválido" })
    }

    const empresaId = Number.parseInt(req.params.id, 10)
    if (isNaN(empresaId)) {
      logger.warn(`ID de empresa inválido: ${req.params.id}`)
      return res.status(400).json({ message: "ID de empresa inválido" })
    }

    logger.info(`Excluindo empresa ID: ${empresaId} para o usuário ID: ${req.usuarioId}`)
    const empresa = await Empresa.findOne({
      where: {
        EmpresaID: empresaId,
        UsuarioID: req.usuarioId,
      },
    })

    if (empresa) {
      await empresa.destroy()
      logger.info(`Empresa ID: ${empresaId} excluída com sucesso`)
      res.json({ message: "Empresa excluída com sucesso" })
    } else {
      logger.warn(`Empresa ID: ${empresaId} não encontrada para o usuário ID: ${req.usuarioId}`)
      res.status(404).json({ message: "Empresa não encontrada" })
    }
  } catch (error) {
    logger.error(`Erro ao excluir empresa: ${error.message}`)
    res.status(500).json({ message: error.message })
  }
}

