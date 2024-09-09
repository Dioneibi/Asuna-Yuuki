/* By Jtxs 🐢 */     
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*Ingresa un texto para hablar con gemini*`, m)

try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`)
let json = await api.json()

if (json.status === 'true') {
await conn.reply(m.chat, json.result, m)
} else {
conn.reply('error :v')
}
} catch {
conn.reply('error :v')
}
}

handler.help = ['gemini <texto>'];
handler.tags = ['ai'];
handler.command = ['gemini']

export default handler