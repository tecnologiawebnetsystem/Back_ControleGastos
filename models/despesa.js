const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Despesa extends Model {
    static associate(models) {
      Despesa.belongsTo(models.Usuario, { foreignKey: "UsuarioID" })
      Despesa.belongsTo(models.Categoria, { foreignKey: "CategoriaID" })
    }
  }

  Despesa.init(
    {
      DespesaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UsuarioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CategoriaID: {
        type: DataTypes.INTEGER,
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
      DataVencimento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      DataPagamento: {
        type: DataTypes.DATE,
      },
      Parcelado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      NumeroTotalParcelas: {
        type: DataTypes.INTEGER,
      },
      NumeroParcela: {
        type: DataTypes.INTEGER,
      },
      Status: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Despesa",
      tableName: "Despesas",
      timestamps: false,
      hooks: {
        afterCreate: async (despesa, options) => {
          await sequelize.models.Movimentacao.create(
            {
              UsuarioID: despesa.UsuarioID,
              Tipo: "Despesa",
              Descricao: despesa.Descricao,
              Valor: despesa.Valor,
              Data: despesa.DataPagamento || despesa.DataVencimento,
              CategoriaID: despesa.CategoriaID,
              Status: despesa.Status,
            },
            { transaction: options.transaction },
          )
        },
        afterUpdate: async (despesa, options) => {
          await sequelize.models.Movimentacao.update(
            {
              Descricao: despesa.Descricao,
              Valor: despesa.Valor,
              Data: despesa.DataPagamento || despesa.DataVencimento,
              CategoriaID: despesa.CategoriaID,
              Status: despesa.Status,
            },
            {
              where: {
                UsuarioID: despesa.UsuarioID,
                Tipo: "Despesa",
                Data: despesa.DataPagamento || despesa.DataVencimento,
              },
              transaction: options.transaction,
            },
          )
        },
        afterDestroy: async (despesa, options) => {
          await sequelize.models.Movimentacao.destroy({
            where: {
              UsuarioID: despesa.UsuarioID,
              Tipo: "Despesa",
              Data: despesa.DataPagamento || despesa.DataVencimento,
            },
            transaction: options.transaction,
          })
        },
      },
    },
  )

  return Despesa
}

