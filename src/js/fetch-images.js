import axios from 'axios';
import { config } from './config';

export async function fetchImages({ currentQuery, currentPage }) {
  const { data } = await axios.get(
    `${config.BASE_URL}?key=${config.API_KEY}&q=${currentQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
  );

  return data;
}
