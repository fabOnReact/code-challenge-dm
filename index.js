// ASSUMPTIONS
// The intervals are only integers. Not undefined or null values.
// The intervals are NOT sorted.
// The intervals are arrays where the first value (start) is lower then the second value (end)
// for ex. [1, 2] and not [2, 1]
function mergeList(list) {
	if (!list) throw `list with value: ${list} is not a valid parameter.`;
	if (!Array.isArray(list))
		throw `list with value: ${list} is not of type Array.`;
	if (list.length === 0) return list;
	const sortedList = [...list];
	sortedList.sort((firstEl, secondEl) => firstEl[0] - secondEl[0]);
	let mergedList = [sortedList[0]];
	for (let i = 1; i < sortedList.length; i++) {
		const currentInterval = list[i];
		if (!Array.isArray(currentInterval))
			throw `currentInterval with value: ${currentInterval} is not an array.`;
		if (currentInterval.includes(undefined) || currentInterval.includes(null)) {
			const jsonValue = JSON.stringify(currentInterval);
			throw `currentInterval with value: ${jsonValue} is undefined.`;
		}
		if (currentInterval.length != 2)
			throw `currentInterval with value: ${currentInterval} is not of length 2`;
		if (currentInterval[0] > currentInterval[1])
			throw `currentInterval with value: ${currentInterval} is not acceptable parameter. The first value (start minute) should be smaller then second value (end minute).`;
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

const list = [
	[-25, 1],
	[2, 19],
	[14, 23],
	[4, 8],
];

console.log('mergeList(list)', mergeList(list));
