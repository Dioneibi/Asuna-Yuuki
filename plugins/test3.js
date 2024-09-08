import { ttdl } from 'ruhend-scraper';//modulo exportado para crear la variable 'ttdl'

let handler = async (m, { conn, args, usedPrefix, command }) => {//variables del handler usadas 
 if (!args || !args[0]) return conn.reply(m.chat, '*`INGRESA EL LINK DE TIKTOK`*', m, fake, )//vuelve si no tiene un link
 if (!args[0].match(/tiktok/gi)) return conn.reply(m.chat, `Verifica que el link sea de TikTok`, m, fake).then(_ => m.react('✖️'))//verificar si el link es valido
    try {
await m.react('🕓');//reacción al recibir el comando
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
        } = await ttdl(args[0]);//variables del resultado de 'ttdl'
       
let txt = '';
txt += `> 🤍 *\`» Título :\`* ${title || '❌'}\n`;
txt += `> 🤍 *\`» Autor :\`* ${author || '❌'}\n`;
txt += `> 🤍 *\`» Duracion :\`* ${duration || '❌'}\n`;
txt += `> 🤍 *\`» Visitas :\`* ${views || '❌'}\n`;
txt += `> 🤍 *\`» Likes :\`* ${like || '❌'}\n`; 
txt += `> 🤍 *\`» Comentarios :\`* ${comment || '❌'}\n`;
txt += `> 🤍 *\`» Share :\`* ${share || '❌'}\n`;
txt += `> 🤍 *\`» Publicado :\`* ${published || '❌'}\n`;

//video
        await conn.sendFile(m.chat, video, 'tiktok.mp4', txt, m);
//audio
        await conn.sendMessage(m.chat, { audio: { url: music }, mimetype: "audio/mp4", fileName: title + '.mp3' }, { quoted: m })
        await m.react('✅');//reacción al completar el proceso con éxito 
    } catch (e) {//salir si hay un error
        await m.react('❌');//reacción al fallar con el proceso 
        console.log(e)//mostrar el error en la consola
    }
};

handler.help = ['tiktok *<link>*']//exportar nombre de comando al menu
handler.corazones = 3 //limites/corazones necesarios para usar el comandos
handler.tags = ['dl']//menciones para agrupar el comando
handler.command = /^(tiktok4)$/i;//variables de comando

export default handler;//exportación ESM