const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Activity = require('./activity.model');

const Transportation = sequelize.define('transportation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'transportation',
  timestamps: false
});

Transportation.belongsTo(Activity, { foreignKey: 'activity_id' });
Activity.hasMany(Transportation, { foreignKey: 'activity_id' });

module.exports = Transportation;
