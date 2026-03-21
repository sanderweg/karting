export default async function handler(req, res) {

let init = req.query.init || 0
let index = req.query.index || 0

const url = "https://www.apex-timing.com/live-timing/kartbaanoldenzaal/commonv2/functions/live_ajax.php"
+ "?init=" + init
+ "&index=" + index

try {

const response = await fetch(url)
const text = await response.text()

res.setHeader("Access-Control-Allow-Origin", "*")
res.status(200).send(text)

} catch (e) {

res.status(500).json({ error: "failed" })

}

}
