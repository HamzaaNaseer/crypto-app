import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiKey = process.env.REACT_APP_NEWSXRAPIDAPIKEY;
const cryptoHostKey = process.env.REACT_APP_NEWSXRAPIDAPIHOST;

const newsApiHeaders =  {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': cryptoApiKey,
    'X-RapidAPI-Host': cryptoHostKey,
  }
  const baseUrl = 'https://bing-news-search1.p.rapidapi.com'
  const createRequest = (url) => ({ url, headers: newsApiHeaders });


  export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getNews: builder.query({
        query: ({newsCategory,count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
      }),
    }),
  });


  //you have to use the same name as in endpoints but add use at the start and append Query at the end
export const { useGetNewsQuery } = newsApi;