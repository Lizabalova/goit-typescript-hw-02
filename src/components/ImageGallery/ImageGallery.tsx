import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { Image, Link } from '../App.types';

interface ImageGalleryProps {
  items: Image[];
  onImageClick: (slug: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = (props) => {
  const { items, onImageClick } = props;

  return (
    <ul className={css.imgList}>
      {items.map((item) => (
        <li key={item.id}>
          <ImageCard imgLink={item.urls} imgSlug={item.slug} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;