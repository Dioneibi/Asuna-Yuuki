import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import {youtubedl, youtubedlv2} from '@bochilteam/scraper';
const handler = async (m, {conn, command, args, text, usedPrefix}) => {
if (!text) throw `_Esᴄʀɪʙᴇ ᴜɴᴀ ᴘᴇᴛɪᴄɪᴏ́ɴ ʟᴜᴇɢᴏ ᴅᴇʟ ᴄᴏᴍᴀɴᴅᴏ, ᴇᴊᴇᴍᴘʟᴏ 🛍️ :_ \n*${usedPrefix + command} Billie Eilish - Bellyache*`
try { 
const yt_play = await search(args.join(' '))
const texto1 = `
*╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰*
┟─⬪ꕤ 🌸꤬ᩙ:໑ٜ࣪𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦໑ ꕤ 🌸꤬ᩙ:⬪╮
┟─⬪🛍️⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪𝗔𝗦𝗨𝗡𝗔 𝗬𝗨𝗨𝗞𝗜໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪╯
│
├ ꕤ 🌸꤬ᩙ:. _*𝘛𝘪𝘵𝘶𝘭𝘰*_
├» ${yt_play[0].title}
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┄
├ ꕤ 🌸꤬ᩙ:. _*𝘱𝘶𝘣𝘭𝘪𝘤𝘢𝘥𝘰*_
├» ${yt_play[0].ago}
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌┈
├ ꕤ 🌸꤬ᩙ:. _*𝘋𝘶𝘳𝘢𝘤𝘪𝘰́𝘯*_
├» ${secondString(yt_play[0].duration.seconds)}
├╌╌╌╌╌╌╌╌╌╌╌╌┄
├ ꕤ 🌸꤬ᩙ:. _*🅅𝕚𝕤𝕥𝕒𝕤*_
├» ${MilesNumber(yt_play[0].views)}
├╌╌╌╌╌╌╌╌╌╌┄
├ ꕤ 🌸꤬ᩙ:. _*🄰𝕦𝕥𝕠𝕣(𝕒)*_
├» ${yt_play[0].author.name}
├╌╌╌╌╌╌╌╌┈
├ ꕤ 🌸꤬ᩙ:. _*🄴𝕟𝕝𝕒𝕔𝕖*_
├» ${yt_play[0].url}
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⊰*۪`.trim()

await conn.sendButton(m.chat, wm, texto1, yt_play[0].thumbnail, [['𝗠̷̸͢𝗘̷̸𝗡̷̸͢𝗨̷̸࠷𝗬̷̸𝗨̷̸͢𝗨̷̸𝗞̷̸͢𝗜̷̸ࠬ🧇̷̸̻ํ', `${usedPrefix}menu`],['🌸 𝗔 𝗨 𝗗 𝗜 𝗢',`${usedPrefix}play5 ${yt_play[0].url}`],['🌸 𝗩 𝗜 𝗗 𝗘 𝗢',`${usedPrefix}play6 ${yt_play[0].url}`]], null, null, imagen1)
} catch (e) {
await conn.reply(m.chat, `*[ ! ] ʜᴜʙᴏ ᴜɴ ᴇʀʀᴏʀ ᴇɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ᴘᴏʀ ғᴀᴠᴏʀ ɪɴᴛᴇɴᴛᴀ ᴍᴀs ᴛᴀʀᴅᴇ..*`, fkontak, m, rcanal)
console.log(`❗❗ᴇʀʀᴏʀ ${usedPrefix + command} ❗❗`)
console.log(e)
handler.limit = 0
}}
handler.command = ['play', 'play2', 'play3', 'play4']
//handler.limit = 3
handler.register = true 
handler.group = true
export default handler;

async function search(query, options = {}) {
const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
return search.videos;
}

function MilesNumber(number) {
const exp = /(\d)(?=(\d{3})+(?!\d))/g;
const rep = '$1.';
const arr = number.toString().split('.');
arr[0] = arr[0].replace(exp, rep);
return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
seconds = Number(seconds);
const d = Math.floor(seconds / (3600 * 24));
const h = Math.floor((seconds % (3600 * 24)) / 3600);
const m = Math.floor((seconds % 3600) / 60);
const s = Math.floor(seconds % 60);
const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
return dDisplay + hDisplay + mDisplay + sDisplay;
}