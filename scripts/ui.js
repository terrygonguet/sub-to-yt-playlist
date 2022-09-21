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
	</div>`,
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
	if (!document.querySelector("#sub2playlist-menuitem")) {
		const container = document.querySelector("#sections #items")
		const { lastChild } = container
		const menuItem = createElementFromHTML(fragments.menuItem)
		container.insertBefore(menuItem, lastChild)
	}
}

setInterval(ensureUIExists, 1000)
