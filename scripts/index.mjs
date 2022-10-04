const script = document.querySelector("#sub2lists")
const uiURL = script.dataset.uiURL

/** @type {typeof import("../ui/dist/ui.js")} */
const { Modal, MenuItem, MenuItemMini } = await import(uiURL)

/** @type {MenuItem | null} */
let menuItem
/** @type {MenuItemMini | null} */
let menuItemMini
/** @type {Modal | null} */
let popup

function ensureUIExists() {
	const isLoggedIn = document.querySelectorAll("[aria-label='Sign in']").length == 0
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