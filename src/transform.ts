import cheerio from 'cheerio'

export default function transform(response) {
  const $ = cheerio.load(response.body)
    // console.log("Transform script running on '"+response.req.originalUrl+"'") // for testing
  $('head').append(`
    <script src="/__xdn__/cache-manifest.js" defer="defer"></script>
    <script src="/main.js" defer="defer"></script>
  `)

  response.body = $.html()
}
