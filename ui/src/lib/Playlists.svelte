<script>
	import Playlist from "./Playlist.svelte"
	import { defaultTab, hiddenIDs } from "./stores"
	import EyeIcon from "~icons/eva/eye-outline"

	/** @type {import("./data").Playlist[]} */
	export let playlists = []

	let showHidden = false

	$: processed = playlists.filter(p => showHidden || !$hiddenIDs.includes(p.id))
	$: numHidden = $hiddenIDs.length

	function toggleHidden() {
		showHidden = !showHidden
	}
</script>

<div id="playlists">
	<label id="default-tab" on:click={() => ($defaultTab = "playlist")}>
		Make this the default tab
		<input type="checkbox" disabled checked={$defaultTab == "playlists"} />
	</label>

	{#each processed as playlist (playlist.id)}
		<Playlist {...playlist} />
	{:else}
		<!-- TODO: Add tutorial -->
	{/each}
	{#if numHidden > 0 && !showHidden}
		<p>
			Plus {numHidden} hidden playlist(s)
			<button on:click={toggleHidden}>
				<EyeIcon />
				Show
			</button>
		</p>
	{/if}
</div>

<style>
	#playlists {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		overflow-y: auto;
		height: 100%;
		padding: 2rem 1rem;
	}
	#default-tab {
		align-self: flex-end;
		cursor: pointer;
		margin-bottom: -2rem;
	}
	p {
		color: var(--yt-spec-text-primary);
		font-size: 2em;
		font-weight: 500;
		margin-bottom: 0.5rem;
		display: flex;
		gap: 1rem;
	}
	button {
		background: transparent;
		border: 1px solid var(--yt-spec-text-primary);
		padding: 0.5rem 1rem;
		font-size: 1.5rem;
		display: flex;
		gap: 0.5rem;
		align-items: center;
		color: inherit;
		transition: background-color ease-in-out 0.15s;
		cursor: pointer;
	}
	button:hover {
		background-color: var(--yt-spec-brand-background-solid);
	}
</style>
