// Importar o sequelize para gerenciar o banco
import { DataTypes } from "sequelize";

// Importar o conector do banco
import db from "../db/conn.js";

const Clientes = db.define("clientes", {
  contrato: {
    type: DataTypes.INTEGER,
    require: true,
  },
  cliente: {
    type: DataTypes.STRING,
    require: true,
  },
  telefone: {
    type: DataTypes.STRING,
    require: true,
  },
  tipo: {
    type: DataTypes.STRING,
    require: true,
  },
  situacao: {
    type: DataTypes.STRING,
    require: true,
  },
  dataAgd: {
    type: DataTypes.DATEONLY,
    require: true,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  antecedencia: {
    type: DataTypes.INTEGER,
    require: true,
  },
  dataDisp: {
    type: DataTypes.DATEONLY,
    require: true,
  },
});

export default Clientes;
