let handler = async (
	m,
	{ conn, usedPrefix, command, args, isOwner, isAdmin, isROwner },
) => {
	let chat = global.db.data.chats[m.chat];

	if (args[0] === "on") {
		if (chat.antiBot) {
			return m.reply("**ANTI BOT**\n_Este comando fue activado con éxito!_");
		} else {
			chat.antiBot = true;
			return m.reply("**ANTI BOT**\n_El comando ya fue activado anteriormente!_");
		}
	} else if (args[0] === "off") {
		if (!chat.antiBot) {
			return m.reply("**ANTI BOT**\n_El comando se desactivó con éxito!_");
		} else {
			chat.antiBot = false;
			return m.reply("**ANTI BOT**\n_El comando ya fue desactivado anteriormente!_");
		}
	} else {
		return m.reply(`Ejemplo: ${usedPrefix}antibot <on/off>`);
	}
};

handler.help = ["antibot *enable/off*"];
handler.tags = ["group"];
handler.group = true;
handler.command = ["antibot"];

export default handler;