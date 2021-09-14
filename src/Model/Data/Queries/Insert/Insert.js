const client = require('../../Connection');

module.exports = {
    async Insert(table,tablerows,values){

        console.log(`SQL Query::: INSERT INTO ${table} (${tablerows.join(",")}) VALUES (${values.join(",")});`)

        const result = await client.query(`INSERT INTO ${table} (${tablerows.join(",")}) VALUES (${values.join(",")});`);

        return result;
    },
}