<script>
	import { addToWatchLater, removeFromWatchLater } from "./data"

	/** @typedef {import("./data").Author} Author */

	/** @type {Author} */
	export let author
	/** @type {string} */
	export let title
	/** @type {string} */
	export let id
	/** @type {string} */
	export let duration
	/** @type {any} */
	export let thumbnail

	$: videoURL = `https://www.youtube.com/watch?v=${id}`

	/**
	 * @this {HTMLButtonElement}
	 */
	async function watchLater() {
		if (this.dataset.added) {
			await removeFromWatchLater(id)
			delete this.dataset.added
		} else {
			await addToWatchLater(id)
			this.dataset.added = "true"
		}
	}
</script>

<div class="sub2lists-video">
	<a href={videoURL}>
		<div id="thumbnail">
			<button id="watchlater" title="Add to watch later" on:click|preventDefault={watchLater}>
				<span>Added!</span>
				<svg
					viewBox="0 0 24 24"
					preserveAspectRatio="xMidYMid meet"
					focusable="false"
					class="style-scope yt-icon"
				>
					<g class="style-scope yt-icon">
						<path
							d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z"
							class="style-scope yt-icon"
						/>
					</g>
				</svg>
			</button>
			<img src={thumbnail.url} alt={title} />
			<span id="duration">{duration}</span>
		</div>
		<span id="title" {title}>{title}</span>
		<a id="author" href={author.url}>{author.name}</a>
	</a>
</div>

<style>
	.sub2lists-video {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		position: relative;
	}
	#title {
		font-family: "Roboto", "Arial", sans-serif;
		font-size: 1.4em;
		font-weight: 500;
		overflow: hidden;
		display: block;
		-webkit-line-clamp: 2;
		display: box;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		white-space: normal;
	}

	#watchlater {
		opacity: 0;
		transition: opacity ease-in-out 0.15s;
		background: rgba(10, 10, 10, 0.85);
		/* width: 30px; */
		height: 30px;
		padding: 2px;
		border-radius: 3px;
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		border: 0;
		fill: lightgray;
		cursor: pointer;
		font-weight: bold;
		color: white;
	}
	.sub2lists-video:hover #watchlater {
		opacity: 1;
	}
	.sub2lists-video #watchlater[data-added="true"] svg {
		display: none;
	}
	.sub2lists-video #watchlater span {
		display: none;
	}
	.sub2lists-video #watchlater[data-added="true"] span {
		display: initial;
	}
	#watchlater span {
		margin: 0 3px;
	}

	#thumbnail {
		position: relative;
	}
	#thumbnail img {
		width: 100%;
	}
	#duration {
		color: white;
		position: absolute;
		right: 0.5rem;
		bottom: 0.5rem;
		background-color: rgba(10, 10, 10, 0.85);
		padding: 3px 5px;
		border-radius: 3px;
		font-weight: bold;
	}
	a {
		text-decoration: none;
		color: var(--yt-spec-text-primary);
	}

	svg {
		pointer-events: none;
		width: 100%;
		height: 100%;
	}
</style>
