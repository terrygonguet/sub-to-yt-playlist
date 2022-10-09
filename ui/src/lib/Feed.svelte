<script>
	import { getVideos } from "./data"
	import { hiddenIDs } from "./stores"

	/** @type {import("./data").Playlist[]} */
	export let playlists = []

	$: processed = playlists.filter(p => !$hiddenIDs.includes(p.id))
	$: promise = getVideos(processed)
</script>

{#await promise then videos}
	<pre>{JSON.stringify(videos, null, 2)}</pre>
{/await}
