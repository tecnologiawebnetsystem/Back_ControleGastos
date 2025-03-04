module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          nome: "Administrador",
          email: "admin@exemplo.com",
          senha: "admin123", // Em produção, deve-se fazer hash da senha
          ativo: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Usuário Teste",
          email: "teste@exemplo.com",
          senha: "teste123", // Em produção, deve-se fazer hash da senha
          ativo: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("usuarios", null, {})
  },
}

