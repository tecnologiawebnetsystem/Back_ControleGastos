const { Despesa, Usuario } = require("../models")

exports.listarDespesas = async (req, res) => {
  try {
    console.log("Listando despesas para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario) {
      console.log("Usuário não encontrado")
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    if (!usuario.ativo) {
      console.log("Usuário inativo")
      return res.status(403).json({ message: "Usuário inativo" })
    }

    const despesas = await Despesa.findAll({ where: { UsuarioID: req.usuarioId } })
    console.log(`${despesas.length} despesas encontradas`)
    res.json(despesas)
  } catch (error) {
    console.error("Erro ao listar despesas:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterDespesa = async (req, res) => {
  try {
    console.log(`Obtendo despesa ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const despesa = await Despesa.findOne({
      where: { DespesaID: req.params.id, UsuarioID: req.usuarioId }, // Alterado de DespesasID para DespesaID
    })

    if (despesa) {
      res.json(despesa)
    } else {
      res.status(404).json({ message: "Despesa não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao obter despesa:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.criarDespesa = async (req, res) => {
  try {
    console.log("Criando nova despesa para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const novaDespesa = await Despesa.create({
      ...req.body,
      UsuarioID: req.usuarioId,
    })
    res.status(201).json(novaDespesa)
  } catch (error) {
    console.error("Erro ao criar despesa:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarDespesa = async (req, res) => {
  try {
    console.log(`Atualizando despesa ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const despesa = await Despesa.findOne({
      where: { DespesaID: req.params.id, UsuarioID: req.usuarioId }, // Alterado de DespesasID para DespesaID
    })

    if (despesa) {
      await despesa.update(req.body)
      res.json(despesa)
    } else {
      res.status(404).json({ message: "Despesa não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao atualizar despesa:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirDespesa = async (req, res) => {
  try {
    console.log(`Excluindo despesa ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const despesa = await Despesa.findOne({
      where: { DespesaID: req.params.id, UsuarioID: req.usuarioId }, // Alterado de DespesasID para DespesaID
    })

    if (despesa) {
      await despesa.destroy()
      res.json({ message: "Despesa excluída com sucesso" })
    } else {
      res.status(404).json({ message: "Despesa não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao excluir despesa:", error)
    res.status(500).json({ message: error.message })
  }
}

