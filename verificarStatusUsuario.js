require("dotenv").config()
const { sequelize, Usuario } = require("./models")

async function verificarStatusUsuario() {
  try {
    await sequelize.authenticate()
    console.log("Conexão com o banco de dados estabelecida com sucesso.")

    const email = "kleber.goncalves@gmail.com" // Substitua pelo email do usuário que você está testando
    const usuario = await Usuario.findOne({ where: { email } })

    if (!usuario) {
      console.log("Usuário não encontrado.")
      return
    }

    console.log("Detalhes do usuário:")
    console.log("ID:", usuario.UsuarioID)
    console.log("Nome:", usuario.nome)
    console.log("Email:", usuario.email)
    console.log("Ativo:", usuario.ativo)
    console.log("Admin:", usuario.adm)

    // Verificar se o campo 'ativo' está definido corretamente
    if (usuario.ativo === undefined) {
      console.log("ATENÇÃO: O campo 'ativo' não está definido para este usuário.")
    }
  } catch (error) {
    console.error("Erro ao verificar status do usuário:", error)
  } finally {
    await sequelize.close()
  }
}

verificarStatusUsuario()

