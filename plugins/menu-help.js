import ws from 'ws';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    let uniqueUsers = new Map();

    global.conns.forEach((conn) => {
        if (conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED) {
            uniqueUsers.set(conn.user.jid, conn);
        }
    });

    let users = [...uniqueUsers.values()];
    let totalUsers = users.length;

    let totalusr = Object.keys(global.db.data.users).length;
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let username = conn.getName(m.sender);
    let locale = 'es';
    let d = new Date(new Date + 3600000);
    let time = d.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    let sbot =
        conn.user.jid == global.conn.user.jid
        ? "`ʙᴏᴛ ::` Principal"
        : "`ʙᴏᴛ ::` Sub - Bot de" + `  Wa.me/${global.conn.user.jid.split`@`[0]}`;

    global.fcontact = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            remoteJid: "status@broadcast",
        },
        message: {
            contactMessage: {
                displayName: ``,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${username}\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
            },
        },
    };

    let totalreg = Object.keys(global.db.data.users).length;
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;

    m.react("🛍️");
    let menu = ``;

    let txt = ""
    txt += '`ᴄʀᴇᴀᴅᴏʀ ::`' + ` Jose Xrl\n`;
    txt += '`ʙᴏᴛ ::`' + ` Asuna Yuuki\n`;
    txt += '`ꜰᴇᴄʜᴀ ::`' + ` ${fecha}\n`;
    txt += '`ᴠᴇʀꜱɪᴏɴ ::`' + ` ${vs}\n`;
    txt += `${sbot}\n`;
    txt += '`ᴘʀᴇꜰɪᴊᴏ ::`' + ` [  ${usedPrefix}  ]\n`;
    txt += '`ᴜꜱᴜᴀʀɪᴏꜱ ::`' + ` ${totalusr}\n`;
    txt += '`ᴠᴇʀɪꜰɪᴄᴀᴅᴏꜱ ::`' + ` ${rtotalreg}\n`;
    txt += '`ᴀᴄᴛɪᴠᴏ ::`' + ` ${uptime}\n`;
    txt += '`ᴄᴏɴᴛᴀᴄᴛᴏ ::` #owner\n\n';
    txt += "> Powered by Jose Xrl y Dioneibi";

    let listSections = [];

        listSections.push({
        title: `🔖 SELECCIÓNA LO QUE NECESITES`, highlight_label: `Popular Asuna Yuuki`,
        rows: [
            {
                header: "𝗔𝗨𝗧𝗢 𝗩𝗘𝗥𝗜𝗙𝗜𝗖𝗔𝗥 ✅",
                title: "",
                description: `Verificacion Automáticamente`,
                id: `.reg AsunaYuuki.18`,
            },
            {
                header: "𝗠𝗘𝗡𝗨 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗢 🤍",
                title: "",
                description: `MENU COMPLETO`,
                id: `.allmenu`,
            },
            {
                header: "𝗠𝗘𝗡𝗨 𝗔𝗨𝗗𝗜𝗢𝗦 🔊",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘦𝘭 𝘮𝘦𝘯𝘶 𝘥𝘦 𝘢𝘶𝘥𝘪𝘰𝘴`,
                id: `${usedPrefix}menuaudios`,
            },
            {
                header: "𝗠𝗘𝗡𝗨 𝗡𝗦𝗙𝗪 🔞",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘦𝘭 𝘮𝘦𝘯𝘶 𝘤𝘢𝘭𝘪𝘦𝘯𝘵𝘦`,
                id: `${usedPrefix}labiblia`,
            },
            {
                header: "𝗠𝗘𝗡𝗨 𝗝𝗨𝗘𝗚𝗢𝗦 🎮",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘦𝘭 𝘮𝘦𝘯𝘶 𝘥𝘦 𝘫𝘶𝘦𝘨𝘰𝘴`,
                id: `${usedPrefix}gamemenu`,
            },
            {
                header: "𝗠𝗘𝗡𝗨 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦 📥",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘦𝘭 𝘮𝘦𝘯𝘶 𝘥𝘦 𝘥𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘴`,
                id: `${usedPrefix}menudl`,
            },
            {
                header: "𝗠𝗘𝗡𝗨 𝗔𝗜 🤖",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘦𝘭 𝘮𝘦𝘯𝘶 𝘥𝘦 𝘐𝘈-𝘉𝘰𝘵`,
                id: `${usedPrefix}menuai`,
            },
            {
                header: "𝗥𝗘𝗗𝗘𝗦 𝗔𝗦𝗨𝗡𝗔 𝗬𝗨𝗨𝗞𝗜 🌸",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘭𝘢𝘴 𝘳𝘦𝘥𝘦𝘴 𝘥𝘦𝘭 𝘣𝘰𝘵`,
                id: `${usedPrefix}redes`,
            },
            {
                header: "𝗚𝗥𝗨𝗣𝗢𝗦 ☁️",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘭𝘰𝘴 𝘨𝘳𝘶𝘱𝘰𝘴 𝘥𝘦𝘭 𝘣𝘰𝘵`,
                id: `${usedPrefix}grupos`,
            },
{
                header: "𝗩𝗘𝗟𝗢𝗖𝗜𝗗𝗔𝗗 𝗕𝗢𝗧 ⚡",
                title: "",
                description: `𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘭𝘢 𝘷𝘦𝘭𝘰𝘤𝘪𝘥𝘢𝘥 𝘥𝘦𝘭 𝘣𝘰𝘵`,
                id: `${usedPrefix}ping`,
            },
{
                header: "𝗣𝗟𝗔𝗬🎵",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘮𝘶𝘴𝘪𝘤𝘢𝘴 𝘦𝘫𝘦𝘮𝘱𝘭𝘰 .𝘱𝘭𝘢𝘺 𝘣𝘢𝘥 𝘣𝘶𝘯𝘯𝘺`,
                id: `${usedPrefix}play`,
            },
{
                header: "𝗬𝗧𝗦𝗘𝗔𝗥𝗖𝗛 🔍",
                title: "",
                description: `𝘉𝘶𝘴𝘤𝘢 𝘦𝘯 𝘺𝘰𝘶𝘵𝘶𝘣𝘦 𝘦𝘫𝘦𝘮𝘱𝘭𝘰 .𝘺𝘵𝘴 𝘣𝘢𝘥 𝘣𝘶𝘯𝘯𝘺`,
                id: `${usedPrefix}yts`,
            },
{
                header: "𝗕𝗨𝗦𝗖𝗔 𝗘𝗡 𝗚𝗢𝗢𝗚𝗟𝗘 🔍",
                title: "",
                description: `𝘉𝘶𝘴𝘤𝘢 𝘭𝘰 𝘲𝘶𝘦 𝘴𝘦𝘢 𝘥𝘦 𝘨𝘰𝘰𝘨𝘭𝘦 𝘦𝘫𝘦𝘮𝘱𝘭𝘰 .𝘨𝘰𝘰𝘨𝘭𝘦 𝘈𝘴𝘶𝘯𝘢 𝘺𝘶𝘶𝘬𝘪`,
                id: `${usedPrefix}google`,
            },
{
                header: "𝗕𝗨𝗦𝗖𝗔𝗗𝗢𝗥 𝗠𝗘𝗥𝗖𝗔𝗗𝗢𝗟𝗜𝗕𝗥𝗘 🔍",
                title: "",
                description: `𝘉𝘶𝘴𝘤𝘢 𝘭𝘰 𝘲𝘶𝘦 𝘲𝘶𝘪𝘦𝘳𝘢𝘴 𝘥𝘦 𝘮𝘦𝘳𝘤𝘢𝘥𝘰 𝘭𝘪𝘣𝘳𝘦`,
                id: `${usedPrefix}mercadolibre`,
            },
{
                header: "𝗕𝗨𝗦𝗖𝗔𝗗𝗢𝗥 𝗚𝗜𝗧𝗛𝗨𝗕 🔍",
                title: "",
                description: `𝘉𝘶𝘴𝘤𝘢 𝘭𝘰 𝘲𝘶𝘦 𝘲𝘶𝘪𝘦𝘳𝘢𝘴 𝘥𝘦 𝘎𝘪𝘵𝘩𝘶𝘣 𝘦𝘫𝘦𝘮𝘱𝘭𝘰 .𝘨𝘪𝘵𝘩𝘶𝘣𝘴𝘦𝘢𝘳𝘤𝘩 𝘈𝘴𝘶𝘯𝘢-𝘠𝘶𝘶𝘬𝘪`,
                id: `${usedPrefix}githubsearch`,
            },
{
                header: "𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 💥",
                title: "",
                description: `𝘋𝘦𝘤𝘢𝘳𝘨𝘢 𝘭𝘰 𝘲𝘶𝘦 𝘴𝘦𝘢 𝘥𝘦 𝘍𝘢𝘤𝘦𝘣𝘰𝘰𝘬 𝘌𝘫𝘦𝘮𝘱𝘭𝘰 .𝘍𝘢𝘤𝘦𝘣𝘰𝘰𝘬 (𝘓𝘪𝘯𝘬)`,
                id: `${usedPrefix}facebook`,
            },
{
                header: "𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠 🌹",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘓𝘰 𝘲𝘶𝘦 𝘴𝘦𝘢 𝘥𝘦 𝘪𝘯𝘴𝘵𝘢𝘨𝘳𝘢𝘮`,
                id: `${usedPrefix}ig`,
                
                header: "𝗜𝗠𝗔𝗚𝗘𝗡 🖼️",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘐𝘮𝘢𝘨𝘦𝘯𝘦𝘴`,
                id: `${usedPrefix}imagen`,
            },
{
                header: "𝗠𝗢𝗗𝗟𝗔𝗦𝗧𝗘𝗦𝗧 🎎",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘈𝘱𝘬 𝘥𝘦 𝘮𝘰𝘥𝘭𝘢𝘴𝘵𝘦𝘴𝘵`,
                id: `${usedPrefix}dllastest`,
            },
{
                header: "𝗟𝗜𝗞𝗘𝗘 🎀",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘭𝘰 𝘲𝘶𝘦 𝘴𝘦𝘢 𝘥𝘦 𝘓𝘪𝘬𝘦𝘦`,
                id: `${usedPrefix}likeedl`,
            },
{
                header: "𝗠𝗘𝗗𝗜𝗔𝗙𝗜𝗥𝗘 📁",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘭𝘰 𝘲𝘶𝘦 𝘴𝘦𝘢 𝘥𝘦 𝘮𝘦𝘥𝘪𝘢𝘧𝘪𝘳𝘦`,
                id: `${usedPrefix}mediafire`,
            },
{
                header: "𝗠𝗢𝗗𝗔𝗣𝗞 🛍️",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘛𝘶 𝘢𝘱𝘬`,
                id: `${usedPrefix}modapk`,
            },
{
                header: "𝗦𝗡𝗔𝗖𝗞𝗩𝗜𝗗𝗘𝗢 🎥",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘵𝘶 𝘴𝘯𝘢𝘤𝘬𝘷𝘪𝘥𝘦𝘰 𝘫𝘫`,
                id: `${usedPrefix}snackvideo`,
            },
{
                header: "𝗧𝗜𝗞𝗧𝗢𝗞 ❤️",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘛𝘪𝘬𝘵𝘰𝘬`,
                id: `${usedPrefix}tiktok`,
            },
{
                header: "𝗧𝗜𝗞𝗧𝗢𝗞2 💗",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘵𝘪𝘬𝘵𝘰𝘬 𝘦𝘯 𝘤𝘢𝘭𝘪𝘥𝘢𝘥 𝘯𝘰𝘳𝘮𝘢𝘭 𝘺 𝘏𝘋`,
                id: `${usedPrefix}tiktok2`,
            },
{
                header: "𝗧𝗜𝗞𝗧𝗢𝗞 𝗜𝗠𝗔𝗚𝗘𝗡🖼️",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘵𝘪𝘬𝘵𝘰𝘬`,
                id: `${usedPrefix}tiktokimg`,
            },
{
                header: "𝗧𝗜𝗞𝗧𝗢𝗞 𝗠𝗣3 🎵",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘭𝘰 𝘲𝘶𝘦 𝘴𝘦𝘢 𝘥𝘦 𝘵𝘪𝘬𝘵𝘰𝘬 𝘦𝘯 𝘔𝘱3`,
                id: `${usedPrefix}tiktokmp3`,
            },
{
                header: "𝗧𝗪𝗜𝗧𝗧𝗘𝗥 ⭐",
                title: "",
                description: `𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘭𝘰 𝘲𝘶𝘦 𝘴𝘦𝘢 𝘥𝘦 𝘛𝘸𝘪𝘵𝘵𝘦𝘳`,
                id: `${usedPrefix}twitter`,
            },
{
                header: "𝗦𝗖𝗥𝗜𝗣𝗧 ❤️",
                title: "",
                description: `𝘚𝘤𝘳𝘪𝘱𝘵 𝘥𝘦 𝘈𝘴𝘶𝘯𝘢 𝘠𝘶𝘶𝘬𝘪`,
                id: `${usedPrefix}sc`,
            },
{
                header: "𝗦𝗧𝗜𝗖𝗞𝗘𝗥 🥴",
                title: "",
                description: `𝘊𝘳𝘦𝘢 𝘚𝘵𝘪𝘤𝘬𝘦𝘳𝘴`,
                id: `${usedPrefix}s`,
            },
{
                header: "𝗦𝗘𝗥𝗕𝗢𝗧 🤖",
                title: "",
                description: `𝘚𝘦 𝘴𝘶𝘣𝘣𝘰𝘵 𝘥𝘦 𝘈𝘴𝘶𝘯𝘢 𝘠𝘶𝘶𝘬𝘪`,
            },
{
                header: "𝗦𝗘𝗔𝗥𝗖𝗛 𝗣𝗜𝗡𝗧𝗘𝗥𝗘𝗦𝗧 🔍",
                title: "",
                description: `𝘉𝘶𝘴𝘲𝘶𝘦𝘥𝘢 𝘱𝘪𝘯𝘵𝘦𝘳𝘦𝘴𝘵`,
                id: `${usedPrefix}pinterest`,
            },
{
                header: "𝗦𝗘𝗔𝗥𝗖𝗛 𝗣𝗜𝗫𝗜𝗩𝗗𝗟🔍",
                title: "",
                description: `𝘉𝘶𝘴𝘲𝘶𝘦𝘥𝘢 𝘗𝘪𝘹𝘪𝘷`,
                id: `${usedPrefix}pixivdl`,
            },
{
                header: "𝗦𝗘𝗔𝗥𝗖𝗛 𝗣𝗢𝗥𝗡𝗢𝗛𝗨𝗕 🔍",
                title: "",
                description: `𝘉𝘶𝘴𝘲𝘶𝘦𝘥𝘢 𝘦𝘯 𝘱𝘰𝘳𝘯𝘰𝘩𝘶𝘣`,
                id: `${usedPrefix}pornohubsearch`,
            },
{
                header: "𝗦𝗘𝗔𝗥𝗖𝗛 𝗦𝗣𝗢𝗧𝗜𝗙𝗬 🔍",
                title: "",
                description: `𝘉𝘶𝘴𝘤𝘢 𝘵𝘶 𝘊𝘢𝘯𝘤𝘪𝘰́𝘯 𝘥𝘦 𝘴𝘱𝘰𝘵𝘪𝘧𝘺`,
                id: `${usedPrefix}spotify`,
            },
{
                header: "𝗦𝗘𝗔𝗥𝗖𝗛 𝗧𝗜𝗞𝗧𝗢𝗞🔍",
                title: "",
                description: `𝘉𝘶𝘴𝘲𝘶𝘦𝘥𝘢 𝘦𝘯 𝘵𝘪𝘬𝘵𝘰𝘬`,
                id: `${usedPrefix}tiktoksearch`,
            },
{
                header: "𝗦𝗘𝗔𝗥𝗖𝗛 𝗧𝗪𝗘𝗘𝗗 🔍",
                title: "",
                description: `𝘉𝘶𝘴𝘲𝘶𝘦𝘥𝘢 𝘦𝘯 𝘵𝘸𝘦𝘦𝘥`,
                id: `${usedPrefix}twittersearch`,
            },
{
                header: "𝗦𝗘𝗔𝗥𝗖𝗛 𝗫𝗡𝗫𝗫 🔍",
                title: "",
                description: `𝘉𝘶𝘴𝘲𝘶𝘦𝘥𝘢 𝘦𝘯 𝘟𝘯𝘹𝘹`,
                id: `${usedPrefix}xnxxsearch`,
            },
{
                header: "𝗜𝗡𝗙𝗢 𝗕𝗢𝗧 🤖",
                title: "",
                description: `𝘌𝘯𝘷𝘪𝘢 𝘓𝘢 𝘪𝘯𝘧𝘰 𝘥𝘦 𝘭𝘢 𝘣𝘰𝘵`,
                id: `${usedPrefix}infobot`,
            },
{
                header: "𝗘𝗡𝗔𝗕𝗟𝗘 😁",
                title: "",
                description: `𝘈𝘤𝘵𝘪𝘷𝘢 𝘤𝘢𝘭𝘲𝘶𝘪𝘦𝘳 𝘧𝘶𝘯𝘤𝘪𝘰́𝘯 𝘥𝘦 𝘈𝘴𝘶𝘯𝘢 𝘠𝘶𝘶𝘬𝘪`,
                id: `${usedPrefix}enable`,
            },
        ],
    });

    let vid = "https://qu.ax/xvXl.jpg";
    let img = "https://qu.ax/zUUy.jpeg'";
    let img2 = "https://qu.ax/KJrp.jpeg";
    let img3 = "https://qu.ax/wtVo.jpeg";
    let img4 = "https://qu.ax/DYsL.jpeg'";

    await conn.sendListB(m.chat, menu, txt, `🌸ᛜॕ༹Mᴇɴᴜ Lɪsᴛ🌸ᛜॕ༹`, [vid, img, img2, img3, img4].getRandom(), listSections, estilo);
};

handler.command = ["menu", "help", "menú"];

export default handler;


function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}


  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 1: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 💤'; break;
  case 2: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🦉'; break;
  case 3: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 4: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 5: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 6: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌄'; break;
  case 7: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌅'; break;
  case 8: hour = 'Bᴜᴇɴᴏs Dɪᴀs 💫'; break;
  case 9: hour = 'Bᴜᴇɴᴏs Dɪᴀs ✨'; break;
  case 10: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌞'; break;
  case 11: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌨'; break;
  case 12: hour = 'Bᴜᴇɴᴏs Dɪᴀs ❄'; break;
  case 13: hour = 'Bᴜᴇɴᴏs Dɪᴀs 🌤'; break;
  case 14: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌇'; break;
  case 15: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🥀'; break;
  case 16: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌹'; break;
  case 17: hour = 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌆'; break;
  case 18: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 19: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 20: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌌'; break;
  case 21: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
  case 22: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'; break;
  case 23: hour = 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'; break;
}
  var greeting = hour;