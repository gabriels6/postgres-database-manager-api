const { response } = require('express');
const Table = require('../Model/Entities/Table');
const client = require('../Model/Data/Connection');



module.exports = {
    async createTable(request,response){

        const { name, rows } = request.body;

        const newTable = new Table(name,rows);

        try {
            let result = await newTable.CreateTable();

            return response.json(result);
        }catch(err){
            console.log(err);
            return response.json(err);
        }
        
    },
    async dropTable(request,response){
        const { table_name } = request.query;

        const table = new Table(table_name);

        let result = await table.DropTable();

        return response.json(result);
    },
    async getTables(request,response){

        const { name } = request.query;

        let result;

        console.log(name);

        result = await client.query("SELECT table_name "
            +"FROM information_schema.tables "
            +"WHERE table_schema = 'public' "
            +"ORDER BY table_name;");

        return response.json(result);
        
    },
    async SelectValueInTable(request,response){
        const { table_name } = request.params;
        const { field, value } = request.query;

        const table = new Table(table_name);

        let result;
        try {
            if (field == null){
                result = await table.SelectAll();
            } else {
                result = await table.SelectByValue(field,value);
            }
            
            return response.json(result);
        } catch (err) {
            return response.status(500).json({
                error:err
            })
        }
        
    },
    async insertItemInTable(request,response){

        const { table_name, fields } = request.body;

        const table = new Table(table_name);

        let table_data = await table.SelectAll();

        let table_data_objects = table_data.fields.filter((field) => {
            return field !== 'id';
        }).map((field) => {
            return {
                name:field
            };
        });

        table.rows = table_data_objects;

        let filteredFields = fields.map((field) => {
            return field.value;
        });

        let result = await table.InsertRow(filteredFields);

        return response.json(result);
    },
    async updateItemInTable(request,response){
        const { table_name } = request.params;
        const { field, value } = request.query;
        const rowParams = request.body;

        let rows = [];
        let rowValues = [];

        Object.keys(rowParams).forEach((key) => {
            rows.push({name:key});
        });

        Object.values(rowParams).forEach((value) => {
            rowValues.push(`'${value}'`);
        })

        const table = new Table(table_name,rows);

        let result = await table.Update(rowValues,field,value);

        return response.json(result);
    },
    async deleteItemInTable(request,response){
        const { table_name } = request.params;
        const { field, value } = request.query;

        const table = new Table(table_name);

        const result = table.Delete(field,value);

        return response.json(result);
    }
}