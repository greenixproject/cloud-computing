const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Activity = sequelize.define('activity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {   
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.STRING
  },
  time: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'activity',
  timestamps: false
});

module.exports = Activity;
