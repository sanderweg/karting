export default async function handler(req, res) {

const url = "https://www.apex-timing.com/live-timing/kartbaanoldenzaal/ftp/tracks.json"

try {

const response = await fetch(url)
const data = await response.json()

res.setHeader("Access-Control-Allow-Origin", "*")
res.status(200).json(data)

} catch (e) {

res.status(500).json({ error: "failed", details: e.toString() })

}

}
