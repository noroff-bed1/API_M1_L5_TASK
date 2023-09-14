module.exports = (sequelize, Sequelize) => {
	const Flower = sequelize.define(
		'Flower',
		{
			name: {
				type: Sequelize.STRING,
			},
			color: {
				type: Sequelize.STRING,
			},
			petalsNumber: {
				type: Sequelize.INTEGER,
			},
		},
		{
			timestamps: false,
		}
	);
	return Flower;
};

