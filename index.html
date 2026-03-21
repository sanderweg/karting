export default async function handler(req, res) {

  try {

    let init = req.query.init || 0
    let index = req.query.index || 0

    let url = `https://www.apex-timing.com/live-timing/kartbaanoldenzaal/commonv2/functions/live_ajax.php?init=${init}&index=${index}`

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    })

    const text = await response.text()

    // CORS fix
    res.setHeader("Access-Control-Allow-Origin", "*")

    res.status(200).send(text)

  } catch (e) {
    res.status(500).json({ error: e.toString() })
  }
}
