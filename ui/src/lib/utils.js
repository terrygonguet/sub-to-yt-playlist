/**
 * @param {string[]} array
 * @param {string} id
 */
export function toggleID(array, id) {
	return array.includes(id) ? array.filter(r => r != id) : [...array, id]
}

/**
 * @param {number} seconds
 */
export function seconds2str(seconds) {
	const hours = Math.floor(seconds / 3600)
	seconds -= hours * 3600
	const minutes = Math.floor(seconds / 60)
	seconds -= minutes * 60
	return (hours ? hours + ":" : "") + minutes + ":" + seconds.toString().padStart(2, "0")
}

export function logAndPass(stuff) {
	console.log(stuff)
	return stuff
}
