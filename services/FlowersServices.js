class FlowersService {
	constructor(db) {
		this.client = db.sequelize;
		this.Flowers = db.Flower;
	}

	async getAll(condition, order, pagination) {
		return this.Flowers.findAll({
			limit: pagination.limit,
			offset: pagination.offset,
			where: condition,
			order: order,
		}).catch(function (err) {
			console.log(err);
		});
	}
}
module.exports = FlowersService;

