const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    static associate(models) {
      Empresa.belongsTo(models.Usuario, { foreignKey: "UsuarioID" })
      Empresa.belongsTo(models.TipoContratacao, { foreignKey: "TipoContratacaoID" })
    }
  }

  Empresa.init(
    {
      EmpresaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UsuarioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Cliente: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TipoContratacaoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      ValorVA: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      Ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Empresa",
      tableName: "Empresas",
      timestamps: false, // Assumindo que não há campos de timestamp na tabela
    },
  )

  return Empresa
}

