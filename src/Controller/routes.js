const { Router } = require('express');
const TableController = require('./TableController');

const routes = Router();

routes.get('/table',TableController.getTables);
routes.post('/table',TableController.createTable);
routes.delete('/table',TableController.dropTable);

routes.post('/table/insert',TableController.insertItemInTable);

routes.get('/:table_name',TableController.SelectValueInTable);

routes.put('/:table_name',TableController.updateItemInTable);

routes.delete('/:table_name',TableController.deleteItemInTable);

module.exports = routes;