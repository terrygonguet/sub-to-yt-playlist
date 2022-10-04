#!/usr/bin/env zx

$.verbose = argv.v || argv.verbose
const colorize = $.verbose ? chalk.magenta.bold : str => str
$.quote = (...args) => args.join(" ")

echo(colorize("Copying source files..."))
await fs.ensureDir("dist")
await fs.copy("_locales", "dist/_locales")
await fs.copy("icons", "dist/icons")
await fs.copy("scripts", "dist/scripts")
await fs.copy("README.md", "dist/README.md")

if (!argv.s && !argv["skip-build"]) {
	echo(colorize("Builing UI components..."))
	await within(async () => {
		await cd("ui")
		await $`npm i`
		await $`npm run build`
	})
}

const { manifest_v2, manifest_v3 } = await import("./manifest.mjs")
const args = ["-i ui", "-s dist", "-o"]

echo(colorize("Building manifest V3 extension..."))
await fs.writeJSON("dist/manifest.json", manifest_v3, { spaces: "\t" })
await $`web-ext build ${args} -a manifest-v3-artifacts`

echo(colorize("Building manifest V2 extension..."))
await fs.writeJSON("dist/manifest.json", manifest_v2, { spaces: "\t" })
await $`web-ext build ${args} -a manifest-v2-artifacts`

echo(colorize("Done!"))
