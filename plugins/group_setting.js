let { Presence, GroupSettingChange } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, args, usedPrefix, command }) => {
	let isClose = {
		'open': false,
		'close': true,
	}[(args[0] || '')]
	await conn.updatePresence(m.chat, Presence.composing)
	if (isClose === undefined)
		throw `
*Please select an option :*

  *○ ${usedPrefix + command} close*
  *○ ${usedPrefix + command} open*
`.trim()
	await conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, isClose)
}
handler.help = ['group *open / close*']
handler.tags = ['group']
handler.command = /^(group)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = true
handler.botAdmin = true
handler.fail = null
handler.exp = 0
module.exports = handler
