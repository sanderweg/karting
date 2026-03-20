let API_URL = "https://https://karting-eight.vercel.app/api/apex"

// 🔹 data ophalen
async function getData() {
    try {
        let res = await fetch(API_URL)
        let data = await res.json()

        console.log("DATA:", data)

        return data
    } catch (e) {
        console.error("Fetch error:", e)
        return null
    }
}

// 🔹 karts ophalen
async function getKarts() {
    let data = await getData()

    if (!data || !data.tracks) return []

    let karts = []

    data.tracks.forEach(track => {
        track.sessions?.forEach(session => {
            session.drivers?.forEach(driver => {
                if (driver.number) {
                    karts.push(driver.number)
                }
            })
        })
    })

    console.log("KARTS:", karts)

    return [...new Set(karts)]
}

// 🔹 dropdown vullen
async function fillKartDropdown() {
    let select = document.getElementById("kartSelect")

    if (!select) {
        console.log("❌ dropdown niet gevonden")
        return
    }

    let karts = await getKarts()

    if (karts.length === 0) {
        select.innerHTML = "<option>Geen karts gevonden</option>"
        return
    }

    select.innerHTML = ""

    karts.forEach(k => {
        let opt = document.createElement("option")
        opt.value = k
        opt.textContent = "Kart " + k
        select.appendChild(opt)
    })
}

// 🔹 navigatie
function goToDashboard(type) {
    let kart = document.getElementById("kartSelect").value

    if (!kart) {
        alert("Selecteer eerst een kart")
        return
    }

    window.location.href = type + ".html?kart=" + kart
}
