const axios = require('axios');

const newsKey = process.env.NEWS_KEY;

module.exports.getNews = async (req, res) => {
    try {
        const response = await axios.get('https://gnews.io/api/v4/search', {
            params: {
                q: 'cybersecurity',
                lang: 'en',
                country: 'us',
                max: 6,               // Limit to 6 articles
                apikey: newsKey      // GNews API key from env
            }
        });

        res.json({
            msg: "aa gyi news",
            news: response.data.articles
        });
    } catch (error) {
        console.error('Error fetching news:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
};
