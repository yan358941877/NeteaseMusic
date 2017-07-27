$(function () {
  $.get('/music/lyrics/test.json').then(res => {
    const { lyric } = res
    const regex = /\[(.+)\](.*)/g
    const lyricArray = lyric.match(regex)

    const $lyricContainer = $('.lyrics-container')
    const $lyricContent = $('<div>')

    $lyricContent.addClass('content')
    lyricArray.map(line=>{
      const regex = /\[(.+)\](.*)/
      const result = line.match(regex)
      const $content = $('<p>')
      $content.attr("data-time", result[1])
      $content.text(result[2])
      $lyricContent.append($content)
    })
    $lyricContainer.append($lyricContent)
    $lyricContainer.scrollTop(56)
  })
})