import { DataTypes, Model } from "sequelize";
const sequelize = require("../config/database");
import User from "./user"; // Importa o modelo de usuário

class Transaction extends Model {
  public id!: number;
  public user_id!: number;
  public type!: "income" | "expense";
  public amount!: number;
  public category!: string;
  public date!: Date;
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM("income", "expense"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY, // Armazena apenas a data
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // Campo opcional
    },
  },
  {
    sequelize,
    modelName: "Transactions",
    tableName: "Transactions",
  }
);

export default Transaction;
