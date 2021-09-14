const { response } = require('express');
const client = require('../../Connection');

module.exports = {
    async Delete(table,queryParam,queryValue){

        console.log(`SQL Query::: DELETE FROM ${table} WHERE ${queryParam} = ${queryValue};`);

        const result = await client.query(`DELETE FROM ${table} WHERE ${queryParam} = ${queryValue};`);

        return result;
    }
}