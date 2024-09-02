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
	return (
		(hours ? hours + ":" : "") +
		minutes +
		":" +
		seconds.toString().padStart(2, "0")
	)
}

export function logAndPass(stuff) {
	console.log(stuff)
	return stuff
}

/**
 * We need to do some headers massaging to fetch data from the correct YT account
 * when multiple accounts are logged in at the same time. Explained in:
 * https://github.com/terrygonguet/sub-to-yt-playlist/pull/3#issuecomment-2321875365
 * @param {string | URL} url
 * @param {RequestInit & { accountIndex: number }} options
 * @returns {Promise<Response>}
 */
export function fetchWithAccountIndex(url, options) {
	const { accountIndex } = options
	const dataSyncIds = [window.ytcfg.get("DELEGATED_SESSION_ID")]
	const dataSyncIdsKeyExpression =
		/^(\d+)(?:\|\|(\d+))*(?:::yt-player::yt-player-lv)$/

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i)
		const matches = key?.match(dataSyncIdsKeyExpression)
		if (matches) {
			dataSyncIds.push(
				...matches.slice(1).filter(id => id !== dataSyncIds[0]),
			)
		}
	}

	const headers = new Headers(options.headers || {})
	headers.set("X-Goog-AuthUser", window.ytcfg.get("SESSION_INDEX"))
	if (dataSyncIds[accountIndex]) {
		headers.set("X-Goog-PageId", dataSyncIds[accountIndex])
	}

	return fetch(url, { ...options, headers })
}
