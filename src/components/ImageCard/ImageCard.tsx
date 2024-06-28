import { Link } from "../App.types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  imgLink: Link;
  imgSlug: string;
  onClick: (imageUrl: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = (props) => {
  const { imgLink, imgSlug, onClick } = props;
  const { small } = imgLink;

  const handleClick = () => {
    onClick(small);
  };

  return (
    <div>
      <img
        className={css.card}
        src={small}
        alt={imgSlug}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageCard;