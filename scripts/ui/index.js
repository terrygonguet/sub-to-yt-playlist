const script = document.querySelector("#sub2list")
const youtubeiURL = script.dataset.youtubeiURL

const { Innertube } = await import(youtubeiURL)
const youtube = await Innertube.create({
	cookie: document.cookie,
	fetch: (...args) => fetch(...args),
})

const html = String.raw
const fragments = {
	menuItem: html`<div id="sub2playlist-menuitem" class="title ytd-guide-entry-renderer">
		<a
			href="/feed/playlists"
			class="yt-simple-endpoint style-scope ytd-guide-entry-renderer"
			id="endpoint"
			><div
				style="
								padding: 0 24px;
								min-width: 0;
								height: var(--paper-item-min-height, 48px);
								display: flex;
								align-items: center;
								color: var(--yt-spec-brand-icon-inactive);
							"
			>
				<div style="width: 24px; height: 24px; margin-right: 24px">
					<svg
						viewBox="0 0 24 24"
						preserveAspectRatio="xMidYMid meet"
						focusable="false"
						style="
										pointer-events: none;
										display: block;
										width: 100%;
										height: 100%;
										fill: var(--yt-spec-brand-icon-inactive);
									"
						class="style-scope yt-icon"
					>
						<g class="style-scope yt-icon">
							<path
								d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z"
								class="style-scope yt-icon"
							></path>
						</g>
					</svg>
				</div>
				Playlists
			</div></a
		>
		<style>
			.ytd-guide-renderer[active] {
				background-color: var(--yt-spec-10-percent-layer);
			}
		</style>
	</div>`,
	menuItemMini: html`<div
		id="sub2playlist-menuitem-mini"
		class="style-scope ytd-mini-guide-renderer"
	>
		<a id="endpoint" class="yt-simple-endpoint style-scope ytd-mini-guide-entry-renderer"
			><div style="width: 24px; height: 24px; margin-bottom: 6px;">
				<svg
					viewBox="0 0 24 24"
					preserveAspectRatio="xMidYMid meet"
					focusable="false"
					style="
						pointer-events: none;
						display: block;
						width: 100%;
						height: 100%;
						fill: var(--yt-spec-brand-icon-inactive);
					"
					class="style-scope yt-icon"
				>
					<g class="style-scope yt-icon">
						<path
							d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z"
							class="style-scope yt-icon"
						></path>
					</g>
				</svg>
			</div>
			Playlists</a
		><style>
			.ytd-mini-guide-renderer {
				background-color: var(--yt-spec-brand-background-solid);
			}
			.ytd-mini-guide-renderer:hover {
				background-color: var(--yt-spec-badge-chip-background);
				outline: none;
			}
			.ytd-mini-guide-renderer[active] {
				background-color: var(--yt-spec-10-percent-layer);
			}
		</style>
	</div>`,
	popup: html`<dialog id="sub2playlist-popup">
		<div id="playlists"></div>
		<template id="playlist">
			<div>
				<a id="title" style="font-size: 2em">title</a>
				<div
					id="videos"
					style="display: grid;gap: 1rem;overflow-x: auto;scrollbar-width: thin;grid-auto-columns: 250px;grid-auto-flow: column;padding: 0.5rem"
				></div>
			</div>
		</template>
		<template id="video">
			<div style="display: flex;flex-direction: column;gap: 0.5rem;">
				<a id="videolink">
					<img id="thumbnail" style="width: 100%" />
					<span id="title">title</span>
					<a id="author">author</a>
				</a>
			</div>
		</template>
		<style>
			#sub2playlist-popup {
				position: fixed;
				background: var(--yt-spec-general-background-a);
				color: var(--yt-spec-text-primary);
				width: 90%;
				height: 90%;
				font-size: 1.2rem;
				scrollbar-width: thin;
			}
			#sub2playlist-popup::backdrop {
				background-color: rgba(0, 0, 0, 0.25);
			}
			#sub2playlist-popup #playlists {
				display: flex;
				flex-direction: column;
				gap: 3rem;
			}
			#sub2playlist-popup #title {
				font-family: "Roboto", "Arial", sans-serif;
				font-size: 1.4em;
				/* line-height: 2em; */
				font-weight: 500;
				/* max-height: 4rem; */
				overflow: hidden;
				display: block;
				-webkit-line-clamp: 2;
				display: box;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				white-space: normal;
			}
			#sub2playlist-popup a {
				color: inherit;
				text-decoration: none;
			}
		</style>
	</dialog>`,
}

/**
 * @param {string} htmlString
 * @returns {HTMLElement}
 */
function createElementFromHTML(htmlString) {
	var div = document.createElement("div")
	div.innerHTML = htmlString.trim()
	return div.firstChild
}

function ensureUIExists() {
	const isLoggedIn = document.querySelectorAll("[aria-label='Sign in']").length == 0
	let menuItem = document.querySelector("#sub2playlist-menuitem")
	let menuItemMini = document.querySelector("#sub2playlist-menuitem-mini")
	let popup = document.querySelector("#sub2playlist-popup")
	if (!isLoggedIn) {
		menuItem?.remove()
		menuItemMini?.remove()
		return
	}
	if (!menuItem) {
		const container = document.querySelector("#sections #items")
		menuItem = createMenuItem("regular")
		container?.insertBefore(menuItem, container.lastChild)
	}
	if (!menuItemMini) {
		const container = document.querySelector("ytd-mini-guide-renderer #items")
		menuItemMini = createMenuItem("mini")
		container.insertBefore(menuItemMini, container.lastChild)
	}
	if (!popup) {
		popup = createElementFromHTML(fragments.popup)
		document.body.append(popup)
	}
}

/**
 * @param {"regular" | "mini"} size
 * @returns {HTMLElement}
 */
function createMenuItem(size = "regular") {
	const element = createElementFromHTML(
		size == "regular" ? fragments.menuItem : fragments.menuItemMini,
	)

	const a = element.querySelector("a")
	a.addEventListener("click", e => {
		e.preventDefault()
		loadPlaylistPage()
	})

	return element
}

async function loadPlaylistPage() {
	const popup = document.querySelector("#sub2playlist-popup")
	if (!popup) return
	document.body.style.overflow = "hidden"
	popup.showModal()
	popup.addEventListener("close", () => document.body.style.removeProperty("overflow"))

	const library = await youtube.getLibrary()
	const playlists = await Promise.all(library.playlists.contents.map(massagePlaylist))
	const videos = playlists.filter(playlist => playlist.title != "Favorites")

	const videoEl = popup.querySelector("#video")
	const playlistEl = popup.querySelector("#playlist")
	const gridEl = popup.querySelector("#playlists")
	gridEl.replaceChildren()
	for (const playlist of playlists) {
		const listClone = playlistEl.content.firstElementChild.cloneNode(true)
		const titleEl = listClone.querySelector("#title")
		titleEl.textContent = playlist.title
		titleEl.href = `https://www.youtube.com/playlist?list=${playlist.id}`
		const videosEl = listClone.querySelector("#videos")
		for (const video of playlist.videos) {
			const clone = videoEl.content.firstElementChild.cloneNode(true)
			clone.querySelector("#videolink").href = `https://www.youtube.com/watch?v=${video.id}`
			clone.querySelector("#thumbnail").src = video.thumbnail.url
			clone.querySelector("#title").textContent = video.title
			const authorEl = clone.querySelector("#author")
			authorEl.textContent = video.author.name
			authorEl.href = video.author.url
			videosEl.append(clone)
		}
		gridEl.append(listClone)
	}
}

async function massagePlaylist(source) {
	return {
		author: source.author,
		id: source.id,
		title: source.title.text,
		videos: (await youtube.getPlaylist(source.id)).items.map(massageVideo),
	}
}

function massageVideo(source) {
	return {
		author: source.author,
		duration: source.duration.text,
		id: source.id,
		thumbnail: source.thumbnails[0],
		title: source.title.text,
	}
}

setInterval(ensureUIExists, 1000)
