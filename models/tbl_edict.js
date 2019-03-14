'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_edict = sequelize.define('tbl_edict', {
    word: DataTypes.STRING,
    detail: DataTypes.TEXT
  }, {});
  tbl_edict.associate = function(models) {
    // associations can be defined here
  };
  return tbl_edict;
};