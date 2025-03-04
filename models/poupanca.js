const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Poupanca extends Model {
    static associate(models) {
      Poupanca.belongsTo(models.Usuario, { foreignKey: "UsuarioID" })
      Poupanca.belongsTo(models.Banco, { foreignKey: "BancoID" })
      Poupanca.belongsTo(models.TipoOperacao, { foreignKey: "TipoOperacaoID" })
    }
  }

  Poupanca.init(
    {
      PoupancaID: {
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
      Valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      DataOperacao: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Descricao: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      TipoOperacaoID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Poupanca",
      tableName: "Poupanca",
      timestamps: false,
      hooks: {
        afterCreate: async (poupanca, options) => {
          await sequelize.models.Movimentacao.create(
            {
              UsuarioID: poupanca.UsuarioID,
              Tipo: "Poupanca",
              Descricao: poupanca.Descricao,
              Valor: poupanca.Valor,
              Data: poupanca.DataOperacao,
              BancoID: poupanca.BancoID,
            },
            { transaction: options.transaction },
          )
        },
        afterUpdate: async (poupanca, options) => {
          await sequelize.models.Movimentacao.update(
            {
              Descricao: poupanca.Descricao,
              Valor: poupanca.Valor,
              Data: poupanca.DataOperacao,
              BancoID: poupanca.BancoID,
            },
            {
              where: {
                UsuarioID: poupanca.UsuarioID,
                Tipo: "Poupanca",
                Data: poupanca.DataOperacao,
              },
              transaction: options.transaction,
            },
          )
        },
        afterDestroy: async (poupanca, options) => {
          await sequelize.models.Movimentacao.destroy({
            where: {
              UsuarioID: poupanca.UsuarioID,
              Tipo: "Poupanca",
              Data: poupanca.DataOperacao,
            },
            transaction: options.transaction,
          })
        },
      },
    },
  )

  return Poupanca
}

