const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class StatusPagamento extends Model {
    static associate(models) {
      // Definir associações aqui, se necessário
    }
  }

  StatusPagamento.init(
    {
      StatusPagamentoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Descricao: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "StatusPagamento",
      tableName: "StatusPagamento",
      timestamps: false,
    },
  )

  return StatusPagamento
}

