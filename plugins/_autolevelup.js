let levelling = require('../lib/levelling')
module.exports = {
	before(m) {
		let user = global.db.data.users[m.sender]
		if (!user.autolevelup) return !0
		let before = user.level * 1
		while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++

		if (before !== user.level) {
			m.reply(`
تبریک میگم، لول شما ارتقا یافت!
*${before}* >> *${user.level}*
برای مشاهده از *profile.* استفاده کنید
	`.trim())
		}
	}
}
