import { Component} from 'react';
import { Box } from './Box/Box';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'services/services';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    pageNum: 1,
  };


  async componentDidUpdate(_, prevState) {
    try {
      const prevQuery = prevState.query;
      const newQuery = this.state.query;

      if (prevQuery !== newQuery || prevState.pageNum !== this.state.pageNum) {
        this.setState({ isLoading: true });

        const { pageNum } = this.state;
        const images = await getImages(newQuery, pageNum);

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          isLoading: false,
        }));
      }
    } catch {
      toast.error('Something wrong :( Please reload this page');
    }
  }

  handleSubmit = ({ queryValue }) => {
    const query = queryValue.toLowerCase().split(' ').join('+');
    this.setState({ query, pageNum: 1, images: [] });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      pageNum: prevState.pageNum + 1,
    }));
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        {images.length > 0 && <ImageGallery images={images} />}

        {images.length > 0 && !isLoading && (
          <Box display="flex" justifyContent="center" pb="15px">
            <Button onLoadMore={this.onLoadMore} />
          </Box>
        )}
        {isLoading && <Loader />}
        <Toaster />
      </>
    );
  }
}
