<script>
	import PlaylistIcon from "./svg/PlaylistIcon.svelte"

	export let useNewUI = true
</script>

<div
	id="sub2lists-menuitem-mini"
	class="style-scope ytd-mini-guide-renderer"
	class:ui-new={useNewUI}
>
	<a
		id="endpoint"
		class="yt-simple-endpoint style-scope ytd-mini-guide-entry-renderer"
		on:click|preventDefault
	>
		<div id="wrapper">
			<PlaylistIcon />
		</div>
		Playlists
	</a>
</div>

<style>
	.ui-new.ytd-mini-guide-renderer {
		border-radius: 10px;
	}
	.ytd-mini-guide-renderer:hover {
		background-color: var(--yt-spec-badge-chip-background);
		outline: none;
	}
	.ui-new #endpoint {
		width: 64px;
	}
	#wrapper {
		width: 24px;
		height: 24px;
		margin-bottom: 6px;
	}
</style>
