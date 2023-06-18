<script>
	import PlaylistIcon from "./svg/PlaylistIcon.svelte"
</script>

<button id="sub2lists-menuitem" class="ytd-guide-entry-renderer" on:click|preventDefault>
	<div class="yt-simple-endpoint style-scope ytd-guide-entry-renderer" id="endpoint">
		<div id="icon">
			<PlaylistIcon />
		</div>
		Playlists
	</div>
</button>

<style>
	#sub2lists-menuitem {
		min-height: var(--paper-item-min-height, 48px);
		cursor: pointer;
		box-sizing: border-box;
		outline: 0;
		color: var(--yt-spec-text-primary);
		border: none;
		padding: 0;
		background: transparent;
		display: block;
		position: relative;
		border-radius: 10px;
		width: calc(100% - 12px);
		font-family: "Roboto", "Arial", sans-serif;
	}
	#endpoint {
		padding: 0 12px;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 1.4rem;
		line-height: 2rem;
		font-weight: 400;
	}
	#icon {
		width: 24px;
		height: 24px;
		margin-right: 24px;
	}
</style>
