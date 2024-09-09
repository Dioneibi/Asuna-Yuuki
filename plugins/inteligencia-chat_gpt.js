/* By Jtxs 🐢 */     
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat,`*ingresa un texto para hablar con chatgpt*`, m)

try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/chatgpt?text=${text}`)
let json = await api.json()

if (json.result) {
await conn.reply(m.chat, json.result, m)
} else {
conn.reply('error :v')
}
} catch {
conn.reply('error :v')
}
}


handler.command = /^(chatgpt)$/i

export default handler