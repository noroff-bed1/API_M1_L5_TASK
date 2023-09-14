var express = require('express');
var router = express.Router();
const db = require('../models/');
const FlowerService = require('../services/FlowersServices');
const flowers = new FlowerService(db);
const { Op } = require('sequelize');
const client = require('../redis');

router.get('/', async (req, res) => {
	const { sort, name, color, petals, page, size } = req.query;
	const order = sort ? sort.split(',').map((pair) => pair.split(':')) : [];
	const nameCondition = name ? { name: { [Op.like]: `%${name}%` } } : null;
	const colorCondition = color ? { color: { [Op.like]: `%${color}%` } } : null;
	const petalsCondition = petals ? { petalsNumber: { [Op.like]: `%${petals}%` } } : null;
	const condition = { [Op.and]: [nameCondition, colorCondition, petalsCondition] };
	const pagination = getPagination(page, size);
	result = await flowers.getAll(condition, order, pagination);
	await client.set(req.originalUrl, JSON.stringify(result));
	// res.status(200).json(result);
	res.render('flowers', { flowers: result });
});

const getPagination = (page, size) => {
	const limit = size ? +size : 5;
	const offset = page ? (page - 1) * limit : 0;
	return { limit, offset };
};

module.exports = router;

