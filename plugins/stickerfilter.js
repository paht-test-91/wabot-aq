//made by Anshul
const uploadImage = require('../lib/uploadImage')
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')
const effects = ['greyscale', 'invert', 'brightness', 'threshold', 'sepia', 'red', 'green', 'blue', 'blurple', 'pixelate', 'blur']

let handler = async (m, { conn, usedPrefix, text }) => {
  let effect = text.trim().toLowerCase()
  if (!effects.includes(effect)) throw `
*Usage:* ${usedPrefix}stickerfilter <effectname>
*Example:* ${usedPrefix}stickerfilter invert

*Effects list:*
${effects.map(effect => `_> ${effect}_`).join('\n')}
`.trim()
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'برروی یک عکس ریپلای بزنید!'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `فرمت ${mime} پشتیبانی نمیشود`
  let img = await q.download()
  let url = await uploadImage(img)
  let apiUrl = global.API('https://some-random-api.ml/canvas/', encodeURIComponent(effect), {
    avatar: url
  })
  try {
    let stiker = await sticker(null, apiUrl, global.packname, global.author)
    await conn.sendMessage(m.chat, stiker, MessageType.sticker, {
      quoted: m
    })
  } catch (e) {
    m.reply('عملیات فیلتر کردن استیکر موفقیت آمیز نبود...')
    await conn.sendFile(m.chat, apiUrl, 'image.png', null, m)
  }
}

handler.help = ['stickerfilter (reply media)']
handler.tags = ['sticker']
handler.command = /^(stickerfilter)$/i
handler.limit = true
handler.group = false
handler.register = true
module.exports = handler
