<script>
	import { fetchData } from "./data"
	import Playlist from "./Playlist.svelte"

	export const show = () => {
		dialog.showModal()
		playlists = fetchData()
		document.body.style.overflow = "hidden"
	}
	export const hide = () => {
		dialog.close()
		document.body.style.removeProperty("overflow")
	}

	/** @typedef {import("./data").Playlist} Playlist */

	/** @type {HTMLDialogElement} */
	let dialog

	/** @type {Promise<Playlist[]>} */
	let playlists = new Promise(() => {})
</script>

<dialog id="sub2playlist-popup" bind:this={dialog} on:close={hide}>
	<div id="playlists">
		{#await playlists}
			<p>Loading...</p>
		{:then playlists}
			{#each playlists as playlist}
				<Playlist {...playlist} />
			{:else}
				<!-- TODO: Add tutorial -->
			{/each}
		{:catch error}
			<p>Error!</p>
		{/await}
	</div>
	<button id="close" on:click={hide}>
		<svg
			viewBox="0 0 24 24"
			preserveAspectRatio="xMidYMid meet"
			focusable="false"
			class="style-scope yt-icon"
		>
			<g class="style-scope yt-icon">
				<path
					d="M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z"
					class="style-scope yt-icon"
				/>
			</g>
		</svg>
	</button>
</dialog>

<style>
	dialog {
		position: fixed;
		background: var(--yt-spec-general-background-a);
		color: var(--yt-spec-text-primary);
		width: 90%;
		height: 90%;
		font-size: 1.2rem;
		padding: 0;
	}
	dialog * {
		scrollbar-width: thin;
		box-sizing: border-box;
	}
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.25);
	}
	#playlists {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		overflow-y: auto;
		height: 100%;
		padding: 1rem;
	}
	#playlists p {
		text-align: center;
		margin-top: 5rem;
		font-size: 3rem;
	}
	#close {
		all: initial;
		width: 5rem;
		height: 5rem;
		position: absolute;
		top: 1rem;
		right: 1rem;
		cursor: pointer;
	}

	svg {
		pointer-events: none;
		display: block;
		width: 100%;
		height: 100%;
		fill: white;
	}
</style>
