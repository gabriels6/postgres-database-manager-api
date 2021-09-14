module.exports = {
    filterForUpdate(rows = ['','',''],rowValues = ['','','']){
        let filteredRows = [];

        for(let i = 0;i < rows.length;i++){
            if(rowValues[i] !== ''){
                filteredRows.push(rows[i] + '=' + rowValues[i])
            }    
        }
        return filteredRows;
    },
    convertObjectToSQLTable(object){

        let newObject = object.map((field) => {
            return field.name + " " + field.type + (field.size != null ? "(" + field.size + ")" : "") + " " + (field.primary_key ? "PRIMARY KEY " : " ") + (field.null_accepted ? "NULL " : "NOT NULL "); 
        })
        return newObject;
    }
}