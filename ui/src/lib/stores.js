import { syncable, setPrefix } from "svelte-syncable"

setPrefix("sub2lists")

/** @type {import("svelte/store").Writable<string[]>} */
export const hiddenIDs = syncable("hiddenIDs", [])

/** @type {import("svelte/store").Writable<string[]>} */
export const reversedIDs = syncable("reversedIDs", [])

/**
 * @param {string[]} array
 * @param {string} id
 */
export function toggleID(array, id) {
	return array.includes(id) ? array.filter(r => r != id) : [...array, id]
}
