export default async (req, res) => {
  try {
    let init = req.query.init || 0
    let index = req.query.index || 0

    // 🔥 BELANGRIJK: refresh=true toevoegen
    let url = `https://www.apex-timing.com/live-timing/kartbaanoldenzaal/commonv2/functions/live_ajax.php?init=${init}&index=${index}&refresh=true`

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
        "Referer": "https://www.apex-timing.com/live-timing/kartbaanoldenzaal/",
        "Origin": "https://www.apex-timing.com"
      }
    })

    const text = await response.text()

    console.log("API RESPONSE:", text.substring(0, 100)) // debug

    // ❌ als Apex HTML terugstuurt → fout
    if (text.startsWith("<!DOCTYPE")) {
      return res.status(500).json({
        error: "Apex blokkeert request (HTML terug)"
      })
    }

    // ✅ CORS
    res.setHeader("Access-Control-Allow-Origin", "*")

    res.status(200).send(text)

  } catch (e) {
    res.status(500).json({ error: e.toString() })
  }
}
