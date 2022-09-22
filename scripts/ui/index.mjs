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
		<div id="playlists">
			<p style="text-align: center;margin-top: 5rem;font-size: 3rem;">Loading...</p>
		</div>
		<button
			id="close"
			style="all: initial;width: 5rem;height: 5rem;position: absolute;top: 1rem;right: 1rem;cursor: pointer;"
		>
			<svg
				viewBox="0 0 24 24"
				preserveAspectRatio="xMidYMid meet"
				focusable="false"
				style="pointer-events: none; display: block; width: 100%; height: 100%;fill: white;"
				class="style-scope yt-icon"
			>
				<g class="style-scope yt-icon">
					<path
						d="M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z"
						class="style-scope yt-icon"
					></path>
				</g>
			</svg>
		</button>
		<template id="playlist">
			<div>
				<p
					style="display: flex;align-items: center;gap: 1rem;font-size: 2em;font-weight: 500;"
				>
					<a id="title">title</a
					><button
						id="reverse"
						style="all: initial;cursor: pointer;font-size: 2rem;"
						title="Reverse playlist order"
					>
						🔁
					</button>
				</p>
				<div
					id="videos"
					style="display: grid;gap: 1rem;overflow-x: auto;scrollbar-width: thin;grid-auto-columns: 250px;grid-auto-flow: column;padding: 0.5rem"
				></div>
			</div>
		</template>
		<template id="video">
			<div class="sub2playlist-video">
				<button id="watchlater">
					<span style="font-weight: bold;color: white;">Added!</span>
					<svg
						viewBox="0 0 24 24"
						preserveAspectRatio="xMidYMid meet"
						focusable="false"
						style="pointer-events: none; width: 100%; height: 100%;"
						class="style-scope yt-icon"
					>
						<g class="style-scope yt-icon">
							<path
								d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z"
								class="style-scope yt-icon"
							></path>
						</g>
					</svg>
				</button>
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
				padding: 0;
			}
			#sub2playlist-popup * {
				scrollbar-width: thin;
				box-sizing: border-box;
			}
			#sub2playlist-popup::backdrop {
				background-color: rgba(0, 0, 0, 0.25);
			}
			#sub2playlist-popup #playlists {
				display: flex;
				flex-direction: column;
				gap: 3rem;
				overflow-y: auto;
				height: 100%;
				padding: 1rem;
			}
			#sub2playlist-popup span#title {
				font-family: "Roboto", "Arial", sans-serif;
				font-size: 1.4em;
				font-weight: 500;
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
			.sub2playlist-video {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				position: relative;
			}
			.sub2playlist-video #watchlater {
				opacity: 0;
				transition: opacity ease-in-out 0.3s;
				background: rgba(30, 30, 30, 0.8);
				/* width: 30px; */
				height: 30px;
				padding: 2px;
				border-radius: 3px;
				position: absolute;
				top: 0.5rem;
				right: 0.5rem;
				border: 0;
				fill: lightgray;
				cursor: pointer;
			}
			.sub2playlist-video:hover #watchlater {
				opacity: 1;
			}
			.sub2playlist-video #watchlater[data-added="true"] svg {
				display: none;
			}
			.sub2playlist-video #watchlater span {
				display: none;
			}
			.sub2playlist-video #watchlater[data-added="true"] span {
				display: initial;
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
		popup.querySelector("#close").addEventListener("click", () => popup.close())
		popup.addEventListener("close", () => document.body.style.removeProperty("overflow"))
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
		listClone.querySelector("#reverse").addEventListener("click", () => {
			const els = Array.from(videosEl.children).reverse()
			els.forEach(el => {
				el.remove()
				videosEl.append(el)
			})
		})

		for (const video of playlist.videos.slice().reverse()) {
			const clone = videoEl.content.firstElementChild.cloneNode(true)
			clone.querySelector("#videolink").href = `https://www.youtube.com/watch?v=${video.id}`
			clone.querySelector("#thumbnail").src = video.thumbnail.url
			clone.querySelector("#title").textContent = video.title
			const authorEl = clone.querySelector("#author")
			authorEl.textContent = video.author.name
			authorEl.href = video.author.url
			const watchLaterEl = clone.querySelector("#watchlater")
			watchLaterEl.addEventListener("click", () => {
				if (watchLaterEl.dataset.added)
					youtube.playlist
						.removeVideos("WL", [video.id])
						.then(() => delete watchLaterEl.dataset.added)
				else
					youtube.playlist
						.addVideos("WL", [video.id])
						.then(() => (watchLaterEl.dataset.added = true))
			})
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
