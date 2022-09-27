const script = document.querySelector("#sub2list")
const youtubeiURL = script.dataset.youtubeiURL
const uiURL = script.dataset.uiURL

const { Innertube } = await import(youtubeiURL)
const youtube = await Innertube.create({
	cookie: document.cookie,
	fetch: (...args) => fetch(...args),
})

/** @type {typeof import("../../ui/dist/ui.js")} */
const { Modal, MenuItem, MenuItemMini } = await import(uiURL)

function ensureUIExists() {
	const isLoggedIn = document.querySelectorAll("[aria-label='Sign in']").length == 0
	/** @type {MenuItem | null} */
	let menuItem = document.querySelector("#sub2playlist-menuitem")
	/** @type {MenuItemMini | null} */
	let menuItemMini = document.querySelector("#sub2playlist-menuitem-mini")
	/** @type {Modal | null} */
	let popup = document.querySelector("#sub2playlist-popup")
	if (!isLoggedIn) {
		menuItem?.$destroy()
		menuItemMini?.$destroy()
		return
	}
	const container = document.querySelector("#sections #items")
	if (!menuItem && container) {
		menuItem = new MenuItem({ target: container, anchor: container.lastChild })
		menuItem.$on("click", () => popup.show())
	}
	const containerMini = document.querySelector("ytd-mini-guide-renderer #items")
	if (!menuItemMini && containerMini) {
		menuItemMini = new MenuItemMini({ target: containerMini, anchor: containerMini.lastChild })
		menuItemMini.$on("click", () => popup.show())
	}
	if (!popup) {
		popup = new Modal({ target: document.body })
	}
}

setInterval(ensureUIExists, 1000)
