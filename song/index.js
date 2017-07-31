$(function () {
  const queryArray = location.search.match(/id=(.+)&playlist=(.+)$/)
  const id = Number(queryArray[1]) - 1
  const playlist = queryArray[2]
  let audio = null
  $.get(`/music/${playlist}.json`).then((array) => {
    //console.log(array)
    const {url, lyrics, name, album, artist, img, img_blur} = array.playlist[id]
    setMusic(url)
    setPlayer(lyrics, name, artist, img, img_blur)
  })
  // 设置音乐
  function setMusic(url) {
    audio = new Audio()
    audio.src = url
    audio.autoplay = true
    audio.loop = true
  }

  function setPlayer(lyricsURL, name, artist, img, img_blur) {
    const $btn_play = $('.disc-panel .play')

    // 标题设置
    const $musicTitle = $('.lyrics-title h2')
    $musicTitle.text(name + ' - ' + artist)

    // 播放器封面设置
    $('.disc-panel .cover').attr("src", img)
    // 页面背景设置
    $('body').css({
      "background": `transparent url('${img_blur}') no-repeat center`,
      "background-size": "cover"
    })
    // 播放设置
    $btn_play.on("click", () => {
      audio.play()
      $btn_play.css("display", "none")
      $btn_pause.css("display", "inline-block")
      $('.disc-panel .cover').removeClass('pause')
      $('.disc-panel .light').removeClass('pause')
      $('.disc-pointer .pointer').removeClass('pause')

    })
    // 暂停设置
    const $btn_pause = $('.disc-panel .pause')
    $btn_pause.on('click', () => {
      audio.pause()
      $btn_pause.css("display", "none")
      $btn_play.css("display", "inline-block")
      $('.disc-panel .cover').addClass('pause')
      $('.disc-panel .light').addClass('pause')
      $('.disc-pointer .pointer').addClass('pause')
    })
    // 歌词设置
    $.get(lyricsURL).then(res => {
    const { lyric } = res
    const regex = /\[(.+)\](.*)/g
    const lyricArray = lyric.match(regex)

    const $lyricContainer = $('.lyrics-container')
    const $lyricContent = $('<div>')

    $lyricContent.addClass('content')
    lyricArray.map(line => {
      const regex = /\[(.+)\](.*)/
      const result = line.match(regex)
      const $content = $('<p>')
      $content.attr("data-time", result[1])
      $content.text(result[2])
      $lyricContent.append($content)
    })
    $lyricContainer.append($lyricContent)
    // $lyricContainer.scrollTop(56)
  }).then(() => {
    // 歌词滚动
    const $lyricsBuffer = $('.lyrics-container .content').children()
    const $lyricsContainer = $('.lyrics-container')
    let $nextWords = $lyricsBuffer.eq(0)
    let $preWords = $lyricsBuffer.eq(0)
    let index = 0

    audio.ontimeupdate = () => {
      const currentTime = Number(audio.currentTime)
      const dataTime = $nextWords.attr('data-time').split(':')
      const minutes = Number(dataTime[0])
      const seconds = Number(dataTime[1])

      if (Math.abs(currentTime - minutes * 60 - seconds) < 1) {
        $preWords.css("color", "hsla(0,0%,100%,.6)")
        $nextWords.css("color", "#fff")
        $preWords = $nextWords
        $nextWords = $nextWords.next()
        $lyricsContainer.scrollTop(index * 28)
        index++;
      }
    }
  })
  }


  // 获取歌词，并将歌词信息插入到页面中去
  



  // 监听播放事件
  // const $lyricsBuffer = $('.lyrics-container .content').children()
  // const $lyricsContainer = $('.lyrics-container')
  // let $nextWords = $lyricsBuffer.eq(0)
  // let index = 0

  // audio.ontimeupdate = ()=>{
  //   const currentTime = Number(audio.currentTime)
  //   const dataTime = $nextWords.attr('data-time').split(':')
  //   const minutes = Number(dataTime[0])
  //   const seconds = Number(dataTime[1])

  //   if(Math.abs(currentTime - minutes*60 - seconds)<1){
  //     $nextWords.css("color", "#fff")
  //     $nextWords = $nextWords.next()
  //     $lyricsContainer.$lyricContainer.scrollTop(index * 28)
  //   }
  // }
  // 播放设置

})