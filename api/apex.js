export default async function handler(req, res) {
  try {
    let { init = 0, index = 0 } = req.query

    const url = `https://www.apex-timing.com/live-timing/kartbaanoldenzaal/commonv2/functions/live_ajax.php?init=${init}&index=${index}`

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.apex-timing.com/live-timing/kartbaanoldenzaal/",
        "Origin": "https://www.apex-timing.com",
        "Accept": "*/*"
      }
    })

    const text = await response.text()

    // 🔥 check of Apex HTML terugstuurt
    if (text.includes("<!DOCTYPE html>")) {
      return res.status(403).json({
        error: "Apex blokkeert request (HTML terug)",
        hint: "Headers niet correct"
      })
    }

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(200).send(text)

  } catch (e) {
    res.status(500).json({ error: e.toString() })
  }
}
