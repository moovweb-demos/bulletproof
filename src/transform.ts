import cheerio from 'cheerio'

export default function transform(response) {
  const $ = cheerio.load(response.body)

  $('head').append(`
    <script src="/__xdn__/cache-manifest.js" defer="defer"></script>
    <script src="/main.js" defer="defer"></script>
  `)

  response.body = $.html()
}
