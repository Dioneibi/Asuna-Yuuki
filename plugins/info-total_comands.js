import fs from 'fs'
let handler = async (m, { conn, args, command }) => {
let fitur = Object.values(plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length;
 await conn.sendMessage(m.chat, { image: icons}, caption: `Funciones totales del bot actual ${totalf} Funciones` }, m  )
}
handler.help = ['totalfunc']
handler.tags = ['info']
handler.command = /^(totalfunc)$/i;
export default handler