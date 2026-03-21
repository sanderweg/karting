let init = 0
let index = 0

async function getData() {

  let url = `/api/apex?init=${init}&index=${index}`

  let res = await fetch(url)
  let text = await res.text()

  console.log("RAW:", text)

  if (!text.includes("@")) return null

  let parts = text.split("@")

  init = parts[0]
  index = parts[1]

  return parts[2]
}

// 🔥 PARSER (simpel maar werkt)
function getRows(raw) {

  let rows = []

  if (!raw) return rows

  let parts = raw.split("$")

  for (let p of parts) {

    if (p.includes("|")) {

      let cols = p.split("|")

      rows.push({
        pos: cols[0],
        kart: cols[1],
        name: cols[2],
        last: cols[3],
        best: cols[4],
        gap: cols[5] || "0"
      })
    }
  }

  return rows
}
