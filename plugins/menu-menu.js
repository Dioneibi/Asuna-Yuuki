import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': '𝐼̲𝑁̲𝐹̲𝑂̲ 𝐵̲𝑂̲𝑇̲',
  'buscador': '𝐵̲𝑈̲𝑆̲𝑄̲𝑈̲𝐸̲𝐷̲𝐴̲𝑆̲',
  'search': '𝑆̲𝐸̲𝐴̲𝑅̲𝐶̲𝐻̲',
  'game': '𝐷̲𝐼̲𝑉̲𝐸̲𝑅̲𝑆̲𝐼̲𝑂̲𝑁̲',
  'jadibot': '𝑆̲𝑈̲𝐵̲ 𝐵̲𝑂̲𝑇̲𝑆̲',
  'rpg': '𝑅̲𝑃̲𝐺̲',
  'rg': '𝑅̲𝐸̲𝐺̲𝐼̲𝑆̲𝑇̲𝑅̲𝑂̲',
  'xp': '𝐸̲𝑋̲𝑃̲',
  'sticker': '𝑆̲𝑇̲𝐼̲𝐶̲𝐾̲𝐸̲𝑅̲𝑆̲',
  'anime': '𝐴̲𝑁̲𝐼̲𝑀̲𝐸̲𝑆̲',
  'database': '𝐷̲𝐴̲𝑇̲𝐴̲𝐵̲𝐴̲𝑆̲𝐸̲',
  'fix': '𝐹̲𝐼̲𝑋̲𝑀̲𝑆̲𝐺̲𝐸̲𝑆̲𝑃̲𝐸̲𝑅̲𝐴̲',
  'grupo': '𝐺̲𝑅̲𝑈̲𝑃̲𝑂̲𝑆̲',
  'nable': '𝑂̲𝑁̲ / 𝑂̲𝐹̲𝐹̲',
  'dl': '𝐷̲𝐸̲𝑆̲𝐶̲𝐴̲𝑅̲𝐺̲𝐴̲𝑆̲',
  'fun': '𝐻̲𝐸̲𝑅̲𝑅̲𝐴̲𝑀̲𝐼̲𝐸̲𝑁̲𝑇̲𝐴̲𝑆̲',
  'info': '𝐼̲𝑁̲𝐹̲𝑂̲𝑅̲𝑀̲𝐴̲𝐶̲𝐼̲𝑂̲𝑁̲',
  'nsfw': '𝑁̲𝑆̲𝐹̲𝑊̲',
  'owner': '𝐶̲𝑅̲𝐸̲𝐴̲𝐷̲𝑂̲𝑅̲',
  'mods': '𝑆̲𝑇̲𝐴̲𝐹̲𝐹̲',
  'audio': '𝐴̲𝑈̲𝐷̲𝐼̲𝑂̲𝑆̲',
  'ai': '𝐴̲𝐼̲ 𝐵̲𝑂̲𝑇̲',
  'convertir': '𝐶̲𝑂̲𝑁̲𝑉̲𝐸̲𝑅̲𝑇̲𝐼̲𝐷̲𝑂̲𝑅̲𝐸̲𝑆̲',
  'audios': '𝐴̲𝑈̲𝐷̲𝐼̲𝑂̲𝑆̲'
};

const defaultMenu = {
  before: `𑁯ᰍ🌸ᩥ ꎾ ✰* Asuna Yuuki* ✰ 𑁯ᰍ🌸ᩥ ꎾ
  
  “𝐇𝐨𝐥𝐚 *%name* 𝐒𝐨𝐲 𝐀𝐬𝐮𝐧𝐚 𝐘𝐮𝐮𝐤𝐢, %greeting"

╔═══════⩽🌸ᩥ⩾═══════╗
║ 	𝐈 𝐍 𝐅 𝐎 - 𝐔 𝐒 𝐄 𝐑
╚═══════⩽🌸ᩥ⩾═══════╝
- ෨᷐፝֟ - 🌸ᩧ͜   ݁.ꉹ᷐፝֟ꉹ *Nombre*:%name
- ෨᷐፝֟ - 🌸ᩧ͜   ݁.ꉹ᷐፝֟ꉹ *Bot*: Asuna Yuuki Bot
- ෨᷐፝֟ - 🌸ᩧ͜   ݁.ꉹ᷐፝֟ꉹ *Modo:* publico
- ෨᷐፝֟ - 🌸ᩧ͜   ݁.ꉹ᷐፝֟ꉹ *Tiempo Activo*:%muptime
- ෨᷐፝֟ - 🌸ᩧ͜   ݁.ꉹ᷐፝֟ꉹ *Usuarios*:%totalreg
- ෨᷐፝֟ - 🌸ᩧ͜   ݁.ꉹ᷐፝֟ꉹ *Corazones*:%corazones
- ෨᷐፝֟ - 🌸ᩧ͜   ݁.ꉹ᷐፝֟ꉹ *Nivel*:%level

*✧━─━─✰──✧ - ✧──✰─━─━✧*
`.trimStart(),
header: '╔═══════⩽🌸ᩥ⩾═══════╗\n║               %category\n╠═══════⩽🌸ᩥ⩾═══════╝\n║╭──────────────┄',
body: '║│* ◌⃘۪֗ㅤ ⃝ܶ🌸᪶ %cmd %isdiamond %isPremium',
footer: '║╰──────────────┄\n╚═══════⩽🌸ᩥ⩾═══════╝\n\n',
after: ``
}
let ppp = 'https://qu.ax/zklR.jpg'
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, corazones, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        corazones: plugin.corazones,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '◜🪙◞' : '')
                .replace(/%isPremium/g, menu.premium ? '◜🎫◞' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
botofc: (conn.user.jid == global.conn.user.jid ? '🚩 𝙴𝚂𝚃𝙴 𝙴𝚂 𝙴𝙻 𝙱𝙾𝚃 𝙾𝙵𝙲' : `🚩 𝚂𝚄𝙱-𝙱𝙾𝚃 𝙳𝙴: Wa.me/${global.conn.user.jid.split`@`[0]}`), 
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
greeting, level, corazones, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg')

  let category = "video"
  const db = './media/database/db.json'
  const db_ = JSON.parse(fs.readFileSync(db))
  const random = Math.floor(Math.random() * db_.links[category].length)
  const rlink = db_.links[category][random]
  global.vid = rlink
  const response = await fetch(vid)
  const gif = await response.buffer()
 // const img = imagen1

await m.react('🤍') 
await conn.reply(m.chat, '*ꪹ͜𓂃͡𝗖𝗮𝗿𝗴𝗮𝗻𝗱𝗼 𝗘𝗹 𝗠𝗲𝗻𝘂 𝗗𝗲 𝗹𝗮 𝗕𝗼𝘁...𓏲੭*', fakegif3, { contextInfo:{ forwardingScore: 2022, isForwarded: true, externalAdReply: {title: packname, body: '♡《🌸 ¡𝑨𝒔𝒖𝒏𝒂 𝒀𝒖𝒖𝒌𝒊, 𝒍𝒂 𝒃𝒐𝒕 𝒎𝒂𝒔 𝒆𝒍𝒆𝒈𝒂𝒏𝒕𝒆! ✨》♡', sourceUrl: canal, thumbnail: icons }}})

// await conn.reply(m.chat, '🍟 Enviando el menú.....', m, rcanal)

await conn.sendFile(m.chat, ppp, 'menu.jpg', text.trim(), fakegif3, null, fake)

  } catch (e) {
    conn.reply(m.chat, '🔵 Lo sentimos, el menú tiene un error', m, rcanal, )
    throw e
  }
}
handler.help = ['menucompleto']
handler.tags = ['main']
handler.command = ['menucompleto', 'allmenú', 'allmenu'] 
handler.register = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐧𝐨𝐜𝐡𝐞𝐬 🌙'; break;
  case 1: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐧𝐨𝐜𝐡𝐞𝐬 💤'; break;
  case 2: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐧𝐨𝐜𝐡𝐞𝐬 🦉'; break;
  case 3: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐝𝐢𝐚𝐬 ✨'; break;
  case 4: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐝𝐢𝐚𝐬 💫'; break;
  case 5: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐝𝐢𝐚𝐬 🌅'; break;
  case 6: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐝𝐢𝐚𝐬 🌄'; break;
  case 7: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐝𝐢𝐚𝐬 🌅'; break;
  case 8: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐝𝐢𝐚𝐬 💫'; break;
  case 9: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐝𝐢𝐚𝐬 ✨'; break;
  case 10: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐝𝐢𝐚𝐬 🌞'; break;
  case 11: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐝𝐢𝐚𝐬 🌨'; break;
  case 12: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐝𝐢𝐚𝐬 ❄'; break;
  case 13: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐝𝐢𝐚𝐬 🌤'; break;
  case 14: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐭𝐚𝐫𝐝𝐞𝐬 🌇'; break;
  case 15: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐭𝐚𝐫𝐝𝐞𝐬 🥀'; break;
  case 16: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐭𝐚𝐫𝐝𝐞𝐬 🌹'; break;
  case 17: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐭𝐚𝐫𝐝𝐞𝐬 🌆'; break;
  case 18: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐧𝐨𝐜𝐡𝐞𝐬 🌙'; break;
  case 19: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐧𝐨𝐜𝐡𝐞𝐬 🌃'; break;
  case 20: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐧𝐨𝐜𝐡𝐞𝐬 🌌'; break;
  case 21: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐧𝐨𝐜𝐡𝐞𝐬 🌃'; break;
  case 22: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐧𝐨𝐜𝐡𝐞𝐬 🌙'; break;
  case 23: hour = '𝐁𝐮𝐞𝐧𝐚𝐬 𝐧𝐨𝐜𝐡𝐞𝐬 🌃'; break;
}
  var greeting = hour;
