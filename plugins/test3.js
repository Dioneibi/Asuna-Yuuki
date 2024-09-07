let handler = async (m, { conn,setReply }) => {
  if (!m.quoted) throw "responde a un mensaje de canal";
  try {
    let id = (await m.getQuotedObj()).msg.contextInfo.forwardedNewsletterMessageInfo
      ;
    let teks = "Nombre:" + " `" + `${id.newsletterName}` + "`\n";
    teks += "Id:" + " `" + `${id.newsletterJid}` + "`";
    await conn.reply(m.chat, teks.trim(), m);
  } catch (e) {
    console.log(e);
    throw "Solo debe ser un chat de canal";
  }
};
handler.help = handler.command = ["ci"];
handler.tags = ["main"];
export default handler;