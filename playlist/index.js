$(function () {
  // 获取专辑信息
  const queryArray = location.search.match(/playlist=(.+)$/)
  const playlistname = queryArray[1]
  $.get(`/music/${playlistname}.json`).then(result => {
    const { cover, background, title, avatar, username, times, playlist, label, comment } = result
    console.log(result)
    // 设置封面
    $('.playlist-covers img').attr("src", cover)
    $('.playlist-covers .listen-time').text(` ${times}`)
    // 设置背景
    $('.playlist-header .bg-img').css({
      "background": `url('${background}') no-repeat`,
      "background-size": "cover"
    })
    // 设置歌单名称
    $('.playlist-desc h3').text(title)
    $('.playlist-desc span').text(username)
    $('.playlist-desc img').attr("src", avatar)

    // 设置歌单标签
    label.forEach(function (element) {
      let $item = $('<span>')
      $item.text(element)
      $('.playlist-label').append($item)
    }, this);

    // 设置歌曲列表
    let $musicModel = $('#music-list ol li').eq(0)
    playlist.map(function (element, index) {
      let newModel = $musicModel.clone()
      newModel.find('a').attr("href", element.link)
      newModel.find('.rank').text(index + 1)
      newModel.find('.content h3').text(element.name)
      newModel.find('.content p').append(` ${element.artist} - ${element.album}`)
      $('#music-list ol').append(newModel)
    })
    $musicModel.css("display", "none")

    // 设置评论列表
    let $commentModel = $('#comment ul li').eq(0)
    comment.forEach(function (element) {
      let newModel = $commentModel.clone()
      newModel.find('.user-info img').attr("src", element.avatar)
      newModel.find('.user-info .username').text(element.username)
      newModel.find('.user-info .date').text(element.date)
      newModel.find('.user-info .content').text(element.content)
      newModel.find('.zan .number').text(element.zan)
      $('#comment ul').append(newModel)
    })
    $commentModel.css("display", "none")


  })
})