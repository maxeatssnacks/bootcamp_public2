const { BadRequestError } = require("../expressError");

// Helper function for making partial update queries
// Checks to make sure that there is valid data before creating string for query.
// Params:
// Object containing data to update
// Instructions on how to map data to SQL column names
// Returns:
// String of keys/values for SET clause
// Array of values to be used for the values

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
    `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
