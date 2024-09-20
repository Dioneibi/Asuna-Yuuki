import yts from 'yt-search';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) {
        return conn.reply(m.chat, '*Qᴜᴇ Qᴜɪᴇʀᴇs Qᴜᴇ Bᴜsǫᴜᴇ 💗*', m);
    }

    await m.react('⏳');
    let res = await yts(text);
    let play = res.videos[0];

    if (!play) {
        throw `Error: Vídeo no encontrado`;
    }

    let { title, thumbnail, ago, timestamp, views, videoId, url } = play;

    let txt = '```𝗗𝗲𝘀𝗰𝗮𝗿𝗴𝗮𝘀 𝗬𝗧 🛍️```\n';
    txt += '『⿻᪵᪼⿻᪽᪳⿻᪽᪱⿻᪸᪴⿻᪶᪰「🌸᪵᪰」⿻᪽᪼⿻᪵᪼⿻᪽᪳⿻᪽᪱⿻᪸᪴』\n';
    txt += `⿻᪸᪴ *𝗧𝗶𝘁𝘂𝗹𝗼* ❀ᩘ͜🌸 _${title}_\n`;
    txt += `⿻᪸᪴ *𝗖𝗿𝗲𝗮𝗱𝗼* ❀ᩘ͜🌸 _${ago}_\n`;
    txt += `⿻᪸᪴ *𝗗𝘂𝗿𝗮𝗰𝗶𝗼́𝗻* ❀ᩘ͜🌸 _${timestamp}_\n`;
    txt += `⿻᪸᪴ *𝗩𝗶𝘀𝘁𝗮𝘀* ❀ᩘ͜🌸 _${views.toLocaleString()}_\n`;
    txt += `> *𝗟𝗶𝗻𝗸* ❀ᩘ͜🌸 _https://www.youtube.com/watch?v=${videoId}_\n`;
    txt += '『⿻᪵᪼⿻᪽᪳⿻᪽᪱⿻᪸᪴⿻᪶᪰「🌸᪵᪰」⿻᪽᪼⿻᪵᪼⿻᪽᪳⿻᪽᪱⿻᪸᪴』\n';
    txt += 'Pᴏᴡᴇʀᴇᴅ Bʏ Dɪᴏɴᴇʏʙɪ ʏ Jᴏsᴇ Xrl;

    await conn.sendButton2(m.chat, txt, '. ', thumbnail, [
        ['MP3', `${usedPrefix}ytmp3 ${url}`],
        ['MP3DOC', `${usedPrefix}ytmp3doc ${url}`],
        ['MP4', `${usedPrefix}ytmp4 ${url}`], 
        ['MP4DOC', `${usedPrefix}ytmp4doc ${url}`]
        ], null, [['Canal', 'https://whatsapp.com/channel/0029Vah2mhq6BIEZRroXx737']], m);

    await m.react('✅');
};

//handler.help = ['play'];
handler.tags = ['downloader'] 
handler.command = ['play',];

export default handler;
