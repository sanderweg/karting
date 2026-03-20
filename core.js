let API_URL = "https://karting.vercel.app/api/apex" // 👈 pas aan na deploy

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

// 🔹 alle karts ophalen
async function getKarts() {
    let data = await getData()

    if (!data || !data.tracks) return []

    let karts = []

    data.tracks.forEach(track => {
        if (track.sessions) {
            track.sessions.forEach(session => {
                if (session.drivers) {
                    session.drivers.forEach(driver => {
                        if (driver.number) {
                            karts.push(driver.number)
                        }
                    })
                }
            })
        }
    })

    return [...new Set(karts)]
}

// 🔹 dropdown vullen
async function fillKartDropdown() {
    let select = document.getElementById("kartSelect")
    if (!select) return

    let karts = await getKarts()

    select.innerHTML = ""

    karts.forEach(k => {
        let opt = document.createElement("option")
        opt.value = k
        opt.textContent = "Kart " + k
        select.appendChild(opt)
    })
}

// 🔹 helper: kart vinden
function findKart(data, kartNumber) {
    if (!data || !data.tracks) return null

    for (let track of data.tracks) {
        if (track.sessions) {
            for (let session of track.sessions) {
                if (session.drivers) {
                    for (let d of session.drivers) {
                        if (String(d.number) === String(kartNumber)) {
                            return {
                                driver: d,
                                session: session
                            }
                        }
                    }
                }
            }
        }
    }

    return null
}

// 🔹 QUALI DASHBOARD
async function updateQuali(kartNumber) {
    let data = await getData()
    let found = findKart(data, kartNumber)

    if (!found) return

    let myBest = found.driver.best || "-"
    let fastest = "-"

    // snelste tijd op baan zoeken
    data.tracks.forEach(track => {
        track.sessions?.forEach(s => {
            s.drivers?.forEach(d => {
                if (!fastest || d.best < fastest) {
                    fastest = d.best
                }
            })
        })
    })

    document.getElementById("myBest").textContent = myBest
    document.getElementById("fastest").textContent = fastest
}

// 🔹 SPRINT / ENDURANCE BASIS
async function updateRace(kartNumber) {
    let data = await getData()
    let found = findKart(data, kartNumber)

    if (!found) return

    let drivers = found.session.drivers

    // sorteer op positie
    drivers.sort((a, b) => a.position - b.position)

    let index = drivers.findIndex(d => String(d.number) === String(kartNumber))

    let me = drivers[index]
    let front = drivers[index - 1]
    let back = drivers[index + 1]

    document.getElementById("position").textContent = me?.position || "-"
    document.getElementById("front").textContent = front?.number || "-"
    document.getElementById("back").textContent = back?.number || "-"
}
