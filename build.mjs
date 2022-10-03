#!/usr/bin/env zx

// build UI components
await within(async () => {
	await cd("ui")
	await $`npm run build`
})

const { manifest_v2, manifest_v3 } = await import("./manifest.mjs")
await fs.writeFile("manifest.json", JSON.stringify(manifest_v3, null, 2))
