const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    static associate(models) {
      Empresa.belongsTo(models.Usuario, { foreignKey: "UsuarioID" })
      Empresa.belongsTo(models.TipoContratacao, { foreignKey: "TipoContratacaoID" })
      Empresa.belongsTo(models.Banco, { foreignKey: "BancoID" }) // Nova associação com Banco
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
        references: {
          model: "Usuarios",
          key: "UsuarioID",
        },
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
        references: {
          model: "TipoContratacao",
          key: "TipoContratacaoID",
        },
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
      DiaPagamento_1: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 31,
        },
      },
      DiaPagamento_2: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 31,
        },
      },
      BancoID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Bancos",
          key: "BancoID",
        },
      },
    },
    {
      sequelize,
      modelName: "Empresa",
      tableName: "Empresas",
      timestamps: false,
    },
  )

  return Empresa
}

