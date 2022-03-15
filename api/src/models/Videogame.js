const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('videogame', {
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			unique: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		released: {
			type: DataTypes.DATEONLY,
		},
		rating: {
			type: DataTypes.DECIMAL,
		},
		platforms: {
			type: DataTypes.STRING,
		},
		image: {
			type: DataTypes.TEXT,
		},
		source: {
			type: DataTypes.STRING,
		},
	});
};
