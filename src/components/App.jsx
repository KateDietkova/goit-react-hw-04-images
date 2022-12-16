import { useState, useEffect } from 'react';
import { Box } from './Box/Box';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'services/services';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (query !== '') {
      setIsLoading(true);

      const fetchImages = async () => {
        try {
          const { totalHits, hits: images } = await getImages(query, pageNum);
          setImages(prevImages => [...prevImages, ...images]);
          setTotalHits(totalHits);
          setIsLoading(false);
        } catch {
          toast.error('Something wrong :( Please reload this page');
        }
      };

      fetchImages();
    }
  }, [pageNum, query]);

  useEffect(() => {
    if (images.length === totalHits && pageNum > 1) {
      toast.error("We've reached to the end");
    }
  }, [totalHits, images, pageNum]);

  const handleSubmit = ({ queryValue }) => {
    const newQuery = queryValue.toLowerCase().split(' ').join('+');
    if (newQuery === query) {
      return;
    }
    setQuery(newQuery);
    setPageNum(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPageNum(prevPageNum => prevPageNum + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />

      {images.length > 0 && <ImageGallery images={images} />}

      {images.length > 0 && !isLoading && images.length !== totalHits && (
        <Box display="flex" justifyContent="center" pb="15px">
          <Button onLoadMore={onLoadMore} />
        </Box>
      )}
      {isLoading && <Loader />}
      <Toaster />
    </>
  );
};
