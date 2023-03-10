<script>
	import { getVideos, innertube } from "./data"
	import { cachedVideos, defaultTab, hiddenIDs } from "./stores"
	import Video from "./Video.svelte"

	/** @typedef {import("./data").Playlist} Playlist */

	/** @type {Playlist[]} */
	export let playlists = []

	$: processed = playlists.filter(p => !$hiddenIDs.includes(p.id))
	$: promise = fetchData($innertube, processed)
	$: numCached = Object.keys($cachedVideos).length

	/**
	 * @param {import("youtubei.js").Innertube} youtube
	 * @param {Playlist[]} playlists
	 */
	async function fetchData(youtube, playlists) {
		const videos = await getVideos(youtube, playlists, $cachedVideos)
		for (const video of videos) {
			$cachedVideos[video.id] = video
			video.published = new Date(video.published)
		}
		return videos.sort((a, b) => b.published.getTime() - a.published.getTime()).slice(0, 100)
	}
</script>

<div id="feed">
	<label id="default-tab" on:click={() => ($defaultTab = "feed")}>
		Make this the default tab
		<input type="checkbox" disabled checked={$defaultTab == "feed"} />
	</label>

	{#await promise}
		<p class="message">
			Loading...
			{#if numCached == 0}
				<br />First time caching might take a minute
			{/if}
		</p>
	{:then videos}
		<div id="videos">
			{#each videos as video}
				<Video {...video} />
			{/each}
		</div>
	{:catch error}
		{@debug error}
		<p class="message">Error!</p>
		<p class="message">{error.message}</p>
	{/await}
</div>

<style>
	#feed {
		overflow-y: auto;
		padding: 2rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	#default-tab {
		align-self: flex-end;
		cursor: pointer;
	}

	.message {
		text-align: center;
		margin-top: 5rem;
		font-size: 3rem;
		line-height: 1.5;
	}

	#videos {
		display: grid;
		gap: 3rem 1rem;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}
</style>
