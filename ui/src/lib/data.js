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
 * @typedef {Object} DetailedVideo
 * @property {Author} author
 * @property {number} duration
 * @property {string} id
 * @property {{ url: string }} thumbnail
 * @property {string} title
 * @property  {Date} published
 */

/**
 * @typedef {Object} Author
 * @property {string} id
 * @property {string} name
 * @property {string} url
 */

const youtube = await Innertube.create({
	cookie: document.cookie,
	fetch: (...args) => fetch(...args),
})

export async function getPlaylists() {
	const library = await youtube.getLibrary()
	/** @type {Playlist[]} */
	const playlists = await Promise.all(library.playlists.contents.map(massagePlaylist))
	return playlists.filter(playlist => playlist.title != "Favorites")
}

/**
 * @param {string} id
 */
export async function addToWatchLater(id) {
	await youtube.playlist.addVideos("WL", [id])
}

/**
 * @param {string} id
 */
export async function removeFromWatchLater(id) {
	await youtube.playlist.removeVideos("WL", [id])
}

/**
 * @param {Playlist[]} playlists
 */
export async function getVideos(playlists) {
	const videoIds = playlists.flatMap(p => p.videos).map(v => v.id)
	const videos = await Promise.all(
		videoIds.map(id => youtube.getInfo(id).then(massageDetailedVideo)),
	)
	return videos
}

/**
 * @returns {Promise<Playlist>}
 */
async function massagePlaylist(source) {
	const playlist = await youtube.getPlaylist(source.id)
	return {
		author: massageAuthor(source.author),
		id: source.id,
		title: source.title.text,
		videos: playlist.items.map(massageVideo).reverse(),
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
		thumbnail: source.thumbnails[1],
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

/**
 * @returns {DetailedVideo}
 */
function massageDetailedVideo(source) {
	return {
		id: source.basic_info.id,
		title: source.basic_info.title,
		duration: source.basic_info.duration,
		thumbnail: source.basic_info.thumbnail[1],
		author: source.basic_info.channel,
		published: new Date(source.primary_info.published.text),
	}
}
