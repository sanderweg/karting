let init = 0
let index = 0

async function getData(){

let url = "https://www.apex-timing.com/live-timing/commonv2/functions/live_ajax.php"
+ "?init=" + init
+ "&index=" + index

let res = await fetch(url)
let text = await res.text()

if(!text.includes("@")) return null

let parts = text.split("@")

init = parts[0]
index = parts[1]

return parts[2]

}

function parseData(raw){

let data = {}
let parts = raw.split("$")

parts.forEach(p => {
if(p.includes("=")){
let [k,v] = p.split("=")
data[k] = v
}
})

let positions = []

Object.keys(data).forEach(k => {

if(k.startsWith("pos")){
let v = data[k].split(",")

positions.push({
pos: parseInt(v[0]),
kart: v[1],
name: v[2]
})
}

})

data.positions = positions
return data
}

function getMyData(data, kart){

let list = data.positions
let i = list.findIndex(d => d.kart == kart)

if(i === -1) return null

return {
me: list[i],
ahead: list[i-1] || null,
behind: list[i+1] || null
}

}
