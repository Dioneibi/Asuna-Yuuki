import { ttdl } from 'ruhend-scraper';

let handler = async (m, { conn, args, usedPrefix, command }) => {
 if (!args || !args[0]) return conn.reply(m.chat, '*`INGRESA EL LINK DE TIKTOK`*', m, fake, )
    try {
await m.react('🕓'); 
        let {
            title,
            author,
            username,
            published,
            like,
            comment,
            share,
            views,
            bookmark,
            video,
            cover,
            duration,
            music,
            profilePicture
        } = await ttdl(args[0]);

        let txt = '';
        txt += ``;

        await conn.sendFile(m.chat, video, 'tiktok.mp4', dev, m);
await conn.sendFile(m.chat, { audio: { url: music}, mimetype: "audio/mp4", fileName: title + '.mp3', quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${title}`,
body: `${author}`,
mediaType: 2, 
sourceUrl: `${url}`,
thumbnail: await (await fetch(profilePicture)).buffer()}}}, { quoted: m })
        await m.react('✅'); 
    } catch {
        await m.react('❌'); 
    }
};

handler.help = ['tiktok *<link>*']
handler.corazones = 3
handler.tags = ['dl'] 
handler.command = /^(tiktok4)$/i;

export default handler;