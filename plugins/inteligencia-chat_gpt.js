/* By Jtxs 🐢 */     
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat,`*ingresa un texto para hablar con chatgpt*`, m)

try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/chatgpt?text=${text}`)
let json = await api.json()

if (json.result) {
await conn.sendMessage(m.chat, {
text: json.result,
contextInfo: {
externalAdReply: {
title: '[ 𝐂 𝐇 𝐀 𝐓 - 𝐆 𝐏 𝐓 ]',
body: '©𝟐𝟎𝟐𝟒 𝐀𝐧𝐠𝐞𝐥𝐢𝐭𝐨-𝐎𝐅𝐂',
thumbnailUrl: 'https://i.ibb.co/XjqJjpP/file.jpg',
sourceUrl: canal,
mediaType: 1,
renderLargerThumbnail: true
}}},
{ quoted: m})
} else {
conn.reply('error :v')
}
} catch {
conn.reply('error :v')
}
}

handler.help = ['chatgpt <texto>'];
handler.tags = ['ai'];
handler.command = /^(chatgpt)$/i

export default handler