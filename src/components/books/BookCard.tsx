
import React from "react";
import { Link } from "react-router-dom";
import { Book } from "@/utils/bookData";
import { useCart } from "@/context/CartContext";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useCart();
  const favorite = isFavorite(book.id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book.id);
    }
  };

  return (
    <div className="book-card">
      <button
        onClick={handleFavoriteToggle}
        className={cn("favorite-button", favorite ? "active" : "")}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={cn("w-5 h-5", favorite ? "fill-red-500" : "")} />
      </button>
      
      <Link to={`/book/${book.id}`} className="block">
        <div className="book-cover">
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title} by ${book.author}`}
            loading="lazy"
          />
        </div>
        
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
          <p className="book-price">${book.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
