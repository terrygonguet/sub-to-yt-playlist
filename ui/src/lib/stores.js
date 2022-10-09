import { syncable, setPrefix } from "svelte-syncable"

setPrefix("sub2lists")

/**
 * @template T
 * @typedef {import("svelte/store").Writable<T>} Writable
 */

/** @type {Writable<string[]>} */
export const hiddenIDs = syncable("hiddenIDs", [])

/** @type {Writable<string[]>} */
export const reversedIDs = syncable("reversedIDs", [])

/** @type {Writable<string>} */
export const defaultTab = syncable("defaultTab", "playlists")
