<script>
	import { createEventDispatcher } from "svelte"

	/** @type {string} */
	export let initial = undefined
	/** @type {string} */
	export let selected = initial

	const emit = createEventDispatcher()

	/**
	 * @param {string} value
	 */
	function select(value) {
		return function () {
			const old = selected
			selected = value
			emit("change", { old, new: value })
		}
	}
</script>

<div>
	<slot name="tabs" {select} {selected} />
	<slot name="contents" {selected} />
</div>

<style>
	div {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
		height: 100%;
	}
</style>
