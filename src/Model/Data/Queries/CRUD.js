const Select = require('./Select/Select');
const SelectByField = require('./Select/SelectByField');
const SelectJoin = require('./Select/SelectJoin');
const Update = require('./Update/Update');
const Insert = require('./Insert/Insert');
const Delete = require('./Delete/Delete');

module.exports = {
    ...Select,
    ...SelectByField,
    ...SelectJoin,
    ...Update,
    ...Insert,
    ...Delete,
}