const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Appointment extends Model {}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Appointments_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Time',
        key: 'id',
      },
    },
    Appointments_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Appointments_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Appointments',
  }
);

module.exports = Appointment;
