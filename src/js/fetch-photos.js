import axios from 'axios';
import onError from './error';
const API_KEY = '41294445-8a921be96bf9efbee54d2387c';

async function getPhotos(name, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: name,
        per_page: 40,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    onError(error.message);
  }
}
export default getPhotos;
