const { generateWAMessageFromContent, prepareWAMessageMedia,  proto, generateWAMessageContent  } = (await import("@whiskeysockets/baileys")).default
let handler = async (m, { conn, args, text, usedPrefix, command }) => {

  if (!text) return m.reply(`Ejemplo: ${prefix + command} Cat`);
  // Comprueba si la versión está entre 1 y 7.
  const versionRegex = /^v[1-7]$/;
  if (args[0] && versionRegex.test(args[0])) {
    let cap = `@KenisawaDev`;
    let imgg;

    switch (args[0]) {
      case 'v1':
        imgg = `https://aemt.me/ai/text2img?text=${text}`;
        break;
      case 'v2':
        imgg = `https://aemt.me/v1/text2img?text=${text}`;
        break;
      case 'v3':
        imgg = `https://aemt.me/v2/text2img?text=${text}`;
        break;
      case 'v4':
        imgg = `https://aemt.me/v3/text2img?text=${text}`;
        break;
      case 'v5':
        imgg = `https://aemt.me/v4/text2img?text=${text}`;
        break;
      case 'v6':
        imgg = `https://aemt.me/v5/text2img?text=${text}`;
        break;
      case 'v7':
        imgg = `https://aemt.me/v6/text2img?text=${text}`;
        break;
    }

    rioo.sendMessage(from, { image: { url: imgg }, caption: cap }, { quoted: m });
    return;
  }

  let sections = [
    {
      title: 'Text To Image',
      rows: [
        { title: 'Version 1', description: `Text To Image Version 1`, id: `${usedPrefix}text2img v1 ${text}` },
        { title: 'Version 2', description: `Text To Image Version 2`, id: `${usedPrefix}text2img v2 ${text}` },
        { title: 'Version 3', description: `Text To Image Version 3`, id: `${usedPrefix}text2img v3 ${text}` },
        { title: 'Version 4', description: `Text To Image Version 4`, id: `${usedPrefix}text2img v4 ${text}` },
        { title: 'Version 5', description: `Text To Image Version 5`, id: `${usedPrefix}text2img v5 ${text}` },
        { title: 'Version 6', description: `Text To Image Version 6`, id: `${usedPrefix}text2img v6 ${text}` },
        { title: 'Version 7', description: `Text To Image Version 7`, id: `${usedPrefix}text2img v7 ${text}` },
      ]
    }
  ];

  let listMessage = {
    title: 'Lista',
    sections
  };

  let msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `Por favor seleccione *opción* a continuación`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'KenisawaDev'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: ``,
            gifPlayback: true,
            subtitle: 'KenisawaDev',
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(listMessage)
              }
            ],
          }),
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
/*            forwardedNewsletterMessageInfo: {
              newsletterName: '-',
              newsletterJid: '-@newsletter',
              serverMessageId: -
            }*/
          }
        })
      }
    }
  }, {});

  await conn.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id
  });
}
handler.help = ['text2img <txt>'];
handler.tags = ['ia'];
handler.command = ["text2img"];

export default handler;