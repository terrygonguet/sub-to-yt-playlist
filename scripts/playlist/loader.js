// ES module importing rigamarole because of youtubei.js
const youtubeiURL = browser.runtime.getURL("vendor/youtubei.js")
const indexURL = browser.runtime.getURL("scripts/playlist/index.js")
const script = document.createElement("script")
script.src = indexURL
script.type = "module"
script.id = "sub2list"
script.dataset.youtubeiURL = youtubeiURL
document.head.append(script)
