"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = require("../config/database");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
    },
}, {
    sequelize,
    modelName: "User",
    tableName: "User",
});
exports.default = User;
