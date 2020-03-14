import axios from 'axios';

const fetchImg = (key, query, page = 1) => {
  const url = 'https://pixabay.com/api/';
  const param = `&q=${query}&page=${page}&per_page=12&image_type=photo&orientation=horizontal`;

  return axios
    .get(url + key + param)
    .then(response => response.data.hits)
    .then(hits =>
      hits.map(({ id, tags, largeImageURL, webformatURL }) => ({
        id,
        tags,
        largeImageURL,
        webformatURL,
      })),
    );
};

export default fetchImg;
