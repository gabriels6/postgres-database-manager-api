const client = require('../../Connection');

module.exports = {
    async Select(table = "",table_fields = ["\*"]){

        console.log(`SQL Query::: SELECT ${table_fields.join(",")} FROM ${table}`)

        const { fields, rows } = await client.query(`SELECT ${table_fields.join(",")} FROM ${table}`);

        let fieldNames = fields.map((value) => {
            return value.name;
        })

        return { fields:fieldNames, rows:rows };
    },
}