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
	const isLoggedIn = document.querySelectorAll("#sign-in-button").length == 0
	if (!isLoggedIn) {
		menuItem?.$destroy()
		menuItemMini?.$destroy()
		return
	}

	const container = document.querySelector("#sections #items")
	if (container && !container.querySelector("#sub2lists-menuitem")) {
		const homeButton = container.firstChild
		const useNewUI = homeButton?.hasAttribute("guide-refresh") ?? true
		menuItem = new MenuItem({
			target: container,
			anchor: container.lastChild,
			props: { useNewUI },
		})
		menuItem.$on("click", () => popup.show())
	}

	const containerMini = document.querySelector("ytd-mini-guide-renderer #items")
	if (containerMini && !containerMini.querySelector("#sub2lists-menuitem-mini")) {
		const homeButton = containerMini.firstChild
		const useNewUI = homeButton?.hasAttribute("guide-refresh") ?? true
		menuItemMini = new MenuItemMini({
			target: containerMini,
			anchor:
				containerMini.querySelector("[aria-label='Library']") ?? containerMini.lastChild,
			props: { useNewUI },
		})
		menuItemMini.$on("click", () => popup.show())
	}

	if (!popup) {
		popup = new Modal({ target: document.body })
	}
}

setInterval(ensureUIExists, 1000)
