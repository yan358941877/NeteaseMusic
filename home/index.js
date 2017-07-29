$(function(){
  const $recommend = $('nav .recommend')
  const $hot = $('nav .hot')
  const $search = $('nav .search')

  const $page_recom = $('#recommend')
  const $page_hot = $('#hot-music')
  const $page_search = $('#search')

  $recommend.on('click', ()=>{
    $recommend.find('span').addClass("active")
    $page_recom.css('display', "block")

    $hot.find('span').removeClass("active")
    $page_hot.css('display', 'none')

    $search.find('span').removeClass("active")
    $page_search.css('display', 'none')
  })

  $hot.on('click', ()=>{
    $recommend.find('span').removeClass("active")
    $page_recom.css('display', "none")

    $hot.find('span').addClass("active")
    $page_hot.css('display', 'block')

    $search.find('span').removeClass("active")
    $page_search.css('display', 'none')
  })

  $search.on('click', ()=>{
    $recommend.find('span').removeClass("active")
    $page_recom.css('display', "none")

    $hot.find('span').removeClass("active")
    $page_hot.css('display', 'none')

    $search.find('span').addClass("active")
    $page_search.css('display', 'block')
  })
})