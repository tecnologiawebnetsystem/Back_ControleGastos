const { Model } = require("sequelize")
const bcrypt = require("bcryptjs")

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Associações aqui...
    }
  }

  Usuario.init(
    {
      UsuarioID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "UsuarioID",
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Nome",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        field: "Email",
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Senha",
      },
      adm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "Adm",
      },
      ativo: {
        // Adicionando o campo 'ativo'
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "Ativo",
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "Usuarios",
      timestamps: false,
      underscored: false,
      hooks: {
        beforeCreate: async (usuario) => {
          if (usuario.senha) {
            usuario.senha = await bcrypt.hash(usuario.senha, 8)
          }
        },
        beforeUpdate: async (usuario) => {
          if (usuario.changed("senha")) {
            usuario.senha = await bcrypt.hash(usuario.senha, 8)
          }
        },
      },
    },
  )

  return Usuario
}

