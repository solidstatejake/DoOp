const filterObject = (originalObject, fieldsToKeep) => {
  let result = {};
  Object.keys(originalObject).forEach(key => {
    fieldsToKeep.forEach(field => {
      if (key === field) result[ key ] = originalObject[ key ];
    })
  });
  return result
};

module.exports = filterObject;