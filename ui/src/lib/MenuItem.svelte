<div id="sub2lists-menuitem" class="title ytd-guide-entry-renderer">
	<a
		href="/feed/playlists"
		class="yt-simple-endpoint style-scope ytd-guide-entry-renderer"
		id="endpoint"
		on:click|preventDefault
	>
		<div id="wrapper">
			<div id="icon">
				<svg
					viewBox="0 0 24 24"
					preserveAspectRatio="xMidYMid meet"
					focusable="false"
					class="style-scope yt-icon"
				>
					<g class="style-scope yt-icon">
						<path
							d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z"
							class="style-scope yt-icon"
						/>
					</g>
				</svg>
			</div>
			Playlists
		</div>
	</a>
</div>

<style>
	a {
		text-decoration: none;
		color: var(--yt-spec-text-primary);
	}
	#wrapper {
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
	svg {
		pointer-events: none;
		display: block;
		width: 100%;
		height: 100%;
		fill: var(--yt-spec-brand-icon-inactive);
	}
</style>
