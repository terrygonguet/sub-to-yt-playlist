// ES module importing rigamarole because of reasons
const uiURL = browser.runtime.getURL("ui/dist/ui.js")
const indexURL = browser.runtime.getURL("scripts/ui/index.mjs")
const script = document.createElement("script")
script.src = indexURL
script.type = "module"
script.id = "sub2lists"
script.dataset.uiURL = uiURL
document.head.append(script)
