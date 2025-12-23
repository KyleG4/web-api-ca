import fetch from 'node-fetch';
export const getMovies = async () => {
 const baseUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=';
 const params = '\u0026language=en-US\u0026include_adult=false\u0026include_video=false\u0026page=1';
 const response = await fetch(baseUrl + process.env.TMDB_KEY + params);
 if (!response.ok) { throw new Error(response.json().message); }
 return await response.json();
};
