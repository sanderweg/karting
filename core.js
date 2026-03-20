let init = 0
let index = 0

async function getData(){

let target = "https://www.apex-timing.com/live-timing/kartbaanoldenzaal/commonv2/functions/live_ajax.php"
+ "?init=" + init
+ "&index=" + index

// 🔥 NIEUWE PROXY (werkt beter)
let url = "https://corsproxy.io/?" + encodeURIComponent(target)

let res = await fetch(url)
let text = await res.text()

console.log("RAW:", text)

if(!text.includes("@")) return null

let parts = text.split("@")

init = parts[0]
index = parts[1]

return parts[2]

}
