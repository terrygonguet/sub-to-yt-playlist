// ES module importing rigamarole because of reasons
const youtubeiURL = browser.runtime.getURL("vendor/youtubei.js")
const uiURL = browser.runtime.getURL("ui/dist/ui.js")
const indexURL = browser.runtime.getURL("scripts/ui/index.mjs")
const script = document.createElement("script")
script.src = indexURL
script.type = "module"
script.id = "sub2list"
script.dataset.youtubeiURL = youtubeiURL
script.dataset.uiURL = uiURL
document.head.append(script)
