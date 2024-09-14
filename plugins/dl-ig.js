import { igdl } from "ruhend-scraper";

let handler = async (m, { args, conn }) => { 
    if (!args[0]) {
        return conn.reply(m.chat, '*`INGRESA EL LINK DE INSTAGRAM`*', m, fake);
    }
    
    try {
        await m.react('🕑');
        
        let res = await igdl(args[0]);
        let data = res.data; 
        
        for (let media of data) {
            await new Promise(resolve => setTimeout(resolve, 2000));

            await m.react('✅');
            await conn.sendFile(m.chat, media.url, 'instagram.mp4', dev, null, m); 
        }
    } catch {
        await m.react('❌');
    }
}

handler.Dolares = 2
handler.command = ['ig', 'igdl', 'instagram'];
handler.tags = ['dl'];
handler.help = ['ig <link>'];

export default handler;
