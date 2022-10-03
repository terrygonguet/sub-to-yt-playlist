import { Innertube } from "youtubei.js"

/**
 * @typedef {Object} Playlist
 * @property {Author} author
 * @property {string} id
 * @property {string} title
 * @property {Video[]} videos
 */

/**
 * @typedef {Object} Video
 * @property {Author} author
 * @property {string} duration
 * @property {string} id
 * @property {{ url: string }} thumbnail
 * @property {string} title
 */

/**
 * @typedef {Object} Author
 * @property {string} id
 * @property {string} name
 * @property {string} url
 */

const innerTube = Innertube.create({
	cookie: document.cookie,
	fetch: (...args) => fetch(...args),
})

export async function fetchData() {
	const youtube = await innerTube
	const library = await youtube.getLibrary()
	/** @type {Playlist[]} */
	const playlists = await Promise.all(library.playlists.contents.map(massagePlaylist))
	return playlists.filter(playlist => playlist.title != "Favorites")
}

/**
 * @param {string} id
 */
export async function addToWatchLater(id) {
	const youtube = await innerTube
	await youtube.playlist.addVideos("WL", [id])
}

/**
 * @param {string} id
 */
export async function removeFromWatchLater(id) {
	const youtube = await innerTube
	await youtube.playlist.removeVideos("WL", [id])
}

/**
 * @returns {Promise<Playlist>}
 */
async function massagePlaylist(source) {
	const youtube = await innerTube
	return {
		author: massageAuthor(source.author),
		id: source.id,
		title: source.title.text,
		videos: (await youtube.getPlaylist(source.id)).items.map(massageVideo).reverse(),
	}
}

/**
 * @returns {Video}
 */
function massageVideo(source) {
	return {
		author: massageAuthor(source.author),
		duration: source.duration.text,
		id: source.id,
		thumbnail: source.thumbnails[0],
		title: source.title.text,
	}
}

/**
 * @returns {Author}
 */
function massageAuthor(source) {
	return {
		id: source.id,
		name: source.name,
		url: source.url,
	}
}
