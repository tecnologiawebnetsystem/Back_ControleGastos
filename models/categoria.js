const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      // Removida a associação com Usuario
    }
  }

  Categoria.init(
    {
      CategoriaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Coeficiente: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Categoria",
      tableName: "Categorias",
      timestamps: false,
    },
  )

  return Categoria
}

