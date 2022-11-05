<script>
	import PlaylistIcon from "./svg/PlaylistIcon.svelte"
</script>

<div id="sub2lists-menuitem" class="title ytd-guide-entry-renderer">
	<a
		href="/feed/playlists"
		class="yt-simple-endpoint style-scope ytd-guide-entry-renderer"
		id="endpoint"
		on:click|preventDefault
	>
		<div id="wrapper">
			<div id="icon">
				<PlaylistIcon />
			</div>
			Playlists
		</div>
	</a>
</div>

<style>
	/* #sub2lists-menuitem {
		width: calc(100% - 12px);
		border-radius: 10px;
	} */
	a {
		text-decoration: none;
		color: var(--yt-spec-text-primary);
	}
	#wrapper {
		/* padding: 0 12px; */
		padding: 0 24px;
		min-width: 0;
		height: var(--paper-item-min-height, 48px);
		display: flex;
		align-items: center;
		color: var(--yt-spec-brand-icon-inactive);
	}
	#icon {
		width: 24px;
		height: 24px;
		margin-right: 24px;
	}
</style>
