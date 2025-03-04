const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class TipoOperacao extends Model {
    static associate(models) {
      // Removida a associação com Usuario
    }
  }

  TipoOperacao.init(
    {
      TipoOperacaoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Coeficiente: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "TipoOperacao",
      tableName: "TipoOperacao",
      timestamps: false,
    },
  )

  return TipoOperacao
}

