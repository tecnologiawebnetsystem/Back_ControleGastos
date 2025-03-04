const { Entrada, Usuario, sequelize } = require("../models")

exports.listarEntradas = async (req, res) => {
  try {
    console.log("Listando entradas para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario) {
      console.log("Usuário não encontrado")
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    if (!usuario.ativo) {
      console.log("Usuário inativo")
      return res.status(403).json({ message: "Usuário inativo" })
    }

    const entradas = await Entrada.findAll({ where: { UsuarioID: req.usuarioId } })
    console.log(`${entradas.length} entradas encontradas`)
    res.json(entradas)
  } catch (error) {
    console.error("Erro ao listar entradas:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterEntrada = async (req, res) => {
  try {
    console.log(`Obtendo entrada ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const entrada = await Entrada.findOne({
      where: { EntradaID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (entrada) {
      res.json(entrada)
    } else {
      res.status(404).json({ message: "Entrada não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao obter entrada:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.criarEntrada = async (req, res) => {
  const t = await sequelize.transaction()

  try {
    console.log("Criando nova entrada para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const novaEntrada = await Entrada.create(
      {
        ...req.body,
        UsuarioID: req.usuarioId,
      },
      { transaction: t },
    )

    await t.commit()
    res.status(201).json(novaEntrada)
  } catch (error) {
    await t.rollback()
    console.error("Erro ao criar entrada:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarEntrada = async (req, res) => {
  const t = await sequelize.transaction()

  try {
    console.log(`Atualizando entrada ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const entrada = await Entrada.findOne({
      where: { EntradaID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (entrada) {
      await entrada.update(req.body, { transaction: t })
      await t.commit()
      res.json(entrada)
    } else {
      await t.rollback()
      res.status(404).json({ message: "Entrada não encontrada" })
    }
  } catch (error) {
    await t.rollback()
    console.error("Erro ao atualizar entrada:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirEntrada = async (req, res) => {
  const t = await sequelize.transaction()

  try {
    console.log(`Excluindo entrada ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const entrada = await Entrada.findOne({
      where: { EntradaID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (entrada) {
      await entrada.destroy({ transaction: t })
      await t.commit()
      res.json({ message: "Entrada excluída com sucesso" })
    } else {
      await t.rollback()
      res.status(404).json({ message: "Entrada não encontrada" })
    }
  } catch (error) {
    await t.rollback()
    console.error("Erro ao excluir entrada:", error)
    res.status(500).json({ message: error.message })
  }
}

