let iframe

function createFrame(){

if(document.getElementById("apexFrame")) return

iframe = document.createElement("iframe")
iframe.id = "apexFrame"
iframe.src = "https://www.apex-timing.com/live-timing/kartbaanoldenzaal/"
iframe.style.display = "none"

document.body.appendChild(iframe)

}

async function getRows(){

createFrame()

try{

let doc = iframe.contentDocument || iframe.contentWindow.document

let rows = doc.querySelectorAll("table tbody tr")

if(rows.length === 0) return null

return rows

}catch(e){

console.log("iframe nog niet klaar")
return null

}

}

function calcGap(a,b){

let toMs = t => {
let parts = t.split(":")
if(parts.length < 2) return 0
return parseFloat(parts[0])*60 + parseFloat(parts[1])
}

let gap = toMs(a) - toMs(b)

return gap.toFixed(3)

}
