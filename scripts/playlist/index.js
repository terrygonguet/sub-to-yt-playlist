const script = document.querySelector("#sub2list")
const youtubeiURL = script.dataset.youtubeiURL

const { Innertube } = await import(youtubeiURL)
const youtube = await Innertube.create({
	cookie: document.cookie,
	fetch: (...args) => fetch(...args),
})
console.log(youtube)
const playlist = await youtube.getPlaylist("PL42J1z7Be1euMmgDhFYYMKFjmWxRKunB3")
console.log(playlist)
