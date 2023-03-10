<script>
	import { accountIndex, defaultTab } from "./stores"
</script>

<div id="settings">
	<div id="fields">
		<label for="default-tab">
			Default tab
			<select bind:value={$defaultTab} id="default-tab">
				<option value="playlists">Playlists</option>
				<option value="feed">Feed</option>
			</select>
		</label>
		<label for="account-Index">
			Account index
			<input
				type="number"
				min="0"
				step="1"
				bind:value={$accountIndex}
				id="account-index"
				style:width="6rem"
			/>
		</label>
		<p class="info">
			If you are logged into multiple accounts and the wrong playlists or videos show up, try
			incrementing the "Account index" above.
		</p>
		<p class="info">
			For technical and privacy reasons we won't list the accounts here, just try a few
			numbers.
		</p>
	</div>
</div>

<style>
	#settings {
		display: grid;
		padding: 6rem;
		font-size: 1.5em;
		justify-content: center;
	}

	#fields {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	label {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		align-items: center;
	}

	input,
	select {
		border-radius: 0;
		border: 1px solid white;
		padding: 0.25rem 1rem;
		background: var(--yt-spec-general-background-a);
		color: inherit;
		font-size: inherit;
	}

	p.info {
		font-size: 1.5rem;
		opacity: 0.75;
		text-align: center;
	}
</style>
