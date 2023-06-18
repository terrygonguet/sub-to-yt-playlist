import { pLimit } from "plimit-lit"
import { accountIndex } from "./stores"
import { readable } from "svelte/store"
import { Innertube } from "youtubei.js"
import { logAndPass, seconds2str } from "./utils"

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
 * @property {string} duration
 * @property {string} id
 * @property {{ url: string }} thumbnail
 * @property {string} title
 * @property  {Date} published
 */

/**
 * @typedef {Object} Author
 * @property {string} id
 * @property {string} name
 * @property {string?} url
 */

/** @type {import("svelte/store").Readable<Innertube>} */
export const innertube = readable(null, set => {
	const cleanup = accountIndex.subscribe($accountIndex =>
		Innertube.create({
			cookie: document.cookie,
			account_index: $accountIndex,
			fetch: (...args) => fetch(...args),
		}).then(set),
	)
	return cleanup
})
const limit = pLimit(10)

/**
 * @param {Innertube} youtube
 */
export async function getPlaylists(youtube) {
	const library = await youtube.getLibrary()
	/** @type {Playlist[]} */
	const playlists = await Promise.all(
		library.playlists.map(data => massagePlaylist(youtube, data)),
	)
	return playlists.filter(playlist => playlist.title != "Favorites")
}

/**
 * @param {Innertube} youtube
 * @param {string} id
 */
export async function addToWatchLater(youtube, id) {
	return youtube.playlist.addVideos("WL", [id])
}

/**
 * @param {Innertube} youtube
 * @param {string} id
 */
export async function removeFromWatchLater(youtube, id) {
	return youtube.playlist.removeVideos("WL", [id])
}

/**
 * @param {Innertube} youtube
 * @param {Playlist[]} playlists
 * @param {Object<string, DetailedVideo>} cache
 */
export async function getVideos(youtube, playlists, cache = {}) {
	const videoIds = playlists.flatMap(p => p.videos).map(v => v.id)
	const videos = await Promise.all(
		videoIds.map(
			id => cache[id] ?? limit(() => youtube.getInfo(id).then(massageDetailedVideo)),
		),
	)
	return videos
}

/**
 * @param {Innertube} youtube
 * @returns {Promise<Playlist>}
 */
async function massagePlaylist(youtube, source) {
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
	return source
		? {
				author: massageAuthor(source.author),
				duration: source.duration.text,
				id: source.id,
				thumbnail: pickThumbnail(source.thumbnails),
				title: source.title.text,
		  }
		: {
				author: massageAuthor(undefined),
				duration: "0:00",
				id: "unknown",
				thumbnail: "#",
				title: "Unknown",
		  }
}

/**
 * @returns {Author}
 */
function massageAuthor(source) {
	return source
		? {
				id: source.id,
				name: source.name,
				url: source.url.endsWith("/u/undefined") ? undefined : source.url,
		  }
		: {
				id: "unknown",
				name: "Unknown",
				url: undefined,
		  }
}

/**
 * @returns {DetailedVideo}
 */
function massageDetailedVideo(source) {
	return source
		? {
				id: source.basic_info.id,
				title: source.basic_info.title,
				duration: seconds2str(source.basic_info.duration),
				thumbnail: pickThumbnail(source.basic_info.thumbnail),
				author: source.basic_info.channel,
				published: new Date(source.primary_info.published.text),
		  }
		: {
				id: "unknown",
				title: "Unknown",
				duration: "0:00",
				thumbnail: "#",
				author: massageAuthor(undefined),
				published: new Date(0),
		  }
}

/**
 * The 1st one is too hi def but the second one is sometimes 4:3
 * @param {{ width: number, height: number, url: string }[]} thumbs
 */
function pickThumbnail(thumbs) {
	const second = thumbs[1]
	const ratio = second.width / second.height
	return 1.7777777 - ratio > 0.1 ? thumbs[0] : second
}
