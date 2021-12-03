// ASSUMPTIONS
// The intervals are only integers. Not undefined or null values.
// The intervals are NOT sorted.
// The intervals are arrays where the first value (start)
// is lower then the second value (end)
// for ex. [1, 2] and not [2, 1]
export function mergeList(list) {
  if (!list) throw getMessage("WRONG_LIST_VALUE", list);
  if (!Array.isArray(list)) throw getMessage("WRONG_LIST_TYPE", list);
  if (list.length === 0) return list;
  const sortedList = [...list];
  sortedList.sort((firstEl, secondEl) => {
    checkIntervalAndThrow(firstEl);
    checkIntervalAndThrow(secondEl);
    return firstEl[0] - secondEl[0];
  });
  if (sortedList.length === 1) checkIntervalAndThrow(sortedList[0]);
  let mergedList = [sortedList[0]];
  for (let i = 1; i < sortedList.length; i++) {
    const currentInterval = list[i];
    const currentStartTime = currentInterval[0];
    const previousEndTime = mergedList[mergedList.length - 1][1];
    if (currentStartTime <= previousEndTime) {
      const previousElement = mergedList.pop();
      const highestEndTime = Math.max(previousEndTime, currentInterval[1]);
      mergedList.push([previousElement[0], highestEndTime]);
    } else {
      mergedList.push(currentInterval);
    }
  }
  return mergedList;
}

function checkIntervalAndThrow(currentInterval) {
  if (!Array.isArray(currentInterval))
    throw getMessage("WRONG_LIST_TYPE", currentInterval);
  if (currentInterval.includes(undefined) || currentInterval.includes(null)) {
    throw getMessage("WRONG_LIST_VALUE", currentInterval);
  }
  if (currentInterval.length != 2)
    throw getMessage("WRONG_LENGTH", currentInterval);
  if (currentInterval[0] > currentInterval[1]) {
    throw getMessage("WRONG_INTERVAL_START", currentInterval);
  }
}

export function getMessage(type, data) {
  const ERROR_MSG = "currentInterval with value:";
  const ERROR_NOT_VALID_PARAM = "is not a valid parameter.";
  const ERROR_WRONG_TYPE = "is not of type Array.";
  const json = JSON.stringify(data);
  switch (type) {
    case "WRONG_LIST_VALUE":
      return `${ERROR_MSG} ${json} ${ERROR_NOT_VALID_PARAM}`;
    case "WRONG_LIST_TYPE":
      return `${ERROR_MSG} ${json} ${ERROR_WRONG_TYPE}`;
    case "WRONG_LENGTH":
      return `${ERROR_MSG} ${json} is not of length 2`;
    case "WRONG_INTERVAL_START":
      return (
        `${ERROR_MSG} ${json} is not acceptable parameter. ` +
        `The first value ${data[0]} should be smaller ` +
        `then second value ${data[1]}.`
      );
    default:
      console.error(
        `type: ${type} with ${data} does not have a ` +
          "corresponding error in getErrorMessage."
      );
  }
}
