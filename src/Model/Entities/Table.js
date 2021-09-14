const { filterForUpdate, convertObjectToSQLTable } = require('../../Utils/QueryUtils');
const CRUD = require('../Data/Queries/CRUD');
const { CreateTable } = require('../Data/DataManipulation/Create/CreateTable');
const { dropTable } = require('../Data/DataManipulation/Drop/DropTable');

class Table {

    constructor(
        name = '', 
        rows = [{
            name:'',
            type:'',
            size:'',
            primary_key:false,
            foreign_key:{
                references:''
            },
            null_accepted: false
        }]
    ){
        this.name = name;
        this.rows = rows || [];
    }

    async CreateTable(){
        return await CreateTable(this.name.toString(),convertObjectToSQLTable(this.rows));
    }

    async DropTable(){
        return await dropTable(this.name.toString());
    }

    async InsertRow(row = ['value1','value2','value3']){
        let rowNames = this.getRowNames()

        let result = await CRUD.Insert(this.name,rowNames,row);

        return result;
    }

    async SelectAll(){
        let rowNames;
        
        rowNames = this.getRowNames();

        if(rowNames.length === 1 && rowNames[0] == ''){
            rowNames = ["\*"]
        }
        

        let result = await CRUD.Select(this.name,rowNames);

        return result;
    }

    async SelectByValue(field,value){
        let rowNames = this.getRowNames()

        if(rowNames.length === 1 && rowNames[0] == ''){
            rowNames = ["\*"]
        }

        if(typeof(value) == "string"){
            value = `'${value}'`;
        }

        let result = await CRUD.SelectByField(this.name,rowNames,field,value);

        return result;
    }

    async Update(rowValues,queryParam = 'id',queryValue = ''){

        let filteredRows = filterForUpdate(this.getRowNames(),rowValues);

        let result = await CRUD.Update(this.name,filteredRows,queryParam,queryValue);

        return result;
    }

    async Delete(queryParam = 'id',queryValue = ''){
        let result = await CRUD.Delete(this.name,queryParam,queryValue);

        return result;
    }

    getRowNames(){
        return this.rows.map((row) => {
            return row.name;
        });
    }

}

module.exports = Table;