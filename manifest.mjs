export const version = "1.2.0"

export const web_accessible_resources = ["scripts/index.mjs", "scripts/loader.js", "scripts/ui.js"]

export const browser_specific_settings = {
	gecko: {
		id: "sub2playlist@gonguet.com",
	},
}

export const base = {
	default_locale: "en",

	name: "__MSG_extensionName__",
	description: "__MSG_extensionDescription__",

	icons: {
		16: "icons/icon-16.png",
		48: "icons/icon-48.png",
		96: "icons/icon-96.png",
		128: "icons/icon-128.png",
	},

	content_scripts: [
		{
			matches: ["*://www.youtube.com/*"],
			js: ["scripts/loader.js"],
		},
	],
}

export const manifest_v2 = {
	manifest_version: 2,
	version,
	...base,
	browser_specific_settings,
	web_accessible_resources,
}

export const manifest_v3 = {
	manifest_version: 3,
	version,
	...base,
	web_accessible_resources: [
		{
			resources: web_accessible_resources,
			matches: ["*://www.youtube.com/*"],
		},
	],
}
