/**
 * Takes a string and detects if it is a valid item ID
 *
 * @param {String} str
 * @return {Boolean} 
 */
function isItemID(str){
  return (
    str.length === 36 &&
    str.split('-').length === 5
  )
}

module.exports = isItemID