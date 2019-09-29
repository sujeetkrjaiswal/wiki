import { Router } from "express";
import axios from 'axios';
const api = Router();


api.get("/time", (req, res) => {
  res.send(`Date.Now: ${Date.now()}`);
});
api.get("/time-cached", (req, res) => {
  res.set("Cache-Control", "public, max-age=200, s-maxage=600");
  res.send(`Now: ${Date.now()}`);
});

api.get('/wiki', async (req, res) => {
  try {
    const query = req.query.q
    const axiosRes = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        generator: 'prefixsearch',
        prop: 'pageprops|pageimages|description',
        redirects: '',
        ppprop: 'displaytitle',
        piprop: 'thumbnail',
        pithumbsize: '160',
        pilimit: '6',
        gpssearch: query,
        gpsnamespace: '0',
        gpslimit: '6'
      }
    })
    const resData = axiosRes.data
    if (resData && resData.query && resData.query.pages) {
      const results = (Object.values(resData.query.pages) || []).filter(page => !!page).map((page: any) => ({
        title: page.title,
        description: page.description,
        thumbnail: page.thumbnail
      }))
      res.json({
        query,
        results,
        // resData
      })
    } else {
      res.json([])
    }
  } catch (err) {
    res.status(500).send(err)
  }

})

api.get('/open-search', async (req, res) => {
  try {
    const searchQuery = req.query.q;
    // [query, title[], desc[], url[]]
    const axiosRes = await axios.get<[string, string[], string[], string[]]>('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'opensearch',
        format: 'json',
        formatversion: '2',
        search: searchQuery,
        namespace: '0',
        limit: '10',
        suggest: 'true'
      },

    })
    const [query, titles, descriptions, urls] = axiosRes.data;
    if (
      Array.isArray(titles) &&
      Array.isArray(descriptions) &&
      Array.isArray(urls) &&
      titles.length === descriptions.length &&
      titles.length === urls.length
    ) {
      const results = titles.map((title, idx) => ({
        title,
        description: descriptions[idx],
        url: urls[idx]
      }))
      res.json({
        query,
        results
      })
    } else {
      res.json({
        query,
        results: []
      })
    }

  } catch (err) {
    res.status(500).send(err);
  }
})
export default api;
