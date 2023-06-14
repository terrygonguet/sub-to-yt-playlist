<script>
	import PlaylistIcon from "./svg/PlaylistIcon.svelte"
</script>

<button
	id="sub2lists-menuitem-mini"
	class="style-scope ytd-mini-guide-renderer"
	on:click|preventDefault
>
	<div id="endpoint" class="yt-simple-endpoint style-scope ytd-mini-guide-entry-renderer">
		<div id="wrapper">
			<PlaylistIcon />
		</div>
		Playlists
	</div>
</button>

<style>
	#sub2lists-menuitem-mini {
		padding: 0;
		border: none;
		background: transparent;
	}
	#sub2lists-menuitem-mini:hover {
		background-color: var(--yt-spec-badge-chip-background);
		outline: none;
	}
	.ytd-mini-guide-renderer:hover {
		border-radius: 10px;
		background-color: var(--yt-spec-badge-chip-background);
		outline: none;
	}
	#endpoint {
		width: 64px;
		padding: 16px 0 14px;
		outline: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	#wrapper {
		width: 24px;
		height: 24px;
		margin-bottom: 6px;
	}
</style>
