import axios from 'axios';
import toast from 'react-hot-toast';


const API_KEY = '30924937-b89bb4702c2359d017495e0f8';
axios.defaults.baseURL = 'https://pixabay.com/api';

export async function getImages(query, pageNum) {
  try {
    const url = `/?key=${API_KEY}&q=${query}&page=${pageNum}&image_type=photo&orientation=horizontal&per_page=12`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    toast.error('Something wrong :( Please reload this page');
    return [];
  }
}
