import React, { useEffect, useState } from 'react';
import ApiClient from '../services/ApiClient';

const News = () => {
  const [ news, setNews ] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await ApiClient.get('news/get-news'); // Use `.get()` if it's a GET request
        // console.log(response.data);
        setNews(response.data.news || []); // Safely handle the absence of data
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="flex flex-col px-6 gap-[2rem] ">
      <div>
        <h1 className="text-2xl font-semibold">Latest Blogs</h1>
      </div>
      <div className='grid gap-[2rem] sm:grid-cols-3'>
        {news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} className="rounded-[0.5rem] bg-[#E9EDF1] shadow-lg">
              <img
                className="w-full shrink-0 object-cover h-64 rounded-t-[0.5rem]"
                src={item.urlToImage || 'https://via.placeholder.com/300'}
                alt={item.title || 'News Image'}
              />
              <div className="flex flex-col p-3 gap-2">
                <h2 className="text-xl font-semibold">{item.title || 'Untitled'}</h2>
                <p className="text-gray-700">
                  {item.description || 'No description available for this article.'}
                </p>
                <a
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ADCBEA] w-fit px-2 py-1 rounded-[0.5rem] text-blue-800 font-medium hover:bg-[#88b6d6]"
                >
                  Read More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No news available at the moment.</p>
        )}
      </div>

    </div>
  );
};

export default News;
