let handler = async (m, { conn, text }) => {
  if (!text) throw '*کامنت وارد نشده!*'
  conn.sendFile(m.chat, global.API('https://some-random-api.ml', '/canvas/youtube-comment', {
    avatar: await conn.getProfilePicture(m.sender).catch(_ => ''),
    comment: text,
    username: conn.getName(m.sender)
  }), 'yt-comment.png', 'کامنتت اینجاست :)', m)
}

handler.help = ['ytcomment <comment>']
handler.tags = ['maker']

handler.command = /^(ytcomment)$/i

module.exports = handler
