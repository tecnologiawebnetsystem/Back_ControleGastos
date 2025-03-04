const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Movimentacao extends Model {
    static associate(models) {
      Movimentacao.belongsTo(models.Usuario, { foreignKey: "UsuarioID" })
      Movimentacao.belongsTo(models.Categoria, { foreignKey: "CategoriaID" })
      Movimentacao.belongsTo(models.Empresa, { foreignKey: "EmpresaID" })
      Movimentacao.belongsTo(models.Banco, { foreignKey: "BancoID" })
    }
  }

  Movimentacao.init(
    {
      MovimentacaoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UsuarioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Tipo: {
        type: DataTypes.ENUM("Entrada", "Despesa", "Poupanca"),
        allowNull: false,
      },
      Descricao: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      Valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      Data: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      CategoriaID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      EmpresaID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      BancoID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Status: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Movimentacao",
      tableName: "Movimentacoes",
      timestamps: false,
    },
  )

  return Movimentacao
}

