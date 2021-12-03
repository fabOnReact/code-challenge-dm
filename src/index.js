"use strict";

// ASSUMPTIONS
// The intervals are only integers. Not undefined or null values.
// The intervals are NOT sorted.
// The intervals are arrays where the first value (start)
// is lower then the second value (end)
// for ex. [1, 2] and not [2, 1]

// take a list parameter which is an array of intervals
// [[2, 6], [1, 2]]
// returns an array of not overlapping intervals
// [[1, 6]]
export function merge(list) {
  if (!list) throw getMessage("WRONG_LIST_VALUE", list);
  if (!Array.isArray(list)) throw getMessage("WRONG_LIST_TYPE", list);
  if (list.length === 0) return list;
  checkIntervalsAndThrow(list);
  const sortedList = [...list];
  // sorts the intervals based on their starting minute
  // [[2, 6], [1, 2]] => [[1, 2], [2, 6]]
  sortedList.sort((firstEl, secondEl) => {
    return firstEl[0] - secondEl[0];
  });
  let mergedList = [sortedList[0]];
  for (let i = 1; i < sortedList.length; i++) {
    const currentInterval = sortedList[i];
    const currentStartTime = currentInterval[0];
    const previousInterval = mergedList[mergedList.length - 1];
    const previousEndTime = previousInterval[1];
    // if the currentStartTime (2) is lower or equal then
    // the previousEndTime (2), the two intervals are merged
    // [[1, 2], [2, 6]] => [[1, 6]]
    if (currentStartTime <= previousEndTime) {
      mergedList.pop();
      const lowestStartTime = Math.min(previousInterval[0], currentInterval[0]);
      const highestEndTime = Math.max(previousEndTime, currentInterval[1]);
      mergedList.push([lowestStartTime, highestEndTime]);
    } else {
      mergedList.push(currentInterval);
    }
  }
  return mergedList;
}

// takes the intervals as parameter
// verifies that the interval has the correct format
// if the format is not correct, triggers an error
function checkIntervalsAndThrow(intervals) {
  intervals.forEach((interval) => {
    if (!Array.isArray(interval)) throw getMessage("WRONG_LIST_TYPE", interval);
    if (interval.includes(undefined) || interval.includes(null)) {
      throw getMessage("WRONG_LIST_VALUE", interval);
    }
    if (interval.length != 2) throw getMessage("WRONG_LENGTH", interval);
    if (interval[0] > interval[1]) {
      throw getMessage("WRONG_INTERVAL_START", interval);
    }
  });
}

// parameter type identifies the type of message
// parameter data is an interval
// returns a string message
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
      throw (
        `type: ${type} with data: ${data} does not have a ` +
        "corresponding error message in getErrorMessage."
      );
  }
}
