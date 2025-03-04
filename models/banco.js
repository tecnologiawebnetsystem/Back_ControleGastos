const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Banco extends Model {
    static associate(models) {
      Banco.belongsTo(models.Usuario, { foreignKey: "UsuarioID" })
    }
  }

  Banco.init(
    {
      BancoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UsuarioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Codigo: {
        type: DataTypes.STRING(10),
      },
      Agencia: {
        type: DataTypes.STRING(20),
      },
      Conta: {
        type: DataTypes.STRING(20),
      },
      Pix: {
        type: DataTypes.STRING(100),
      },
    },
    {
      sequelize,
      modelName: "Banco",
      tableName: "Bancos",
      timestamps: false, // Assumindo que não há campos de timestamp na tabela
    },
  )

  return Banco
}

