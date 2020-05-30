import cheerio from 'cheerio'

export default function transform(response) {
  const $ = cheerio.load(response.body)
  // console.log("Transform script running on '"+response.req.originalUrl+"'") // for testing

  $('a').each(function() {
    var url = $(this).attr('href');
    if (url) {
      $( this ).attr('href', url.replace('https://www.ashleyfurniture.com','').replace('http://www.ashleyfurniture.com',''))               
    }
  });

  $('head').append(`
    <script src="/__xdn__/cache-manifest.js" defer="defer"></script>
    <script src="/main.js" defer="defer"></script>
  `)

  response.body = $.html()
}
