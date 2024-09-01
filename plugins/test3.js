import { ttdl } from '@ruhend/scraper';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg'; // Asegúrate de instalar fluent-ffmpeg

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args || !args[0]) return conn.reply(m.chat, '*`Ingresa un enlace de tiktok`*', m);

    try {
        await m.react('🕓');
        let { title, author, username, published, like, comment, share, views, bookmark, video, cover, duration, music, profilePicture } = await ttdl(args[0]);

        let txt = '';
        txt += `> _Título_ : *${title || '❌'}*\n`;
        txt += `> _Autor_ : *${author || '❌'}*\n`;
        txt += `> _Duración_ : *${duration || '❌'}*\n`;
        txt += `> _Vistas_ : *${views || '❌'}*\n`;
        txt += `> _Likes_ : *${like || '❌'}*\n`;
        txt += `> _Comentarios_ : *${comment || '❌'}*\n`;
        txt += `> _Compartidos_ : *${share || '❌'}*\n`;
        txt += `> _Publicado_ : *${published || '❌'}*\n`;

        // Descargar el video
        let videoPath = path.join(__dirname, 'tiktok.mp4');
        await conn.downloadFile(video, videoPath);

        // Convertir el video a MP3
        let mp3Path = path.join(__dirname, 'tiktok.mp3');
        await new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .toFormat('mp3')
                .on('end', () => {
                    fs.unlinkSync(videoPath); // Elimina el video después de la conversión
                    resolve();
                })
                .on('error', reject)
                .save(mp3Path);
        });

        // Enviar el archivo MP3
        await conn.sendFile(m.chat, mp3Path, 'tiktok.mp3', txt, m);
        await m.react('✅');
        
        // Eliminar el archivo MP3 después de enviarlo
        fs.unlinkSync(mp3Path);
    } catch {
        await m.react('❌');
    }
};

handler.help = ['tiktok2 *<link>*'];
handler.tags = ['dl'];
handler.command = ['tiktok2', 'tt'];

export default handler;
