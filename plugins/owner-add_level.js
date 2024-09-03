import MessageType from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Masukkan jumlah Limit yang akan diberi'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag salah satu lah'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (isNaN(txt)) throw 'Hanya angka'
    let poin = parseInt(txt)
    let limit = poin
    if (limit < 1) throw 'Minimal 1'
    if (limit >= 10000) throw 'kamu melebihi batas premium'    
    let users = global.db.data.users    
    if (!users[who]) {
        users[who] = {
            limit: 0,
            cooldown: 0
        }
    }    
    if (users[who].cooldown && users[who].cooldown > Date.now()) {
        let cooldown = clockString(users[who].cooldown - Date.now())
        throw `Tunggu *${cooldown}* lagi sebelum menggunakan command ini`
    }    
    users[who].level += poin
    users[who].cooldown = Date.now() + (5 * 60 * 1000)
    conn.reply(m.chat, `Selamat @${who.split`@`[0]}. Level kamu naik menjadi ${poin}`, m, { mentions: [who] }, {
        mentions: [m.sender]
    }) 
}

handler.help = ['addlevel @user <level>']
handler.tags = ['xp']
handler.command = /^addlevel$/
handler.owner =true
export default handler