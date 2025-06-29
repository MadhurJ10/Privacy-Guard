const axios = require('axios')

const newsKey = process.env.NEWS_KEY

module.exports.getNews = async (req, res) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: 'cybersecurity',
                sortBy: 'publishedAt',
                language: 'en',
                pageSize: 6,          // <-- Limit to 6 articles
                apiKey: newsKey // hide api key
            }
        });

        // console.log('Articles:', response.data.articles);
        res.json({
            msg: "aa gyi news",
            news: response.data.articles
        })
    } catch (error) {
        console.error('Error fetching news:', error.response?.data || error.message);
    }
}