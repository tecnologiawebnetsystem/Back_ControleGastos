const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class CartaoCredito extends Model {
    static associate(models) {
      CartaoCredito.belongsTo(models.Usuario, { foreignKey: "UsuarioID" })
      CartaoCredito.belongsTo(models.Banco, { foreignKey: "BancoID" })
    }
  }

  CartaoCredito.init(
    {
      CartaoCreditoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UsuarioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      BancoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ValorCredito: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      DataVencimento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CartaoCredito",
      tableName: "CartaoCredito",
      timestamps: false,
    },
  )

  return CartaoCredito
}

