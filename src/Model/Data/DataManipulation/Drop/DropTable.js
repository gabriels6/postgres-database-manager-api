const client = require('../../Connection');

module.exports = {
    async dropTable(table){
        console.log(`SQL Command::: DROP TABLE ${table};`);

        const result = await client.query(`DROP TABLE ${table};`);

        return result;
    }
}