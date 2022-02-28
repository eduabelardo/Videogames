const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('generos', {
		id: {
			unique: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
