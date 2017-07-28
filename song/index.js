$(function () {
  // 获取歌词，并将歌词信息插入到页面中去
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

  // 设置音乐
  let audio = new Audio()
  audio.src = "http://dl.stream.qqmusic.qq.com/C400002GJKW80Mz8VJ.m4a?vkey=57679FEE69B1F0BC63F070718EFEC3EABF2B2400BDB12189347BA768E381D2E0FF68DE64E8597FDC51BD64073A2C37138D30EF7344A98528&guid=8038561700&uin=0&fromtag=66"
  audio.autoplay = true
  audio.loop = true
  // 播放设置
  const $btn_play = $('.disc-panel .play')
  $btn_play.on("click", ()=>{
    audio.play()
    $btn_play.css("display", "none")
    $btn_pause.css("display", "inline-block")
    $('.disc-panel .cover').removeClass('pause')
    $('.disc-panel .light').removeClass('pause')
    $('.disc-pointer .pointer').removeClass('pause')

  })
  // 暂停设置
  const $btn_pause = $('.disc-panel .pause')
  $btn_pause.on('click', ()=>{
    audio.pause()
    $btn_pause.css("display", "none")
    $btn_play.css("display", "inline-block")
    $('.disc-panel .cover').addClass('pause')
    $('.disc-panel .light').addClass('pause')
    $('.disc-pointer .pointer').addClass('pause')
  })
})