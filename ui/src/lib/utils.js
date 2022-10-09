/**
 * @param {string[]} array
 * @param {string} id
 */
export function toggleID(array, id) {
	return array.includes(id) ? array.filter(r => r != id) : [...array, id]
}
