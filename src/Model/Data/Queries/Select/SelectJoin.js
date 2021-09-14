const client = require('../../Connection');

module.exports = {
    async SelectJoin(table,firstTableFields,secondTable,secondTableFields,firstTableForeignKey,secondTablePrimaryKey,queryParams = ""){

        for(index in firstTableFields){
           firstTableFields[index] = table + "." + firstTableFields[index];
        }

        for(index in secondTableFields){
            secondTableFields[index] = secondTable + "." + secondTableFields[index];
        }

        const {rows} = await client.query(`SELECT ${firstTableFields.join(",")},${secondTableFields.join(",")} FROM ${table} JOIN ${secondTable} ON (${table}.${firstTableForeignKey} = ${secondTable}.${secondTablePrimaryKey}) ${queryParams}`);

        return rows;
    },
}