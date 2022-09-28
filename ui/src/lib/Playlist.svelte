<script>
	import Video from "./Video.svelte"
	import FlipIcon from "~icons/eva/flip-2-fill"
	import EyeIcon from "~icons/eva/eye-outline"
	import EyeClosedIcon from "~icons/eva/eye-off-outline"
	import { hiddenIDs, reversedIDs, toggleID } from "./stores"

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
	$: isReversed = $reversedIDs.includes(id)
	$: isHidden = $hiddenIDs.includes(id)
	$: processed = process(videos, isReversed)

	function process(..._dependencies) {
		if (isReversed) return videos.slice().reverse()
		else return videos
	}

	function reverse() {
		$reversedIDs = toggleID($reversedIDs, id)
	}

	function toggleHide() {
		$hiddenIDs = toggleID($hiddenIDs, id)
	}
</script>

<div>
	<p id="title">
		<a href={playlistURL}>{title}</a> - <a href={author.url}>by {author.name}</a>
		<button title="Reverse playlist order" on:click={reverse}><FlipIcon /></button>
		{#if isHidden}
			<button class="right" title="Show playlist" on:click={toggleHide}
				><EyeClosedIcon /></button
			>
		{:else}
			<button class="right" id="hide" title="Hide playlist" on:click={toggleHide}
				><EyeIcon /></button
			>
		{/if}
	</p>
	<div id="videos">
		{#each processed as video}
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
	button {
		all: initial;
		cursor: pointer;
		font-size: 2rem;
		display: flex;
		color: inherit;
	}
	.right {
		margin-left: auto;
	}
	#hide {
		opacity: 0.3;
		transition: opacity ease-in-out 0.15s;
	}
	#hide:hover {
		opacity: 1;
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
