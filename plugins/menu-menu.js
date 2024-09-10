import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': '𝐈𝐍𝐅𝐎 𝐁𝐎𝐓',
  'buscador': '𝐁𝐔𝐒𝐐𝐔𝐄𝐃𝐀𝐒',
  'search': '𝐒𝐄𝐀𝐑𝐂𝐇',
  'game': '𝐃𝐈𝐕𝐄𝐑𝐒𝐈𝐎𝐍',
  'jadibot': '𝐒𝐔𝐁 𝐁𝐎𝐓𝐒',
  'rpg': '𝐑𝐏𝐆',
  'rg': '𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎',
  'xp': '𝐄𝐗𝐏',
  'sticker': '𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐒',
  'anime': '𝐀𝐍𝐈𝐌𝐄𝐒',
  'database': '𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄',
  'fix': '𝐅𝐈𝐗𝐌𝐒𝐆𝐄𝐒𝐏𝐄𝐑𝐀',
  'grupo': '𝐆𝐑𝐔𝐏𝐎𝐒',
  'nable': '𝐎𝐍 / 𝐎𝐅𝐅', 
  'dl': '𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒',
  'fun': '𝐇𝐄𝐑𝐑𝐀𝐌𝐈𝐄𝐍𝐓𝐀𝐒',
  'info': '𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎𝐍',
  'nsfw': '𝐍𝐒𝐅𝐖', 
  'owner': '𝐂𝐑𝐄𝐀𝐃𝐎𝐑',
  'mods': '𝐒𝐓𝐀𝐅𝐅',
  'audio': '𝐀𝐔𝐃𝐈𝐎𝐒', 
  'ai': '𝐀𝐈 𝐁𝐎𝐓',
  'convertir': '𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐈𝐃𝐎𝐑𝐄𝐒',
  'audios': '𝐀𝐔𝐃𝐈𝐎𝐒',
}

const defaultMenu = {
  before: `“𝐇𝐨𝐥𝐚 *%name* 𝐒𝐨𝐲 𝐀𝐳𝐮𝐧𝐚 𝐘𝐮𝐮𝐤𝐢 𝐁𝐨𝐭, %greeting"

✧ ▬▭▬▭▬ ✦✧✦ ▬▭▬▭▬ ✧ 

 '︶꒦꒷♡꒷꒦︶.
┊✶ 𝐂𝐥𝐢𝐞𝐧𝐭𝐞: %name
┊┊✶ 𝐁𝐨𝐭: Azuna Yuuki Bot
┊┊✶ 𝐌𝐨𝐝𝐨: Público
┊┊✶ 𝐓𝐢𝐞𝐦𝐩𝐨 𝐚𝐜𝐭: %muptime
┊┊✶ 𝐔𝐬𝐞𝐫𝐬: %totalreg
┊┊✶ 𝐂𝐨𝐫𝐚𝐳𝐨𝐧𝐞𝐬: %corazones
┊┊✶ 𝐍𝐢𝐯𝐞𝐥: %level 
. .‿̩͙‿̩̩̥͙̽‿̩͙‿̩͙‿̩̩̥͙̽‿̩͙‿̩͙‿̩̩̥͙̽‿̩͙‿̩͙‿̩̩̥͙̽‿̩͙┉ˏ͛ ༝̩̩̥͙　 ҉　

✦•····················•✦•···················•✦
`.trimStart(),
  header: '✞͙͙͙͙͙͙͙͙͙͙⏜❟︵ֹ̩̥̩̥̩̥̩̩̥⏜੭*•̩̩͙✩•̩̩͙*˚୧ֹ⏜︵ֹ̩̥̩̥̩̥̩̥̩̥̩̥❟⏜፞✞͙͙͙͙͙͙͙͙͙͙\n╠ • ˗ˏ✎*ೃ `%category`\n╠ ┈──✦﹀﹀|﹀﹀﹕₊˚ ✧. *. ⋆\n╠ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈',
  body: '║✶ %cmd %isdiamond %isPremium\n',
  footer: '╚════•.·:·.✧ ✦ ✧.·:·.*•════╝\n\n',
  after: ``,
}

let gifs = [
  'https://qu.ax/UVih.mp4',
  'https://qu.ax/qlrl.mp4',
  'https://qu.ax/ZifQ.mp4'
]

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
                .replace(/%isdiamond/g, menu.corazones ? '💎' : '')
                .replace(/%isPremium/g, menu.premium ? '🎟️' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let replace = {
      '%': '%',
      p: _p, uptime,
      muptime,
      me: conn.user.name,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      level, corazones, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = _text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join('|')})`, 'g'), (_, name) => '' + replace[name])
    let gif = gifs[Math.floor(Math.random() * gifs.length)]
    conn.sendFile(m.chat, gif, 'menu.mp4', text.trim(), m)
  } catch (e) {
    conn.reply(m.chat, 'Sorry, the menu is experiencing an error', m)
    throw e
  }
}

handler.help = ['menucompleto']
handler.tags = ['main']
handler.command = ['menucompleto', 'allmenú', 'allmenu'] 
handler.register = true

export default handler

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
