<script>
	import PlaylistIcon from "./svg/PlaylistIcon.svelte"
</script>

<div id="sub2lists-menuitem-mini" class="style-scope ytd-mini-guide-renderer">
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
	.ytd-mini-guide-renderer {
		background-color: var(--yt-spec-brand-background-solid);
	}
	.ytd-mini-guide-renderer:hover {
		background-color: var(--yt-spec-badge-chip-background);
		outline: none;
	}
	#wrapper {
		width: 24px;
		height: 24px;
		margin-bottom: 6px;
	}
</style>
