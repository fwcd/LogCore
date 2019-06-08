/**
 * Checks whether a base string contains
 * some pattern string at a certain index.
 * 
 * @param base The base string
 * @param matched The pattern that is supposed to be found in `base`
 * @param index The start index in base
 */
export function stringContainsAtIndex(base: string, matched: string, index: number): boolean {
	for (let i = 0; i < matched.length; i++) {
		let j = i + index;
		if (j >= base.length) {
			return false;
		} else if (base.charAt(j) !== matched.charAt(i)) {
			return false;
		}
	}
	return true;
}
