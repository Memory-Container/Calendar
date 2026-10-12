function insertAfter(referenceNode, newNode) {
    // console.log(referenceNode, referenceNode.parentNode, newNode, referenceNode.nextSibling)
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function getLastDayOfMonth(year, month) {
  const firstDayOfNextMonth = new Date(year, month - 1, 1);
  firstDayOfNextMonth.setDate(0);
  return String(firstDayOfNextMonth);
}
function getFirstDayOfMonth(year, month) {
    let firstDayOfTheMonth = new Date(year, month - 1, 1)
    return String(firstDayOfTheMonth)
}