<script>
	import { fetchData } from "./data"
	import TabView from "./TabView.svelte"
	import CloseIcon from "~icons/eva/close-fill"
	import ListIcon from "~icons/eva/list-fill"
	// import SettingsIcon from "~icons/eva/settings-2-outline"
	import Playlists from "./Playlists.svelte"
	import Settings from "./Settings.svelte"

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

<dialog id="sub2lists-popup" bind:this={dialog} on:close={hide}>
	<TabView initial="playlists">
		<menu slot="tabs" let:selected let:select>
			<button
				class="tab"
				class:selected={false && selected == "playlists"}
				on:click={select("playlists")}
				autofocus
			>
				<ListIcon />
				Playlists
			</button>
			<!-- <button
				class="tab"
				class:selected={selected == "settings"}
				on:click={select("settings")}
			>
				<SettingsIcon />
				Settings
			</button> -->
			<button class="tab tab-close" on:click={hide}>
				<CloseIcon height="3rem" width="3rem" />
			</button>
		</menu>
		<svelte:fragment let:selected slot="contents">
			<div id="playlists" class:hidden={selected != "playlists"}>
				{#await playlists}
					<p>Loading...</p>
				{:then playlists}
					<Playlists {playlists} />
				{:catch error}
					<p>Error!</p>
				{/await}
			</div>
			<div id="settings" class:hidden={selected != "settings"}><Settings /></div>
		</svelte:fragment>
	</TabView>
</dialog>

<style>
	:global(#sub2lists-popup *::-webkit-scrollbar) {
		width: 9px;
		height: 9px;
	}
	:global(#sub2lists-popup *::-webkit-scrollbar-track) {
		background: transparent;
	}
	:global(#sub2lists-popup *::-webkit-scrollbar-thumb) {
		background-color: rgba(155, 155, 155, 0.5);
		border: transparent;
	}

	dialog {
		position: fixed;
		background: var(--yt-spec-general-background-a);
		color: var(--yt-spec-text-primary);
		border-color: var(--yt-spec-text-primary);
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

	menu {
		display: flex;
		border-bottom: 1px solid var(--yt-spec-text-primary);
		font-size: 2rem;
	}
	.tab {
		background-color: transparent;
		border: none;
		border-right: 1px solid var(--yt-spec-text-primary);
		padding: 1rem 1.5rem;
		color: inherit;
		font-size: 2rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.tab-close {
		border: none;
		border-left: 1px solid var(--yt-spec-text-primary);
		margin-left: auto;
		padding: 0.5rem;
		display: grid;
		place-items: center;
	}
	.selected,
	menu button:hover {
		background-color: var(--yt-spec-badge-chip-background);
	}

	#playlists {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		overflow-y: auto;
		height: 100%;
		padding: 2rem 1rem;
	}
	#playlists p {
		text-align: center;
		margin-top: 5rem;
		font-size: 3rem;
	}
	.hidden {
		display: none !important;
	}
</style>
