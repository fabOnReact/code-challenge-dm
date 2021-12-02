import { mergeList } from 'index';

test('merged the intervals', () => {
	const list = [
		[-50, 2],
		[2, 4],
		[5, 8],
	];
	const result = [
		[-50, 4],
		[5, 8],
	];
	expect(mergeList(list)).toEqual(result);
});
