const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Entrada extends Model {
    static associate(models) {
      Entrada.belongsTo(models.Usuario, { foreignKey: "UsuarioID" })
      Entrada.belongsTo(models.Categoria, { foreignKey: "CategoriaID" })
      Entrada.belongsTo(models.Empresa, { foreignKey: "EmpresaID" })
    }
  }

  Entrada.init(
    {
      EntradaID: {
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
      EmpresaID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Descricao: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      DataRecebimento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Entrada",
      tableName: "Entradas",
      timestamps: false,
      hooks: {
        afterCreate: async (entrada, options) => {
          await sequelize.models.Movimentacao.create(
            {
              UsuarioID: entrada.UsuarioID,
              Tipo: "Entrada",
              Descricao: entrada.Descricao,
              Valor: entrada.Valor,
              Data: entrada.DataRecebimento,
              CategoriaID: entrada.CategoriaID,
              EmpresaID: entrada.EmpresaID,
            },
            { transaction: options.transaction },
          )
        },
        afterUpdate: async (entrada, options) => {
          await sequelize.models.Movimentacao.update(
            {
              Descricao: entrada.Descricao,
              Valor: entrada.Valor,
              Data: entrada.DataRecebimento,
              CategoriaID: entrada.CategoriaID,
              EmpresaID: entrada.EmpresaID,
            },
            {
              where: {
                UsuarioID: entrada.UsuarioID,
                Tipo: "Entrada",
                Data: entrada.DataRecebimento,
              },
              transaction: options.transaction,
            },
          )
        },
        afterDestroy: async (entrada, options) => {
          await sequelize.models.Movimentacao.destroy({
            where: {
              UsuarioID: entrada.UsuarioID,
              Tipo: "Entrada",
              Data: entrada.DataRecebimento,
            },
            transaction: options.transaction,
          })
        },
      },
    },
  )

  return Entrada
}

