const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class TipoContratacao extends Model {
    static associate(models) {
      // Removida a associação com Usuario
    }
  }

  TipoContratacao.init(
    {
      TipoContratacaoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TipoContratacao",
      tableName: "TipoContratacao",
      timestamps: false,
    },
  )

  return TipoContratacao
}

