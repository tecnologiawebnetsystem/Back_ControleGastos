const { Empresa, Usuario } = require("../models")

exports.listarEmpresas = async (req, res) => {
  try {
    console.log("Listando empresas para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario) {
      console.log("Usuário não encontrado")
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    if (!usuario.ativo) {
      console.log("Usuário inativo")
      return res.status(403).json({ message: "Usuário inativo" })
    }

    const empresas = await Empresa.findAll({ where: { UsuarioID: req.usuarioId } })
    console.log(`${empresas.length} empresas encontradas`)
    res.json(empresas)
  } catch (error) {
    console.error("Erro ao listar empresas:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.obterEmpresa = async (req, res) => {
  try {
    console.log(`Obtendo empresa ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const empresa = await Empresa.findOne({
      where: { EmpresaID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (empresa) {
      res.json(empresa)
    } else {
      res.status(404).json({ message: "Empresa não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao obter empresa:", error)
    res.status(500).json({ message: error.message })
  }
}

exports.criarEmpresa = async (req, res) => {
  try {
    console.log("Criando nova empresa para o usuário ID:", req.usuarioId)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const novaEmpresa = await Empresa.create({
      ...req.body,
      UsuarioID: req.usuarioId,
    })
    res.status(201).json(novaEmpresa)
  } catch (error) {
    console.error("Erro ao criar empresa:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.atualizarEmpresa = async (req, res) => {
  try {
    console.log(`Atualizando empresa ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const empresa = await Empresa.findOne({
      where: { EmpresaID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (empresa) {
      await empresa.update(req.body)
      res.json(empresa)
    } else {
      res.status(404).json({ message: "Empresa não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error)
    res.status(400).json({ message: error.message })
  }
}

exports.excluirEmpresa = async (req, res) => {
  try {
    console.log(`Excluindo empresa ID ${req.params.id} para o usuário ID ${req.usuarioId}`)
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario || !usuario.ativo) {
      console.log("Usuário não encontrado ou inativo")
      return res.status(403).json({ message: "Usuário não encontrado ou inativo" })
    }

    const empresa = await Empresa.findOne({
      where: { EmpresaID: req.params.id, UsuarioID: req.usuarioId },
    })

    if (empresa) {
      await empresa.destroy()
      res.json({ message: "Empresa excluída com sucesso" })
    } else {
      res.status(404).json({ message: "Empresa não encontrada" })
    }
  } catch (error) {
    console.error("Erro ao excluir empresa:", error)
    res.status(500).json({ message: error.message })
  }
}

