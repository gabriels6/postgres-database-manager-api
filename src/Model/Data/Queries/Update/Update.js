const client = require('../../Connection');

module.exports = {
    async Update(table = "",columns = [],condition = "",conditionResult = ""){

        console.log(`SQL Query::: UPDATE ${table} SET ${columns.join(",")} WHERE ${condition} = '${conditionResult}';`)

        const result = await client.query(`UPDATE ${table} SET ${columns.join(",")} WHERE ${condition} = '${conditionResult}'`);

        return result;
    },
}