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
			allowNull: false,
		},
		released: {
			type: DataTypes.INTEGER,
		},
		rating: {
			type: DataTypes.INTEGER,
		},
		plataforms: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.TEXT,
		},
	});
};
