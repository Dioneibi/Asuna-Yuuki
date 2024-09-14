import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
m.react('🎋')

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let edtr = `@${m.sender.split`@`[0]}`

let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp;ANGELITO 🍃\nNICKNAME:🎋 Angel\nORG:Jᴏsᴇ Xʀʟ 🎋\nTITLE:soft\nitem1.TEL;waid=51950148255:+51 950 148 255\nitem1.X-ABLabel:📞 WhatsApp Owner\nitem2.URL:https://github.com/Dioneibi/Asuna-Yuuki\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET: tigresitocazador@gmail.com\nitem3.X-ABLabel:💌 Correo soporte\nitem4.ADR:;;🇵🇪 Perú;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel: Localización 🫧\nBDAY;value=date:🎋 10-09-2009\nEND:VCARD`
const tag_own = await conn.sendMessage(m.chat, { contacts: { displayName: packname, contacts: [{ vcard }] }}, { quoted: fkontak })
let caption = `*👋 Hola ${edtr}, este es el contacto de mi creador 🎋*`
    await conn.reply(m.chat, caption, tag_own, { mentions: conn.parseMention(caption) })

}
handler.help = ['owner', 'creator']
handler.tags = ['main']
handler.command = /^(owner|creator|creador|dueño)$/i

export default handler
