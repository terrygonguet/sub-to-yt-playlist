<script>
	import Video from "./Video.svelte"

	/** @typedef {import("./data").Video} Video */
	/** @typedef {import("./data").Author} Author */

	/** @type {Author} */
	export let author
	/** @type {string} */
	export let title
	/** @type {string} */
	export let id
	/** @type {Video[]} */
	export let videos = []

	$: playlistURL = `https://www.youtube.com/playlist?list=${id}`

	function reverse() {
		videos = videos.reverse()
	}
</script>

<div>
	<p id="title">
		<a href={playlistURL}>{title}</a> - <a href={author.url}>by {author.name}</a>
		<button id="reverse" title="Reverse playlist order" on:click={reverse}>🔁</button>
	</p>
	<div id="videos">
		{#each videos as video}
			<Video {...video} />
		{:else}
			<p>This playlist contains no videos.</p>
		{/each}
	</div>
</div>

<style>
	a {
		text-decoration: none;
		color: var(--yt-spec-text-primary);
	}
	#title {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 2em;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}
	#reverse {
		all: initial;
		cursor: pointer;
		font-size: 2rem;
	}
	#videos {
		display: grid;
		gap: 1rem;
		overflow-x: auto;
		scrollbar-width: thin;
		grid-auto-columns: 250px;
		grid-auto-flow: column;
		padding: 0.5rem;
	}
	#videos p {
		font-size: 2rem;
		margin: 3rem;
		grid-column: span 2;
	}
</style>
