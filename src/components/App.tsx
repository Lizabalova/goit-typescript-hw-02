import axios from "axios";
import { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import { getImages } from "./img-api";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import { Image } from "./App.types";

interface Response {
  results: Image[];
  total: number;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalPage, setTotalPage] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    async function fetchImages(): Promise<void> {
      try {
        setLoading(true);
        setError(false);

        const response: Response = await getImages(searchQuery, page); // Assuming getImages returns a promise

        setImages((prevImages) => [...prevImages, ...response.results]);
        setTotalPage(page < Math.ceil(response.total / 15));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [searchQuery, page]);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl: string): void => {
    setSelectedImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    setSelectedImageUrl('');
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {error && <ErrorMessage />}

      {images.length > 0 && <ImageGallery items={images} onImageClick={openModal} />}

      {totalPage && <LoadMoreBtn onClick={handleLoadMore} />}

      {loading && <Loader />}

      <ImageModal isOpen={modalIsOpen} onClose={closeModal} imageUrl={selectedImageUrl} />
    </div>
  );
};

export default App;