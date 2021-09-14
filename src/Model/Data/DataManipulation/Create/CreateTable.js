const client = require('../../Connection');

module.exports = {
    async CreateTable(table,rows){
        console.log(`SQL Command::: CREATE TABLE ${table}(${rows});`);

        const result = await client.query(`CREATE TABLE ${table}(${rows});`);

        return result;
    }
}